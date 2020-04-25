import React, { useState } from 'react'
import './App.css'
import { Body, Breadcrumb, AppBody, FormPanel, Footer } from './shared/components/coreui'
import infraConfig from './infra.config.json'
import appConfig from './app.config.json'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom"

import SideBar from './shared/components/sidebar'
import Routes from './routes'
import menu, { menuAgente, menuGestor, menuCondutor } from './store/mocks/menu'
import NavBar from './shared/components/navbar'
import { profile, isAuthenticated, getAuthUser } from './secury/auth'

const getMenu = (profile) => {
	console.log('Profile: ' + profile)
	switch (profile) {
		case 'gestor':
			return menuGestor
		case 'agente':
			return menuAgente
		case 'condutor':
			return menuCondutor
		default: return menu
	}
}

export default () => {

	const [isOpen, setOpen] = useState(true)
	const toggle = () => setOpen(!isOpen)
	const authUser = getAuthUser()
	return (
		<Router>
			<div className="App wrapper" >
				<SideBar
					appTitle={appConfig?.appTitle}
					appSubtitle={appConfig?.appSubtitle}
					title="NAVEGAÇÃO"
					disabled={!isAuthenticated()}
					menuItens={getMenu(profile())}

					onSelectMenuItem={(selectedItem) => {
						this.setState({ selectedItem })
					}}
					toggle={toggle}
					isOpen={isOpen}
				/>
				<Routes
					toggle={toggle}
					isOpen={isOpen}>
					<NavBar
						appTitle={appConfig?.appTitle}
						appSubtitle={appConfig?.appSubtitle}
						toggle={toggle}
						environment={infraConfig?.environment}
						isAuthenticated={isAuthenticated()}
						userName={authUser?.name} />
				</Routes>

			</div>
			{/* <Footer 
				version={infraConfig?.version} 
				linkVersion={infraConfig?.linkVersion} /> */}
		</Router>
	)
}

//  () => {

// 	const [isOpen, setOpen] = useState(true)
// 	const toggle = () => setOpen(!isOpen)

// 	return (
// 		<Body>
// 			<Router>

// 				<NavBar
// 					title={appConfig.appTitle}
// 					subtitle={appConfig.appSubtitle}
// 					userName="joaocosta@detranpa.gov.br"
// 					environment={{
// 						label: infraConfig?.environment?.label
// 						, color: infraConfig?.environment?.value
// 					}} />

// 				<AppBody>
// 					<SideBar toggle={toggle} isOpen={!isOpen} />

// 					{/* <SideBar
// 					title="NAVEGAÇÃO"
// 					menuItens={menu}
// 					onSelectMenuItem={(selectedItem)=>{
// 						this.setState({selectedItem})
// 					}}
// 				/> */}
// 					<FormPanel breadcrumb={
// 						{
// 							enabled: true
// 							, items: [{ label: "Dashboard", href: './' }]
// 						}}>

// 						<Switch>
// 							<Route path="/doc/search">
// 								<DocSearch />
// 							</Route>
// 							<Route path="/token/register">
// 								<TokenRegister />
// 							</Route>
// 							<Route path="/token/cancel">
// 								<TokenCancel />
// 							</Route>
// 							<Route path="/token/manager">
// 								<TokenManager />
// 							</Route>
// 							<Route path="/doc/view">
// 								<Docview />
// 							</Route>
// 							<Route>
// 								<Home />
// 							</Route>
// 						</Switch>
// 					</FormPanel>
// 				</AppBody>
// 			</Router>

// 			<Footer version={infraConfig?.version} linkVersion={infraConfig?.linkVersion} />
// 		</Body>
// 	);
// }

