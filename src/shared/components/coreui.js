import React, { Component, useState } from 'react'
import HomeIcon from '@material-ui/icons/Home'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText } from 'reactstrap'
import TDatePicker from "react-datepicker"
import '@popperjs/core'
import '@coreui/coreui'


export const Image = (props)=>{
    return(<img {...props} src={props?.src} class="img-fluid" alt="Responsive image"></img>)
}
export class DatePicker extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date()
            , classText: defineSize(this.props.size)
        }
    }

    render() {
        const { classText } = this.state
        const { label,selected } = this.props
        return (
            <div className={classText ?? "form-group"}>
                <label>{label?.toUpperCase()}</label><br />
                <TDatePicker
                    {...this.props} 
                    onChange={this.props.onChange} 
                    className="form-control"
                    selected={selected}
                />
            </div>
        )
    }
}
export class ComboBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdownOpen: props.dropdownOpen
            , data: props.data
            , selectedText: this.getSelectedText(props.selectedValue, props.data)
            , classText: defineSize(props.size)
            , selectedValue: props.selectedValue
        }
    }
    getSelectedText = (selectedValue, data) => {
        if (!data) return

        let text = "<selecione>"

        data.map((item) => {
            if (item.value == selectedValue)
                text = item.text
        })

        return text
    }

    setDropdownOpen = (prevState) => {
        this.setState({ dropdownOpen: prevState })
    }

    render() {
        const { dropdownOpen, data, selectedText, classText } = this.state
        const { label } = this.props

        const toggle = () => this.setDropdownOpen(!this.state.dropdownOpen)
        return (
            <div className={classText ?? "form-group"}>
                <label>{label?.toUpperCase()}</label>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        {selectedText}
                    </DropdownToggle>
                    <DropdownMenu>
                        {data && data.map((item, index) =>
                            (<DropdownItem {...this.props} key={index} onClick={() => {
                                this.setState({ selectedText: item?.text, selectedValue: item?.value })
                                this.props.onClick && this.props.onClick(item)
                            }}>{item?.text}</DropdownItem>)
                        )}
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}
const defineSize = (size) => {
    switch (size) {
        case "large":
            return "form-group col-12 col-sm-12"
        case "small":
            return "form-group col-12 col-sm-4"
        case "medium":
            return "form-group col-12 col-sm-8"
        default:
            return "form-group"
    }
}
export class TextBoxButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classText: defineSize(props.size)
        }
    }
    render() {
        const { classText } = this.state
        return (
            <div className={classText ?? "form-group"}>
                <label>{this.props.label?.toUpperCase()}</label>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary" type="button">gerar</button>
                    </div>
                    <input placeholder={this.props.placeholder} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" readOnly>
                    </input>
                </div>
            </div>
        )
    }
}
export class TextBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            classText: defineSize(props.size)
        }
    }

    render() {
        const { classText, message } = this.state
        return (
            <div className={classText ?? "form-group"}>
                <label>{this.props.label?.toUpperCase()}</label>
                <input {...this.props} onChange={this.props.onChange} className="form-control" id={this.props.id} placeholder={this.props.placeholder} />
                {message && <span class="help-block">{message}</span>}
            </div>
        )
    }
}
export class Password extends TextBox {

    constructor(props) {
        super(props)
        this.state = {
            message: props.message
            , classText: defineSize(props.size)
        }

    }

    render() {
        const { classText, message } = this.state
        return (
            <div className={classText ?? "form-group"}>
                <label>{this.props.label?.toUpperCase()}</label>
                <input onChange={this.props.onChange} type="password" className="form-control" id={this.props.id} placeholder={this.props.placeholder} />
                {message && <span class="help-block">{message}</span>}
            </div>
        )
    }
}
export class DropBox extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="form-group">
                <label for={this.props.id}>{this.props.label?.toUpperCase()}</label>
                <select className="form-control" id={this.props.id}>
                    {this.props.data ? this.props.data.map(option => <option>{option.value}</option>) : <option>vazio</option>}
                </select>
            </div>
        )
    }
}
export class MultiSelect extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="form-group">
                <label for={this.props.id}>{this.props.label?.toUpperCase()}</label>
                <select multiple className="form-control" id={this.props.id}>
                    {this.props.data ? this.props.data.map(option => <option>{option.value}</option>) : <option>vazio</option>}
                </select>
            </div>
        )
    }
}
export class TextArea extends Component {
    render() {
        return (
            <div className="form-group">
                <label for="textareal1">{this.props.label?.toUpperCase()}</label>
                <textarea className="form-control" id="textareal1" rows="3"></textarea>
            </div>
        )
    }
}
export class AppBody extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var { children } = this.props
        return (
            <div className="app-body">
                {children}
            </div>
        )
    }
}
export class FormPanel extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { children, breadcrumb } = this.props
        return (
            <main className="main">
                {breadcrumb.enabled && <Breadcrumb breadcrumb={breadcrumb} />}
                <div className="container-fluid">
                    <div className="animated fadeIn">
                        {children}
                    </div>
                </div>
            </main>
        )
    }
}
export class Breadcrumb extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { breadcrumb } = this.props
        if (breadcrumb && breadcrumb.length == 0) {
            return (
                <nav className="breadcrumb ml-auto">
                    <a className="breadcrumb-item" href="./">
                        <HomeIcon color="action" /></a>
                </nav>
            )
        } else
            return (

                <nav className="breadcrumb ml-auto">
                    <a className="breadcrumb-item" href="./">
                        <HomeIcon color="action" /></a>

                    {(breadcrumb && breadcrumb.map) &&
                        breadcrumb.map((item, index) => {
                            if (item.href) {
                                return (<a className="breadcrumb-item" href={item.href} key={index}>{item.label}</a>)
                            }
                            return (<span className="breadcrumb-item active" key={index}>{item.label}</span>)
                        })
                    }
                </nav>
            )
    }
}
export class Card extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var { children, title, subtitle, footer, width } = this.props
        var widthV = ""
        switch (width) {
            case "medium":
                widthV = "col-sm-12 col-md-12"
                break
            case "small":
                widthV = "col-sm-12 col-md-4"
                break
            case "large":
                widthV = ""
                break
            default:
                widthV = ""
        }
        return (
            <div className={widthV} style={{ flexBasis: 'auto' }}>
                <div className="card">
                    <div className="card-header"><i className="icon-note"></i><strong>{title}</strong> {subtitle}</div>
                    <div className="card-body">
                        {children}
                    </div>
                    <div className="card-footer">
                        {footer}
                    </div>
                </div>
            </div>
        )
    }
}
export class Body extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var { children } = this.props
        return (
            <div className="app aside-menu-show">
                {children}
            </div>
        )
    }
}
export class Form extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var { children } = this.props
        return (
            <form>
                {children}
            </form>
        )
    }
}
export class Button extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { text, to, onClick } = this.props
        return (
            <button onClick={onClick} type="button" className="btn btn-pill btn-primary" {...this.props} >{text}</button>
        )
    }
}
export class ButtonGroup extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { type, text, to, onClick } = this.props
        let typeText = "btn btn-primary"
        if(type){
            typeText = "btn btn-" + type
        }
        return (
        <button type="button" className={typeText} onClick={onClick} {...this.props} >{text}</button>
        )
    }
}
export class Link extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { text, to, onClick } = this.props
        return (
            <a onClick={onclick} className="btn btn-pill btn-primary" href={to}>{text}</a>
        )
    }
}
export class FormButtons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: props.disabled && false
        }
    }
    render() {
        const { label1, label2 } = this.props
        const { disabled } = this.state
        return (
            <div className="btn-group mr-2" role="group" aria-label="First group">
                {label1 && <button onClick={this.props.onCancel} type="button" className="btn btn-pill btn-light" >{label1}</button>}
                <button onClick={this.props.onSubmit} type="button" className="btn btn-pill btn-primary" disabled={disabled}>{label2}</button>
            </div>
        )
    }
}
export class Footer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { linkVersion, version } = this.props

        return (
            <footer className="app-footer">
                <div className="ml-auto p-1 footer">versão&nbsp;<a href={linkVersion}>{version}</a></div>
            </footer>
        )
    }
}
export class ModalDialog extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        open: "modal fade show"
    }
    render() {
        const { open } = this.state
        const { onClick, message, title } = this.props
        return (
            <div
                className={open}
                role={"dialog"}
                tabIndex={"-1"}
                style={{ display: 'block' }}
            >
                <div className="modal-dialog modal-success undefined" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {message}
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => {
                                this.setState({
                                    open: "modal fade out"
                                })
                                onClick()
                            }} type="button" className="btn btn-success">
                                OK
                                    </button>
                            {/* <button type="button" className="btn btn-secondary">Cancel</button> */}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}











