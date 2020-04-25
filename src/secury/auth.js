import cookie from 'react-cookies'
import { useLocation, Redirect } from 'react-router-dom'
import axios from 'axios'
import infraConfig from './../infra.config'
import userResource from './userResource'

export const isAuthorized = (resource) => {
    const user = getAuthUser()
    if (!user) return false
    return userResource.map && userResource.map(res => {
        if (res.profile == user.profile) {
           // console.log(res)
            return res.resources && res.resources.map(o=>{

                if(o==resource.pathname){
                    console.log("permitiu")
                    return true
                }
            })
        }
        return false
    })
}
export const isAuthenticated = () => cookie.load('user')?.token

export const getToken = () => {
    if (cookie.load('user')?.token)
        return cookie.load('user')?.token
    return null

}

export const getAuthUser = () => {
    //console.log(cookie.load('user')?.user)
    return cookie.load('user')?.user
}

export const profile = () => {

    const authUser = cookie.load('user')?.user
    switch (authUser?.profile) {
        case 1://ADMIN
        case "ADMIN":
        case "SUPERVISOR":
        case 3://SUPERVISOR
            return "gestor"
        case 2://AGENTE
        case "AGENTE":
            return "agente"
        case -99:
            return "condutor"
        default: return ""
    }
}

export const headers = { headers: { authorization: getToken() } }

export const authUser = async (login, password) => {

    const { api } = infraConfig
    const { urlBase } = api

    const user = {
        "login": login
        , "password": password
        , "active": true
        , "name": ""
        , "registration": null
        , "profile": null
    }

    const result = await axios({
        method: 'post',
        url: urlBase + 'usuario/login',
        data: "{\"login\": \"" + login + "\", \"password\":\"" + password + "\"}"
    })
        .then(async (response) => {
            if (response.status == 200) {
                console.log(response.headers['authorization'])
                let data = {
                    token: response.headers['authorization']
                    , login: login
                    , user: null
                }
                // console.log( response.headers['authorization'] )
                cookie.save('user', data, { path: '/', maxAge: infraConfig.loginTimeout })
                // console.log('autorizou: ' + data.token)
                // console.log('\nusuario: ' + data.login)

                await axios.get(urlBase + 'usuario/by-username/' + login
                    , { headers: { authorization: response.headers['authorization'] } }
                )
                    .then(res => {
                        data.user = res.data
                        cookie.save('user', data, { path: '/', maxAge: infraConfig.loginTimeout })
                        // console.log(data)
                    }).catch(ex => console.log(ex.message))
                return true
            }
            logoutUser()
            return false
        })
        .catch(ex => {
            console.log(ex.message)
        })

    return result

    // const result = axios.post('http://localhost:7200/api/v1/usuario/login', 
    // {
    //     data: user
    // },
    // {
    //     headers: {
    //         'Content-Type': 'application/json'
    //         ,'Cache-Control': 'no-cache'
    //         ,"Access-Control-Allow-Origin": "*"
    //     }
    // })
    // const result = axios({
    //     method: 'post',
    //     url: 'http://localhost:7200/api/v1/usuario/login',
    //     data: "{\"login\": \""+ login +"\", \"password\":\""+password+"\"}"
    //   })
    //     .then(response => {
    //         if (response.status ==  200) {
    //             console.log(response.headers['authorization'] )
    //             const data = {
    //                 token: response.headers['authorization'] 
    //                 ,login: login
    //             }
    //             cookie.save('user', data, { path: '/',maxAge: infraConfig.loginTimeout})
    //             return true
    //         }
    //         logoutUser()
    //         return false
    //     })
    //     .catch(ex=>{
    //         console.log(ex.message)
    //     })

    // return result
}

export const logoutUser = () => {

    cookie.remove('user', { path: '/' })
    return true

}