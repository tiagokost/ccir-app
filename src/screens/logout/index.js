import React, { Component } from 'react'
import { TextBox, Form, Card, FormButtons, Password } from './../../shared/components/coreui'
import { authUser, isAuthenticated, getAuthUser, logoutUser } from '../../secury/auth'
import Progress, { show, close } from './../../shared/components/progress'
import { Button } from './../../shared/components/coreui'

export default class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: undefined
            , password: undefined
        }

    }
    render() {
        const { login, password, message } = this.state

        const user = getAuthUser()
        return (

            <Card
                width={"medium"}
                title="Sair do  "
                subtitle="Sistema">
                <Progress />
                <Form>
                    <p>Você está logado com <strong>{user?.login}</strong> e-mail {user?.email}</p>

                    <Button text={"sair.."} onClick={() => {
                        show()
                        logoutUser()
                        setTimeout(() => { window.location.href = './login' }, 3000)


                    }} />
                </Form>
            </Card>
        )

    }
}