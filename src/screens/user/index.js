import React, { Component } from 'react'
import { TextBox, Form, Card, FormButtons, Password } from './../../shared/components/coreui'
import { authUser, isAuthenticated, getAuthUser } from '../../secury/auth'
import Progress, { show, close } from './../../shared/components/progress'

export default class User extends Component {
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
        const { login, password, message } = this.state

        const user = getAuthUser()

        return (
            <Card
                width={"medium"}
                title="Dados cadastrais do "
                subtitle="Usuário">
                <Form>
                    <TextBox readonly value={user?.name} label="Usuário" id="nome" />
                    <TextBox readonly value={user?.login} label="Login" id="login" />
                    <TextBox readonly value={user?.cpf} label="CPF" id="cpf" />
                    <TextBox readonly value={user?.registration} label="Matrícula" id="registration" />
                    <TextBox readonly value={user?.email} label="E-mail" id="email" />
                    <TextBox readonly value={user?.profile} label="Perfil" id="profile" />
                </Form>
            </Card>
        )

    }
}