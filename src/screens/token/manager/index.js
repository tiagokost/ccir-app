import React, { Component } from 'react'
import { Grid, Table, TableHeaderRow, TableEditColumn } from '@devexpress/dx-react-grid-material-ui'
import { Card, Button, TextBox, Form, Footer, ComboBox, DatePicker } from '../../../shared/components/coreui'
import { EditingState } from '@devexpress/dx-react-grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CollapseCard from '../../../shared/components/CollapseCard'
import boolData from '../../../store/BooleanDataSource'
import clientStore from './../../../store/client-store'
import Progress, { show, close } from '../../../shared/components/progress'


export default class TokenManager extends Component {

    constructor() {
        super()
        this.state = {
            rows: []
            , deletingRows: []
            , objDel: null
        }
        this.store = clientStore()

        const getStateRows = () => {
            const { rows } = this.state
            return rows;
        }

        const getStateDeletingRows = () => {
            const { deletingRows } = this.state
            return deletingRows;
        }
    }

    async componentDidMount() {
        show()
        this.setState({
            rows: await this.store.getAll()
        }, () => close())
    }

    commitChanges = ({ added, changed, deleted }) => {
        let { rows } = this.state;
        if (deleted) {
            console.log(rows[deleted[0]])
            const row = rows[deleted[0]]
            rows.splice(deleted[0], 1)
            this.store.cancelToken(row.id)
                .then(cancel => {
                    if (cancel)
                        alert("Chave de Acesso cancelada com sucesso.")

                }).catch(ex => {
                    alert("Não foi possível cancelar a Chave de Acesso.")
                    rows.push(row)
                    console.log(ex.message)
                })

        }
        if (added) {

        }
        this.setState({ rows, deletingRows: deleted || this.getStateDeletingRows() })
    };

    DeleteButton = ({ onExecute }) => (
        <IconButton
            onClick={onExecute}
            title="Cancelar Chave de Acesso"
        >
            <DeleteIcon />
        </IconButton>
    )

    commandComponents = {
        delete: this.DeleteButton
    }

    Command = ({ id, onExecute }) => {
        const CommandButton = this.commandComponents[id];
        return (
            <CommandButton
                onExecute={() => {
                    if(window.confirm('Deseja confirmar o cancelamento da chave de acesso?')){
                        onExecute()
                    }
              
                }}
            />
        )
    }

    render() {
        const { rows } = this.state
        return (
            <>
                <Progress />
                <CollapseCard
                    footerComponent={<Button to="../token/listagem" onClick={() => {

                    }} text="Buscar" />}
                >
                    <Form>
                        <TextBox size="small" label="APLICAÇÃO" />
                        <TextBox size="small" label="DATA CADASTRO" />
                        <DatePicker size="small" label="Validade" id="VALIDADE" />
                        <ComboBox size="small" data={boolData} label="ATIVO" selectedValue={true} />
                    </Form>

                </CollapseCard>
                <Card
                    width="large"
                    title="Chave de Acesso" subtitle={"Ativas"}
                    footer={<Button to='/token/register' text="Nova Aplicação" />}>
                    <Grid
                        rows={rows
                            // [
                            //     { id: 99, aplicacao: 'SGI', token: '304958304598jjdjddl49i', inicio: '01/01/2020', validade: '31/12/2020', ativo: 'SIM' },
                            // ]
                        }
                        columns={[
                            // { name: 'id', title: 'COD.' },
                            { name: 'nome', title: 'APLICAÇÃO' },
                            { name: 'token', title: 'CHAVE' },
                            // { name: 'dataCadastro', title: 'CADASTRO' },
                            { name: 'dataExpiracao', title: 'VALIDADE' },
                            // { name: 'ativo', title: 'ATIVO?' },

                        ]}>
                        <EditingState
                            onCommitChanges={this.commitChanges}
                        />
                        <Table />
                        <TableHeaderRow />
                        <TableEditColumn
                            commandComponent={this.Command}
                            showDeleteCommand
                        />
                    </Grid>

                </Card>
            </>

        )
    }
}
