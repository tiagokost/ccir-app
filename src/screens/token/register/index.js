import React, { Component } from 'react'
import { TextBox, Form, Card, FormButtons, ComboBox, DatePicker, Button, TextBoxButton } from './../../../shared/components/coreui'
import boolData from '../../../store/BooleanDataSource'
import "react-datepicker/dist/react-datepicker.css"
import clientStore from './../../../store/client-store'
import Progress, { show, close } from '../../../shared/components/progress'



export default class TokenRegister extends Component {
    constructor() {
        super()
        this.state = {
            nome: ""
            , token: ""
            , dataExpiracao: null
            , message: null
        }

        this.onChange = (event) => {
            const state = Object.assign({}, this.state);
            const fieldName = event.target.id;
            state[fieldName] = event.target.value;
            console.log('onchenge')
            this.setState(state);
        }
    }
    render() {
        const { token } = this.state
        return (
            <>
                <Progress />
                <Card
                    title="Gerador de "
                    subtitle="Chave de Acesso"
                    footer={<FormButtons
                        label1={"cancelar"}
                        label2={"confirmar"}
                        onSubmit={x => {
                            const { nome, dataExpiracao } = this.state
                            if (!nome) {
                                alert('Preencha o nome.')
                                return
                            }
                            if (!dataExpiracao) {
                                alert('Preencha a data de validade.')
                                return
                            }

                            show()
                            const store = clientStore()
                            store.post({
                                nome: this.state.nome
                                , dataExpiracao: this.state.dataExpiracao
                            }).then(obj => {
                                this.setState({
                                    token: obj.token
                                    , dataCadastro: obj.dataCadastro
                                    , id: obj.id
                                    , message: 'Cliente liberado com sucesso!\n' + obj.token
                                })
                                close()
                                alert("Chave de Acesso gerada com sucesso.")
                                window.location.href = '/token/manager'

                            }).catch(ex => {
                                close()
                                console.log(ex)
                                alert(ex.message)

                            })
                        }}
                        onCancel={x => {

                        }}
                    />} >

                    <Form>
                        <TextBox onChange={this.onChange} label="Aplicação" id="nome" placeholder="" />
                        {token &&
                            <TextBox onChange={this.onChange} id="token" value={token} placeholder="token de acesso" label="Chave" disabled />
                        }
                        <DatePicker
                            selected={this.state.dataExpiracao}
                            onChange={date => {
                                this.setState({ dataExpiracao: date })
                            }} label="Validade" id="dataExpiracao" />


                        {/* <ComboBox onChange={this.onChange}  data={boolData} label="ATIVO" selectedValue={true}/> */}
                    </Form>

                </Card>
            </>)
    }
}
