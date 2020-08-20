import React, { Component } from 'react'
import classNames from 'classnames'
import { Container } from 'reactstrap'
import { Switch, Route, withRouter, BrowserRouter, Redirect } from 'react-router-dom'
import { Home } from './screens/dashboard'
import Docview from './screens/docview'
import TokenRegister from './screens/token/register'
import TokenCancel from './screens/token/cancel'
import TokenManager from './screens/token/manager'
import DocSearch from './screens/docsearch'
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Breadcrumb } from './shared/components/coreui'
import Login from './screens/login'
import { isAuthenticated, logoutUser,isAuthorized } from './secury/auth'
import User from './screens/user'
import Logout from './screens/logout'
import Progress, { show,close	 } from './shared/components/progress'
import AitView from './screens/ait'
import AitStore from './store/ait-store'
import Config from './screens/config'
import Docdownload from './screens/docdownload'


const PrivateRoute = ({ component: RouteComponent, ...rest }) => (
	<Route
		{...rest}
		render={props => isAuthenticated() && isAuthorized(props.location) ? (
			<RouteComponent {...props} />
		) : (
				<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
			)} />
)

const Routes = ({ location, isOpen, children }) => (
	<Container fluid className={classNames('content p-0', { 'is-open': isOpen })}>
		{children}

		<TransitionGroup className="transition-group">
			<CSSTransition
				key={location.key}
				timeout={{ enter: 300, exit: 100 }}
				classNames={'fade'}
			>
				<div className="route-section" style={{ paddingLeft: 20, paddingRight: 20 }}>

					<Switch location={location}>
						<Route exact path="/login"
							component={() =>
								<>
									<Breadcrumb breadcrumb={[]} />
									{!isAuthenticated() ? (<Login />) : (<Logout />)}
								</>
							}>

						</Route>
						<PrivateRoute exact path="/logout"
							component={() => {
								return (<>
									<Progress />
									<Breadcrumb breadcrumb={[]} />
									<Logout />
								</>)
							}

							}>
						</PrivateRoute>
						<PrivateRoute exact path="/user"
							component={() => {
								return (<>
									<Breadcrumb breadcrumb={[
										{
											label: 'Dashboard'
											, href: '/'
										}
										, {
											label: 'Usuário'
										}]} />
									<User />
								</>)
							}

							}>

						</PrivateRoute>
						<PrivateRoute exact path="/ait/:numero" component={(props) =>
							<>
								<Breadcrumb breadcrumb={[
									{
										label: 'Documento'
										, href: '/doc/search'
									}
									, {
										label: 'AIT'
									}]} />
								<AitView {...props} />
							</>
						}></PrivateRoute>
						<PrivateRoute exact path="/ait/pdf/:numero" component={(props) =>
							<>
								<Breadcrumb breadcrumb={[
									{
										label: 'Documento'
										, href: '/ait/pdf'
									}
									, {
										label: 'AIT'
									}]} />
								<AitView pdf={true} {...props} />
							</>
						}></PrivateRoute>
						<PrivateRoute exact path="/doc/search" component={() =>
							<>
								<Breadcrumb breadcrumb={[
									{
										label: 'Documento'
										, href: '/doc/search'
									}
									, {
										label: 'Localizar'
									}]} />
								<DocSearch />
							</>
						}></PrivateRoute>
						<Route exact path="/ait/consulta/:token" component={(props) =>
							<>
								<Breadcrumb breadcrumb={[
									{
										label: 'Documento'
										, href: '/doc/search'
									}
									, {
										label: 'AIT'
									}]} />
								<AitView {...props} />
							</>
						}></Route>
						<PrivateRoute exact path="/token/register" component={() =>
							<>
								<Breadcrumb breadcrumb={[
									{
										label: 'Chave de Acesso'
										, href: '/token/manager'
									}
									, {
										label: 'Cadastrar'
									}]} />
								<TokenRegister />
							</>
						}>

						</PrivateRoute>
						<PrivateRoute exact path="/token/cancel"
							component={() =>
								<>
									<Breadcrumb breadcrumb={[
										{
											label: 'Chave de Acesso'
											, href: '/token/manager'
										}
										, {
											label: 'Cancelar'
										}]} />
									<TokenCancel />
								</>
							}>

						</PrivateRoute>
						<PrivateRoute exact path="/token/manager"
							component={() =>
								<>
									<Breadcrumb breadcrumb={[
										{
											label: 'Chave de Acesso'
										}]} />
									<TokenManager />
								</>
							}>

						</PrivateRoute>
						<PrivateRoute exact path="/doc/view"
							component={() =>
								<>
									<Breadcrumb breadcrumb={[
										{
											label: 'Documento'
											, href: '/doc/search'
										}
										, {
											label: 'Visualizar'
										}]} />
									<Docview />
								</>
							}>

						</PrivateRoute>
						<PrivateRoute exact path="/config"
							component={() =>
								<>
									<Breadcrumb breadcrumb={[
										{
											label: 'Coonfigurações'
											, href: '/config'
										}
										, {
											label: 'Geral'
										}]} />
									<Config />
								</>
							}>

						</PrivateRoute>
						<PrivateRoute component={() =>
							<>
								<Breadcrumb breadcrumb={[]} />
								<Home />
							</>
						}>

						</PrivateRoute>
					</Switch>

				</div>
			</CSSTransition>
		</TransitionGroup>

	</Container>
)

export default withRouter(Routes)