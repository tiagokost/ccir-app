import React, { Component } from 'react'
import styles from './styles'
import CircularProgress from '@material-ui/core/CircularProgress'

export function close(){
    var modal = document.getElementById("progressModal")
    if(modal){
        modal.style.display = "none"
    }
}

export  function show(){
    var modal = document.getElementById("progressModal")
    if(modal){
        modal.style.display = "block"
    }
}

export const Progress = () => {
    return (
        <div id="progressModal" style={styles.modal}>
            <div style={styles.modalContaint}>
                <CircularProgress
                    size={64}
                    style={styles.progress} />
            </div>
        </div>
    )
}

export default Progress
