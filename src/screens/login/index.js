import React, { Component } from 'react'
import { TextBox, Form, Card, FormButtons, Password } from './../../shared/components/coreui'
import { authUser, isAuthenticated, getAuthUser, getToken } from '../../secury/auth'
import Progress, { show, close } from './../../shared/components/progress'
import appConfig from './../../app.config.json'
import { Button } from '@material-ui/core'
import axios from 'axios'

export default class Login extends Component {
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

        return (
            <>
                <Progress />
                <div class="row">
                    <div className="col-lg-2 col-md-2 col-sm-0">

                    </div>

                    <div class="col-lg-4 col-md-8 col-sm-12">
                        <Card
                            title={appConfig?.appTitle}
                            subtitle={appConfig?.appSubtitle}
                            footer={<FormButtons
                                label2={"ENTRAR"}
                                onSubmit={x => {

                                    show()

                                    setTimeout(() => {
                                        this.setState({ message: undefined })

                                        if (!login || !password) {
                                            this.setState({
                                                message: "Por favor, preencha corretamente o nome de usuário e senha ."
                                            })
                                            close()
                                            return
                                        }
                                        authUser(login, password)
                                            .then(res => {
                                                if (isAuthenticated()) {
                                                    window.location.href = './'
                                                } else {

                                                    this.setState({

                                                        message: "Verifique seu nome de usuário e senha ."
                                                    })
                                                }
                                               // close()

                                            }).catch(ex => {
                                                this.setState({
                                                    message: ex.message
                                                })
                                                close()
                                            })
                                       

                                    }, 3000)



                                }}
                                onCancel={x => {
                                    window.location.href = './'
                                    //close()

                                }}
                            />}
                        >

                            <Form>
                                {message && <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>}
                                <div style={{ backgroundColor: "#000000" }}>

                                </div>
                                <TextBox onChange={this.onChange} label="Usuário" id="login" placeholder="" />
                                <Password onChange={this.onChange} label="Senha" id="password" placeholder="" />
                            </Form>


                        </Card>
                    </div>
                    <div class="col-lg-6 col-md-2 col-sm-0">

                        <div class="text-center">
                            <img src={appConfig?.logoSigtrans} style={{ opacity: 50, margin: 20, maxWidth: 200, maxHeight: 200 }} class="img-fluid" alt="..." />
                        </div>
                        <div class="text-center">
                            <img src={appConfig?.logoOrgao} style={{ opacity: 50, margin: 20, maxWidth: 160, maxHeight: 160 }} class="img-fluid" alt="..." />
                        </div>
                    </div>
                </div>
            </>

        )
    }
}