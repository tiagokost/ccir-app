import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box,Button, Paper, Typography, Grid } from '@material-ui/core'

class componentName extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var { children } = this.props
        return (
            <div id="container">

                <Box id="divToPrint1" className="mt4" boxShadow={4} border={0} style={{
                    backgroundColor: '#ffffff'
                    , width: '210mm'
                    , minHeight: '297mm'
                    , marginTop: '5mm'
                }}>
                    {children}
                </Box>
            </div>
        )
    }
}

componentName.propTypes = {

}

export default componentName