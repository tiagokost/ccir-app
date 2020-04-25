import React, { Component } from 'react'
import { TextBox, Form, Card, FormButtons } from './../../../shared/components/coreui'

export default class TokenCancel extends Component {
    render() {
        return (
            <Card
                title="Cancelamento de "
                subtitle="Chave de Acesso"
                footer={<FormButtons
                    label1={"voltar"}
                    label2={"cancelar chave"}
                    onSubmit={x => {

                    }}
                    onCancel={x => {

                    }}
                />} >

                <Form >
                    <TextBox label="Chave" id="chave" placeholder="" />
                </Form>
            </Card>)
    }
}
