import axios from 'axios'
import infraConfig from './../infra.config'
import { v4 as uuidv4 } from 'uuid'
import { headers } from './../secury/auth'

const {api } = infraConfig
const {urlBase } = api

export class ClientStore {

    getAll = async () => {
        return axios.get(urlBase + 'chave-acesso',headers)
            .then(res => {
                if (res.status == 200)
                    return res.data
                return []
            }).catch(ex => {
                return []
            })
    }

    post = async (obj) =>{
        const token = {
            "dataExpiracao": obj.dataExpiracao,
            "id": uuidv4(),
            "nome": obj.nome
          }
        return axios.post(
            urlBase + 'chave-acesso'
            , token
            , headers)
            .then(res => {
                if (res.status == 200)
                    return res.data
                else throw new Error("Não foi possível registrar a chave de acesso.")

            }).catch(ex => {
                if(ex.response?.data)
                    throw new Error("Não foi possível registrar a chave de acesso.\nMensagem: "+ex.response.data)
                else throw new Error("Não foi possível registrar a chave de acesso")
            })
    }

    cancelToken = async (id) => {
        return axios.delete(urlBase + '/chave-acesso/'+ id)
        .then(res => {
            if (res.status == 200)
                return res.data
            else throw new Error("Não foi possível cancelar a chave de acesso.")

        }).catch(ex => {
            if(ex.response.data)
                throw new Error("Não foi possível registrar a chave de acesso.\nMensagem: "+ex.response.data)
            else throw new Error("Não foi possível registrar a chave de acesso")
        })
    }

    getById = async (id) => {
        return {

        }
    }
}

export  default () =>{
    return new ClientStore()
}
