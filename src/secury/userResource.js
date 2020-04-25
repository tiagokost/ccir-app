import React, { Component } from 'react'
export default [
    {
        profile: "ADM"
        , resources: ["/logout","/config","/doc/view","/token/manager","/token/cancel","/token/register","/ait/consulta/:token","/doc/search","/ait/:numero","/user"]
    },
    {
        profile: "SUPERVISOR"
        , resources: ["/logout","/config","/doc/view","/token/manager","/token/cancel","/token/register","/ait/consulta/:token","/doc/search","/ait/:numero","/user"]
    },
    {
        profile: "AGENTE"
        , resources: ["/logout","/doc/search","/ait/:numero","/user"]
    }

]