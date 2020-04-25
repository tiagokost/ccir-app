import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Button, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarText } from 'reactstrap'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'



export var getEnvironmentStyle = (environment) => {
	switch (environment) {
		case "development":
			return "badge badge-success mr-sm-2"
		case "homologation":
			return "badge badge-warning mr-sm-2"
		case "maintenance":
			return "badge badge-info mr-sm-2"
		case "test":
			return "badge badge-light mr-sm-2"
		case "production":
			return ""
		default: return ""
	}
}

export default props => {

	const [isOpen, setOpen] = useState(true)
	const toggle = () => setOpen(!isOpen)
	const { userName, environment, isAuthenticated, appTitle, appSubtitle } = props

	return (
		<Navbar color="dark" dark className="navbar shadow-sm p-3" expand="md">
			{isAuthenticated && <Button color="secondary" onClick={props.toggle}>
				<FontAwesomeIcon icon={faAlignLeft} />
			</Button>}
			<NavbarToggler onClick={toggle} />

			<Collapse isOpen={isOpen} navbar>
				{!isAuthenticated
					&& 
						<NavbarText>
							<h3><span>{appTitle}</span><strong>{appSubtitle}</strong></h3>
						</NavbarText>
					}
				<Nav className="ml-auto" navbar>

					<NavItem>
						<NavbarText >
							<span
								className={getEnvironmentStyle(environment?.value)}>{environment?.value != "production" ? environment?.label : ""}</span>
						</NavbarText>
					</NavItem>
					{isAuthenticated
						&& <>
							<NavItem>
								<NavLink tag={Link} to={'../user'} > {userName}</NavLink>

							</NavItem>
							<NavItem>
								<NavLink tag={Link} to={'../logout'} > <ExitToAppIcon></ExitToAppIcon></NavLink>
							</NavItem>
						</>}
				</Nav>
			</Collapse>
		</Navbar>
	);
}