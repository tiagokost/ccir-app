import React from 'react'
import { Jumbotron, Button } from "reactstrap"
import { isAutenticated, isAuthenticated, getAuthUser } from './../../secury/auth'

export const Home = (props) => {
    const user = getAuthUser()
    return (
        <>

            <Jumbotron>
                <p className="lead"><strong>Bem vindo à Central de Consultas de Infrações e Recursos</strong> </p>
                <hr className="my-2" />
                <p>Precisa de ajuda para utilizar o sistema? Clique no botão para saber mais informações.</p>

                <p className="lead">
                    <Button color="primary"><i className="cui-user-female"></i>ajuda</Button>
                </p>
            </Jumbotron>
            <Jumbotron>
                {!isAuthenticated() ? (
                    <>
                        <p className="lead"><strong>Para acessar mais funções..</strong> </p>
                        <hr className="my-2" />
                        <p>Use suas credenciais para se autenticar no sistema.</p>

                        <p className="lead">
                            <Button color="primary" href="/login"><i className="cui-user-female"></i>entrar</Button>
                        </p>
                    </>

                ) : (
                        <>
                            <p className="lead"><strong>Você está autenticado como {user?.nome} [{user?.matricula}]</strong> </p>
                            <hr className="my-2" />
                            <p>Para alterações nos seus dados cadastrais contacte a administração do Simove.</p>

                            <p className="lead">
                                <Button color="primary" href="/login"><i className="cui-user-female"></i>ver mais..</Button>
                            </p>
                        </>

                    )}



            </Jumbotron>
        </>
    )
}