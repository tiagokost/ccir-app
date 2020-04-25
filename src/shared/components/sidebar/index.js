import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SubMenu from './submenu'
import { NavItem, NavLink, Nav } from 'reactstrap'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const SideBar = props => {
   const { menuItens, appTitle, appSubtitle, disabled } = props
   return (
      disabled ? (
         <div className={classNames('sidebar', { 'is-open': false })}>

         </div>
      ) : (
            <div className={classNames('sidebar', { 'is-open': props.isOpen })}>
               <div className="sidebar-header">
                  <span color="info" onClick={props.toggle} >&times;</span>
                  <h3><span>{appTitle}</span><strong>{appSubtitle}</strong></h3>
               </div>

               <div className="side-menu">
                  <Nav vertical className="list-unstyled pb-3">
                     <p>NAVEGAÇÃO</p>
                     {renderMenuItens(menuItens)}
                  </Nav>
               </div>
            </div>
         )
   )
}

export const renderMenuItens = (menuItens) => {
   if (!menuItens) return

   return menuItens && menuItens.map && menuItens.map((menu, index) => {
      return (
         menu && menu.submenus ?
            <SubMenu title={menu.title} icon={menu.icon} items={menu.submenus} key={index} />
            :
            <NavItem key={index}>
               <NavLink tag={Link} to={menu.target}>
                  <FontAwesomeIcon icon={menu.icon} className="mr-2" />{menu.title}
               </NavLink>
            </NavItem>

      )
   })
}

export default SideBar
