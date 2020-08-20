import React, { Component } from 'react'
import { PDFViewer, Document, Text, Page } from '@react-pdf/renderer'
import AIT from '../../business/doc/AIT'
import ReactPDF from '@react-pdf/renderer'

export default class Docview extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { children } = this.props
        return (
            <PDFViewer
                width={'100%'}
                height={'500'}>
                {children}
                
            </PDFViewer>
        )

    }
}



