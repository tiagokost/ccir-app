import Ait from '../business/models/ait'
import axios from 'axios'
import infraConfig from './../infra.config'
import { headers, getToken } from './../secury/auth'

export default class AitStore {

    getAllAit() {
        return [

        ]
    }

    getAit = async (number) => {
        const { api } = infraConfig
        const { urlBase } = api

        return axios.get(urlBase + 'doc/ait/' + number, headers)
            .then(async res => {
                const ait = new Ait(res.data)
               
                setTimeout( await axios.post(urlBase + 'doc/ait/convertImage',
                    "{ \"img\": \"" + ait.usuario?.caminhoImagemAssinaturaAgente + "\"}",
                    { headers: { authorization: getToken(), 'content-type': 'application/json' } }
                )
                    .then(res => {
                        if (res.data){
                            ait.caminhoImagemAssinaturaAgenteBase64 = res.data
                        // console.log('converteu a imagem')
                           // alert(res.data)
                            //console.log(res.data)
                        }
                        //console.log(ait)
                    }))
                return ait
            })
    }

    getAitFormToken = async (token) => {
        const { api } = infraConfig
        const { urlBase } = api

        return axios.get(urlBase + 'doc/ait/consulta/' + token)
            .then(res => {
                const ait = new Ait(res.data)

                //console.log(ait)
                return ait
            })
    }
}
