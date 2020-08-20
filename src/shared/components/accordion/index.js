import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowCircleRight , faHome, faBriefcase, faPaperPlane, faQuestion, faImage, faCopy } from '@fortawesome/free-solid-svg-icons'

export const Accordion = (props) => {
    var { children } = props
    return (
        <div class="accordion" id="accordion">
            {children}
        </div>
    )
}

export const AccordionItem = (props) => {
    const { children, id, text } = props

    return (
        <div style={{ marginBottom: 0 }} className="card">
            <div style={{ backgroundColor: "#F5F5F5" }} className="card-header" id={"heading" + id.toString()}>
                
                <h2 className="mb-0">
                    <button
                        className="btn btn-link"
                        type="button"
                        data-toggle={"collapse"}
                        data-target={"#collapse" + id.toString()} 
                        aria-expanded={false}
                        aria-controls={"collapse" + id.toString()}>
                        <FontAwesomeIcon icon={faArrowCircleRight} className="mr-2" /><strong>{text?.toUpperCase()}</strong>
                    </button>
                </h2>
            </div>
            <div id={"collapse" + id.toString()} className="collapse" toggle={false} aria-labelledby={"heading" + id.toString()}  data-parent="#accordion">
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>

    )
}

