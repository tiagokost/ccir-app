import React, { Component } from 'react'
import { TextBox, Form, Card, FormButtons, ComboBox, Button } from './../../shared/components/coreui'
import AitStore from './../../store/ait-store'
import tipoData from '../../store/DocumentoDataSource'
import Progress, { show, close } from './../../shared/components/progress'
import appConfig from './../../app.config'

export default class DocSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSearch: true
            , showSearchAit: false
            , ait: undefined
            , numero: ''
        }
        this.CryptoJS = require("crypto-js")

        this.onChange = (event) => {
            const state = Object.assign({}, this.state);
            const fieldName = event.target.id;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    }

    SearchComponent = () => {
        const { showSearchAit, numero } = this.state
        let itemsDoc = []
        tipoData.map && tipoData.map(x =>
            (appConfig[x.value]) && itemsDoc.push(x)


        )
        return (<Card
            title="Visualizar "
            subtitle="Documento (AIT)"
            footer={<FormButtons
                label1={"voltar"}
                label2={"visualizar documento"}
                onSubmit={x => {
                    show()

                    if (!numero) {
                        alert('Informe um número de AIT válido!')
                        close()
                        return
                    }
                    new AitStore().getAit(numero)
                        .then(ait => {
                            // to-do ENCRIPTY
                            const cipherResult = this.CryptoJS.AES.encrypt(numero, 'my-secret-key@123');
                            const numeroEncripty = this.CryptoJS.enc.Hex.stringify(cipherResult.ciphertext);

                            window.location.href = '../ait/' + numero
                            close()
                        })
                }}
                onCancel={x => {
                    close()

                }}
            />} >
            <Progress />
            <Form >
                <ComboBox data={itemsDoc} label="Tipo de Documento" selectedValue={""} onClick={(e) => {
                    this.setState({
                        showSearchAit: (e && e.value == "AIT")
                    })

                }} />
                {showSearchAit && <TextBox onChange={this.onChange} label="Número AIT" id="numero" placeholder="" />}
            </Form>
        </Card>)
    }

    render() {
        const { showSearch, ait } = this.state

        return this.SearchComponent()
    }
}
