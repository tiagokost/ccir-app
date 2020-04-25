import React, { Component } from 'react'
import { TextBox, Form, Card, FormButtons, Password, ComboBox } from './../../shared/components/coreui'
import { authUser, isAuthenticated, getAuthUser } from '../../secury/auth'
import Progress, { show, close } from './../../shared/components/progress'
import appConfig from './../../app.config'
import boolData from './../../store/BooleanDataSource'

export default class Config extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: undefined
            , password: undefined
        }

        this.onChange = (event) => {
            const state = Object.assign({}, this.state)
            const fieldName = event.target.id
            state[fieldName] = event.target.value
            this.setState(state)
        }
    }
    render() {
        const user = getAuthUser()
        console.log("user: ")
        console.log(user)
        return (
            <Card
                width={"medium"}
                title="Configuração "
                subtitle="Geral">
                <Form>
                    <TextBox readonly value={appConfig?.appTitle} label="Titulo" id="title" />
                    <TextBox readonly value={appConfig?.appSubtitle} label="Subtitulo" id="subtitle" />
                    <TextBox readonly value={appConfig?.logoOrgao} label="Logotipo do Aplicativo" id="logoApp" />
                    <TextBox readonly value={appConfig?.logoOrgao} label="Logotipo do Cliente" id="logoOrgao" />
                    <ComboBox
                        onClick={(e) => {
                            appConfig['AIT'] = false

                        }}
                        size="small" data={boolData} label="AIT" selectedValue={appConfig.AIT} />
                    <ComboBox readonly size="small" data={boolData} label="RRD" selectedValue={appConfig.RRD} />
                    <ComboBox readonly size="small" data={boolData} label="TREV" selectedValue={appConfig.TREV} />
                    <ComboBox readonly size="small" data={boolData} label="TRV" selectedValue={appConfig.TRV} />
                    <ComboBox readonly size="small" data={boolData} label="TCA" selectedValue={appConfig.TCA} />
                    <ComboBox readonly size="small" data={boolData} label="GRV" selectedValue={appConfig.GRV} />

                </Form>
            </Card>
        )

    }
}