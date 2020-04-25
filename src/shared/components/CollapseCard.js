import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Collapse
} from 'reactstrap'

export const CollapseCard = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)
    const { title, subtitle, footerComponent, children } = props
    return (
        <div>
            <Button color="primary" className={"btn btn-pill btn-primary"} onClick={toggle} style={{ marginBottom: '1rem' }}>Busca avançada</Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <CardTitle>{title}</CardTitle>
                        <CardSubtitle>{subtitle}</CardSubtitle>
                        {children}
                    </CardBody>
                    <div className="card-footer">
                        <div className="col-sm-12 col-md-8">
                            {footerComponent}
                        </div>
                    </div>
                </Card>
            </Collapse>
        </div>
    )
}

CollapseCard.propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.node,
    navbar: PropTypes.bool,
    cssModule: PropTypes.object,
    innerRef: PropTypes.object,
}
export default CollapseCard