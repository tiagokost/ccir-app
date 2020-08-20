import React, { Component } from 'react'
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer'
import styles from './styles'

const AIT = ({ obj }) => {
    const ait = obj
    var Buffer = require('buffer')
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    var today  = new Date()
    var dataImpr = today.toLocaleDateString("pt-BR", options)
    if (!obj) return <Document><div>Nenhum arquivo.</div></Document>
    return (
        <Document style={styles.document}>
            <Page size="A4" style={styles.body}>
                <View style={
                    styles.flexBox
                }>
                    <View style={styles.column1} >
                        <View style={{ alignItems: 'center'}} >
                            <Image style={styles.logo}
                                    src={{ uri: '/logoPara.png'}}/>
                        </View>
                        
                        {header(ait)}
                        <View style={styles.group}>
                            {field("COD. ORGAO", ait.codigoOrgao)}
                            {field("NUMERO", ait.numero)}
                        </View>
                        <View style={styles.group}>
                            <View style={styles.borderBottom} />
                            <Text style={styles.subtitle}>IDENTIFICACAO DO VEICULO</Text>
                            {field("PLACA", ait.veiculo?.placa)}
                            {field("CHASSI", ait.veiculo?.chassi)}
                            {field("MARCA", ait.veiculo?.nmMarca)}
                            {field("MODELO", ait.veiculo?.modelo)}
                            {field("ESPECIE", ait.veiculo?.especie?.nome)}
                        </View>
                        <View style={styles.group}>
                            <View style={styles.borderBottom} />
                            <Text style={styles.subtitle}>IDENTIFICACAO DO CONDUTOR</Text>
                            {field("NOME", ait.condutor?.nome)}
                            {field("CNH", ait.condutor?.cnh)}
                            {field("RG", ait.condutor?.rg)}
                            {field("UF", ait.condutor?.estado?.sigla)}
                            {field("PAIS", ait.condutor?.pais)}
                        </View>
                        <View style={styles.group}>
                            <View style={styles.borderBottom} />
                            <Text style={styles.subtitle}>IDENTIFICACAO DO LOCAL</Text>
                            {field("LOCAL", ait.local?.descricao)}
                            {field("MUNICIPIO", ait.local?.municipio?.nome)}
                            {field("UF", ait.local?.municipio?.estado?.sigla)}
                            {field("DATA E HORA", ait.local?.dataOcorrencia?.toString() + " " + ait.local?.horaOcorrencia?.toString())}
                        </View>
                        {ait.tipificacaoInfracao &&
                            <View style={styles.group}>
                                <View style={styles.borderBottom} />
                                <Text style={styles.subtitle}>TIPIFICACAO DA INFRACAO</Text>
                                {field("COD. INFRACAO", ait.tipificacaoInfracao?.codigoInfracao)}
                                {field("DESDOBRAMENTO", ait.tipificacaoInfracao?.desdobramento)}
                                {field("AMPARO LEGAL", ait.tipificacaoInfracao?.amparoLegal)}
                            </View>
                        }

                        <View style={styles.group}>
                            <View style={styles.borderBottom} />
                            <Text style={styles.subtitle}>PROCEDIMENTOS</Text>
                            <Text style={styles.text}>{(ait.procedimentos && ait.procedimentos.map) && ait.procedimentos.map((text) => (text + ", "))}</Text>
                        </View>
                        <View style={styles.group}>
                            <View style={styles.borderBottom} />
                            <Text style={styles.subtitle}>AFERICAO ETILOMETRO</Text>
                            {field("MARCA", ait.afericaoEtilometro?.marca)}
                            {field("MODELO", ait.afericaoEtilometro?.modelo)}
                            {field("NUMERO SERIE", ait.afericaoEtilometro?.numeroSerie)}
                            {field("EMBARCADOR", ait.afericaoEtilometro?.embarcacao)}
                        </View>
                        <View style={styles.group}>
                            <View style={styles.borderBottom} />
                            <Text style={styles.subtitle}>OBSERVACOES</Text>
                            <Text style={styles.text}>{ait.observacao}</Text>

                        </View>
                    </View>
                    <View style={styles.column2}>
                        <View style={styles.group}>
                            <View style={styles.borderBottom} />
                            <Text style={styles.subtitle}>AUTORIDADE/AGENTE AUTUADOR</Text>
                            {field("NOME", ait.agenteAutuador?.nome)}
                            {field("MATRICULA", ait.agenteAutuador?.matricula)}
                        </View>
                        <View style={styles.groupAssinatura}>
                            <View style={styles.borderBottom} />
                            <Text style={styles.subtitle}>ASSINATURA DO CONDUTOR(A)</Text>
                        </View>
                        <View style={styles.groupAssinatura}>
                            <View style={styles.borderBottom} />
                            <Text style={styles.subtitle}>ASSINATURA DO AGENTE</Text>
                            {ait?.caminhoImagemAssinaturaAgenteBase64 &&
                                <Image style={styles.imageAss}
                                src={{ data: new Buffer.Buffer(ait?.caminhoImagemAssinaturaAgenteBase64, 'base64'), format: 'jpg'}}
                                />
                            }
                        </View>

                        <View style={styles.group}>
                            <Text style={styles.textSmall}>

                                AVISO: A PRESENCA DO CODIGO INFRAEST OU RENAINF
                                E OBRIGATORIO NAS NOTIFICACOES, SOB PENA DE INVA
                                LIDADE DA MULTA DO AUTO DE INFRACAO DE TRANSITO.
                                
                            </Text>
                        </View>

                        <View style={styles.group}>
                            <Text style={styles.textSmall}>

                                    *VIA DO CONDUTOR
                            </Text>
                        </View>

                        <View style={styles.group}>
                            <Text style={styles.textSmall}>

                                Quando a infracao for de responsabilidade do condutor
                                e este assinar a AIT, o prazo para apresentacao da DEFESA
                                DE AUTUACAO e de 15 (quinze) dias, contados da data da assinatura
                                da AIT. Caso contrario, o prazo e contado a partir da data
                                de Notificacao da Autuacao. O DETRAN-PA disponibiliza, em seus
                                postos de atendimento e atraves da internet no site:
                                www.detran.pa.gov.br, modelo padrao de REQUERIMENTO para
                                apresentacao da DEFESA DE AUTUACAO. O requerimento com a
                                DEFESA DE AUTUACAO podera ser entregue no protocolo da
                                sede do DETRAN-PA, Postos de Atendimento ou remetido
                                via postal com correspondencia enderecada para:
                                Departamento de Transito do Estado do Para - DETRAN-PA.
                                Avenida Augusto Montenegro, km3, s/n, Mangueirao.
                                CEP: 66640-000, Belem-PA. Em caso de nao apresentacao de
                                DEFESA DE AUTUACAO, do seu nao conhecimento, ou ainda,
                                de indeferimento, o DETRAN-PA aplicara a penalidade
                                expedindo a respectiva NOTIFICACAO DE PENALIDADE.
                            </Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `pag. ${pageNumber} de ${totalPages} | impressão: ` + dataImpr  + `hs | ` +window.location.href 
                )} fixed />
            </Page>
        </Document>
    )
}

// AIT.propTypes = {
//     obj: new Ait()
// }

const header = (ait) => {
    return (<View>
        <View >
            <View style={styles.headerBorder}>
                <Text style={styles.title} fixed>
                    AUTO INFRACAO DE TRANSITO - AIT
                </Text>
            </View>
        </View>
    </View>)
}

const field = (label, value) => {
    return (
        <View style={styles.fieldGroup}>
            <View style={styles.flex1}><Text style={styles.label}>{label}: </Text></View>
            <View style={styles.flex2}><Text style={styles.label}>{value}</Text></View>
        </View>
    )
}

export default AIT