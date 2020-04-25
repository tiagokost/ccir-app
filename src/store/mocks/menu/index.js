import { faSearch, faCogs, faBook, faHome, faBriefcase, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export const menuGestor = [
    {
        "title": "Início",
        "icon": faHome,
        "target": "/"
    },
    {
        "title": "Documento",
        "icon": faSearch,
        "submenus": [
            {
                "title": "Buscar",
                "target": "/doc/search"
            }
        ]
    },
    {
        "title": "Chave de Acesso",
        "icon": faBriefcase,
        "submenus": [
            {
                "title": "Liberar acesso",
                "target": "/token/register"
            },
            {
                "title": "Lista de aplicações",
                "target": "/token/manager"
            },
            {
                "title": "Cancelar chave",
                "target": "/token/cancel"
            }
        ]
    }, {
        "title": "Configurações",
        "icon": faCogs,
        "submenus": [
            {
                "title": "Geral",
                "target": "/config"
            }
        ]
    },
    {
        "title": "Ajuda",
        "icon": faBook,
        "submenus": [
            {
                "title": "Manual de instruções",
                "target": "./"
            },
            {
                "title": "Perguntas frequêntes",
                "target": "./"
            }
        ]
    }
]

export const menuAgente = [
    {
        "title": "Início",
        "icon": faHome,
        "target": "/"
    },
    {
        "title": "Documento",
        "icon": faSearch,
        "submenus": [
            {
                "title": "Buscar",
                "target": "/doc/search"
            }
        ]
    }, {
        "title": "Ajuda",
        "icon": faBook,
        "submenus": [
            {
                "title": "Manual de instruções",
                "target": "./"
            },
            {
                "title": "Perguntas frequêntes",
                "target": "./"
            }
        ]
    }
]

export const menuCondutor = [
    {
        "title": "Início",
        "icon": faHome,
        "target": "/"
    },
    {
        "title": "Ajuda",
        "icon": faBook,
        "submenus": [
            {
                "title": "Manual de instruções",
                "target": "./"
            },
            {
                "title": "Perguntas frequêntes",
                "target": "./"
            }
        ]
    }
]

export default () => [
    
    {
        "title": "Início",
        "icon": faHome,
        "target": "/"
    },
    {
        "title": "Ajuda",
        "icon": faBook,
        "submenus": [
            {
                "title": "Manual de instruções",
                "target": "./"
            },
            {
                "title": "Perguntas frequêntes",
                "target": "./"
            }
        ]
    }]



