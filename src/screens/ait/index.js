import React, { Component } from 'react'
import { TextBox, Form, Card, FormButtons, ComboBox, Button, Link, ButtonGroup, Image } from './../../shared/components/coreui'
import Docview from '../docview'
import AIT from './../../business/doc/AIT'
import AitStore from './../../store/ait-store'
import { Accordion, AccordionItem } from '../../shared/components/accordion'
import { logoutUser } from '../../secury/auth'
import Progress, { show, close } from '../../shared/components/progress'

export default class AitView extends Component {
    constructor(props) {
        super(props)
        const { numero, token } = this.props.match.params
        this.state = {
            ait: undefined
            , numero: numero
            , token: token
            , disableConsult: token ? true : false
            , showDocview: false
            , showFormview: true
        }

    }

    componentDidMount() {
        const { numero, token } = this.props.match.params
        show()
        if (token) {
            console.log('token: ' + token)
            new AitStore().getAitFormToken(token)
                .then(ait => {
                    if (!ait) {
                        alert("Consulta não autorizada.")
                        logoutUser()
                        close()
                        return
                    }
                    this.setState({ ait: ait, disableConsult: true })
                }).catch(ex => {
                    console.log(ex.message)
                    logoutUser()
                    alert("Consulta não autorizada.")
                    close()
                    window.location.href = './'
                })

        } else {

            var CryptoJS = require("crypto-js")
            const bytes = CryptoJS.AES.decrypt({
                ciphertext: CryptoJS.enc.Hex.parse(numero)
            }, 'my-secret-key@123', { format: CryptoJS.format.Hex })
            const numeroS = bytes.toString()
            new AitStore().getAit(numero)
                .then(ait => {
                    this.setState({ ait: ait })
                    close()
                })
        }
        close()

    }

    render() {
        const { numero, ait, showDocview, showFormview } = this.state

        return (
            <>
                <Progress />
                <blockquote class="blockquote text-left">
                    <p class="h4"><strong>AIT</strong>- Auto de Infração de Trânsito</p>
                    <cite title="Source Title">Não são permitidas alterações neste documento.</cite>
                </blockquote>
                <div className="row text-right" style={{ marginBottom: 5 }}>
                    <div className="col-lg-8 col-md-8 col-sm-0">

                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-0">

                        <div className="btn-group" role="group" aria-label="Basic example">
                            {!this.state.disableConsult &&
                                <ButtonGroup text={"Nova busca"}
                                    onClick={() => {
                                        window.location.href = "../doc/search"
                                    }}></ButtonGroup>}
                            {(showFormview) ?
                                <ButtonGroup text={"Imprimir"} onClick={() => {
                                    this.setState({
                                        showDocview: true
                                        , showFormview: false
                                    })
                                }}></ButtonGroup>
                                : <ButtonGroup type={'danger'} text={"Fechar"} onClick={() => {
                                    this.setState({
                                        showDocview: false
                                        , showFormview: true
                                    })
                                }}></ButtonGroup>}
                        </div>



                    </div>
                </div>

                {showFormview &&
                    <>
                        <Accordion>
                            <AccordionItem id="geral" text="Informações gerais">
                                <Form>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-0">
                                            <TextBox readonly label="Nº AIT" id="numero" value={ait?.numero} />
                                            <TextBox readonly label="Cód. Orgão" id="codigoOrgao" value={ait?.codigoOrgao} />
                                            <TextBox readonly label="Data Autuação" id="dataAutuacao" value={ait?.dataAutuacao} />
                                            <TextBox readonly label="Descrição" id="descricao" value={ait?.descricao} />
                                            <TextBox readonly label="Amparo Legal" id="amparoLegal" value={ait?.tipificacaoInfracao?.amparoLegal} />
                                            <TextBox readonly label="Observação" id="observacao" value={ait?.observacao} />

                                            <TextBox readonly label="Infraest" id="infraest" value={ait?.infraest} />

                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-0">
                                            <TextBox readonly label="RENAINF" id="renainf" value={ait?.renainf} />
                                            <TextBox readonly label="Justificativa Cancelamento" id="justificativaCancelamento" value={ait?.justificativaCancelamento} />
                                            <TextBox readonly label="Enviado para o RENAINF" id="enviadoRenainf" value={ait?.enviadoRenainf} />
                                            <TextBox readonly label="Processado pelo RENAINF" id="processadoRenainf" value={ait?.processadoRenainf} />
                                        </div>
                                    </div>
                                </Form>
                            </AccordionItem>
                            <AccordionItem id="veiculo" text="Veículo">
                                <Form>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-0">
                                            <TextBox readonly label="Placa" id="placa" value={ait?.veiculo?.placa} />
                                            <TextBox readonly label="Nº do chassi" id="chassi" value={ait?.veiculo?.chassi} />
                                            <TextBox readonly label="Marca" id="marca" value={ait?.veiculo?.nmMarca} />
                                            <TextBox readonly label="Modelo" id="modelo" value={ait?.veiculo?.modelo} />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-0">
                                            <TextBox readonly label="País" id="pais" value={ait?.veiculo?.pais} />
                                            <TextBox readonly label="Espécie" id="especie" value={ait?.veiculo?.especie?.nome} />
                                            <TextBox readonly label="Estado" id="estado" value={ait?.veiculo?.nomeEstado} />
                                        </div>
                                    </div>
                                </Form>
                            </AccordionItem>
                            <AccordionItem id="condutor" text="Condutor">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-0">
                                        <TextBox readonly label="Nome" id="nome" value={ait?.condutor?.nome} />
                                        <TextBox readonly label="CNH" id="cnh" value={ait?.condutor?.cnh} />
                                        <TextBox readonly label="RG" id="rg" value={ait?.condutor?.rg} />

                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-0">
                                        <TextBox readonly label="UF" id="uf" value={ait?.condutor?.estado?.nome} />
                                        <TextBox readonly label="País" id="pais" value={ait?.condutor?.pais} />

                                    </div>
                                </div>
                            </AccordionItem>
                            <AccordionItem id="equipamento" text="Equipamento">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-0">
                                        <TextBox readonly label="Descrição" id="descricao" value={ait?.talao?.equipamento?.descricao} />

                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-0">
                                        <TextBox readonly label="Identificador" id="identificador" value={ait?.talao?.equipamento?.identificador} />

                                    </div>
                                </div>
                            </AccordionItem>
                            <AccordionItem id="usuario" text="Agente">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-0">
                                        <TextBox label="Nome" id="nome" value={ait?.usuario?.nome} placeholder="" />
                                        <TextBox label="CPF" id="cpf" value={ait?.usuario?.cpf} placeholder="" />
                                        <TextBox label="Matricula" id="matricula" value={ait?.usuario?.matricula} placeholder="" />
                                        <TextBox label="Login" id="login" value={ait?.usuario?.login} placeholder="" />
                                        <TextBox label="Qtde. Talões" id="qtdeTaloes" value={ait?.usuario?.qtsTaloesLiberacao} placeholder="" />

                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-0">
                                        <TextBox label="Email" id="email" value={ait?.usuario?.email} placeholder="" />
                                        <TextBox label="Versão app" id="versaoApp" value={ait?.usuario?.versaoApp} placeholder="" />
                                        <TextBox label="Acesso balança" id="acessoBalanca" value={ait?.usuario?.acessoBalanca} placeholder="" />

                                        <Image style={{ maxHeight: 200 }} src={ait?.usuario?.caminhoImagemAssinaturaAgente} />

                                    </div>
                                </div>

                            </AccordionItem>
                            <AccordionItem id="status" text="Status">
                                <Form>
                                    <TextBox label="Status" id="status" value={ait?.status?.nome} placeholder="" />
                                    <TextBox label="Tipo" id="tipo" value={ait?.status?.tipo} placeholder="" />
                                </Form>
                            </AccordionItem>

                            {(ait?.tipificacoes && ait?.tipificacoes.map) &&
                                ait?.tipificacoes.map(tipificacao =>
                                    <AccordionItem id={"tipificacao_" + tipificacao?.idAitTipíficacaoInfracao}
                                        text={"Tipificação - " + tipificacao?.tipificacao?.codigo}>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-0">
                                                <TextBox label="Código" id="codigo"
                                                    value={tipificacao?.tipificacao?.codigo} placeholder="" />
                                                <TextBox label="Descrição" id="descricao"
                                                    value={tipificacao?.tipificacao?.descricao} placeholder="" />

                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-0">
                                                <TextBox label="Código DETRAN" id="codigoDetran"
                                                    value={tipificacao?.tipificacao?.codigoDetran} placeholder="" />

                                            </div>
                                        </div>

                                    </AccordionItem>

                                )

                            }

                        </Accordion>
                    </>
                }
                {showDocview &&
                    <Docview>
                        <AIT obj={ait}></AIT>
                    </Docview>}

            </>

        )
    }
}

