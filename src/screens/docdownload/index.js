import React, { Component } from 'react'
import { PDFDownloadLink, PDFViewer, Document, Text, Page } from '@react-pdf/renderer'
import { Redirect} from 'react-router'
import AIT from '../../business/doc/AIT'
import ReactPDF from '@react-pdf/renderer'
import AitStore from '../../store/ait-store'

export default class Docdownload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileName: props.fileName
        }
    }
    
    render() {
        const {fileName,ait } = this.state
        if(!this.props.ait){
            return (<div>Aguarde..</div>)
        }
        return (

            <div style={{ margin: 10 }}>
                <PDFDownloadLink document={<AIT obj={this.props.ait}></AIT>} fileName={this.props.fileName}>
        {({ blob, url, loading, error }) => (loading ? <div>Aguarde..</div> : exec(this.props.ait.numero,url,blob) )}
                </PDFDownloadLink>
            </div>
        )
    }
}

const exec = (numero,url,blob) =>{
    let aitStore = new AitStore();
    aitStore.postAitDocPdf(numero,blob)
    return (<div>Clique para baixar o PDF</div>)
}
