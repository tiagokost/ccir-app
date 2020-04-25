import React, { Component } from 'react'

export default class Ait {

    constructor(ait) {

        if(!ait){
            return
        }
        if(ait){
            this.numero                      = ait.numero
            this.codigoOrgao                 = ait.codigoOrgao
            this.observacoes                 = ait.observacoes
            this.dataAutuacao                = ait.dataAutuacao
            this.descricao                   = ait.descricao
            this.observacao                  = ait.observacao
            this.amparoLegal                 = ait.amparoLegal
            this.assinou                     = ait.assinou
            this.infraest                    = ait.infraest
            this.renainf                     = ait.renainf
            this.justificativaCancelamento   = ait.justificativaCancelamento
            this.caminhoImagem               = ait.caminhoImagem
            this.caminhoImagemAssinaturaUsuario  = ait.caminhoImagemAssinaturaUsuario
            this.enviadoRenainf                  = ait.enviadoRenainf
            this.processadoRenainf               = ait.processadoRenainf
        }
        if(ait?.usuario){
            this.usuario = {
                idUsuario                      : ait.usuario?.idUsuario
                ,nome                          : ait.usuario?.nome
                ,cpf                           : ait.usuario?.cpf
                ,matricula                     : ait.usuario?.matricula
                ,login                         : ait.usuario?.login
                ,senha                         : ait.usuario?.senha
                ,ativo                         : ait.usuario?.ativo
                ,idPerfil                      : ait.usuario?.idPerfil
                ,idCliente                     : ait.usuario?.idCliente
                ,qtsTaloesLiberacao            : ait.usuario?.qtsTaloesLiberacao
                ,email                         : ait.usuario?.email
                ,senhaAlterada                 : ait.usuario?.senhaAlterada
                ,senhaProvisoria               : ait.usuario?.senhaProvisoria
                ,acessoBalanca                 : ait.usuario?.acessoBalanca
                ,versaoApp                     : ait.usuario?.versaoApp
                ,caminhoImagemAssinaturaAgente : ait.usuario?.caminhoImagemAssinaturaAgente
            }
        }
        if(ait?.status){
            this.status ={
                idStatus:  ait.status?.idStatus
                ,nome:     ait.status?.nome
                ,tipo:     ait.status?.tipo
            }
   
        }


        if(ait && ait.veiculo){
            this.veiculo =  {
                 placa                        : ait.veiculo.placa
                , chassi                      : ait.veiculo.chassi
                , marca                       : ait.veiculo.marca
                , modelo                      : ait.veiculo.modelo
                , idVeiculo                   : ait.veiculo.idVeiculo      
                , nmMarca                     : ait.veiculo.nmMarca    
                , pais                        : ait.veiculo.pais 
                , idEspecie                   : ait.veiculo.idEspecie    
                , idEstado                    : ait.veiculo.idEstado     
                , estado                      : ait.veiculo.estado   
                , nomeEstado                  : ait.veiculo.nomeEstado       
            }
            if(ait.veiculo.especie){
                this.veiculo.especie = {
                    idEspecie                 : ait.veiculo.especie.idEspecie
                    , nome                    : ait.veiculo.especie.nome
                }
            }
        }
        if(ait && ait.condutor){
            this.condutor =  {
                nome                          : ait.condutor.nome
                , cnh                         : ait.condutor.cnh
                , rg                          : ait.condutor.rg
                , uf                          : ait.condutor.uf
                , pais                        : ait.condutor.pais
                , idCondutor                  : ait.condutor.idCondutor                           
                , documentoAvulso             : ait.condutor.documentoAvulso             
                , pais                        : ait.condutor.pais  
                , tipoDocumento               : ait.condutor.tipoDocumento           
                , naoHabilitado               : ait.condutor.naoHabilitado           
                , evadiu                      : ait.condutor.evadiu    
                , idEstado                    : ait.condutor.idEstado   
                , idEstadoOrgEmissorCnh       : ait.condutor.idEstadoOrgEmissorCnh   
            }
            if(ait.condutor.estado){
                this.condutor.estado = {
                    idEstado                  : ait.condutor.estado.idEstado     
                    ,nome                      : ait.condutor.estado.nome 
                    ,sigla                     : ait.condutor.estado.sigla  
                }
            }
        }
        if(ait && ait.locais){
            this.locais = []
            if(ait.locais.map){
                ait.locais.map( loc =>           
                        this.locais.push({
                            idAitLocal:loc.idAitLocal
                           ,data:loc.data
                           ,descricao:loc.descricao
                           ,idMunicipio:loc.idMunicipio
                           ,municipio: {
                                idMunicipio:loc.municipio?.idMunicipio
                                ,codigo:loc.municipio?.codigo
                                ,nome:loc.municipio?.nome
                                ,idEstado:loc.municipio?.idEstado
                                ,estado:{
                                    idEstado:loc.municipio?.estado?.idEstado
                                    , nome:loc.municipio?.estado?.nome
                                    , sigla:loc.municipio?.estado?.sigla
                                }
                            }
                           ,dataOcorrencia:loc?.dataOcorrencia
                           ,horaOcorrencia:loc?.horaOcorrencia   
                        }                      
                    )
                )                    
            }
            
        }
        if(ait && ait.local){
            this.local =  {
                local                       : ait.local.local
                , municipio                   : ait.local.municipio
                , uf                          : ait.local.uf
                , dataHora                    : ait.local.dataHora
            }
        }else{
            if(this.locais && this.locais.map && this.locais.length > 0)
                this.local = this.locais[0]
        }

        if(ait && ait.tipificacoes){
            if(ait.tipificacoes.length >0){
                this.tipificacaoInfracao =  {
                    codigoInfracao                : ait.tipificacoes[0]?.tipificacao?.codigo
                    , desdobramento               : ait.tipificacoes[0]?.tipificacao?.descricao
                    , amparoLegal                 : ait.tipificacoes[0]?.tipificacao?.codigoDetran
                }
            }
        }

        this.procedimentos = ait.procedimentos

        if(ait && ait.afericaoEtilometro){
            this.afericaoEtilometro =  {
                marca                        : ait.afericaoEtilometro.marca
                , modelo                      : ait.afericaoEtilometro.modelo
                , numeroSerie                 : ait.afericaoEtilometro.numeroSerie
                , embarcador                  : ait.afericaoEtilometro.embarcador
            }
        }
        
        if(ait && ait.agenteAutuador){
            this.agenteAutuador =  {
                nome                         : ait.agenteAutuador.nome
                , matricula                   : ait.agenteAutuador.matricula
                , assinaturaCondutorImgByte   : ait.agenteAutuador.assinaturaCondutorImgByte
                , assinaturaAgenteImgByte     : ait.agenteAutuador.assinaturaAgenteImgByte
            }
        }

        if(ait && ait.tipificacoes){
            this.tipificacoes = []
            if(ait.tipificacoes.map){
                ait.tipificacoes.map( ti =>{
                    this.tipificacoes.push({
                        
                          idAitTipíficacaoInfracao : ti.idAitTipíficacaoInfracao
                        , idTipificacaoInfracao : ti.idTipificacaoInfracao
                        , tipificacao : ti.tipificacao                          
                        , idTipificacao : ti.idTipoEquipamento
                        , tipificacao : {
                             codigo : ti.tipificacao?.codigo
                            ,descricao : ti.tipificacao?.descricao 
                            ,codigoDetran : ti.tipificacao?.codigoDetran
                        }
                    })
                })
            }
        }

        if(ait && ait.talao){
            this.talao = {
                 idTalao                    : ait.talao.idTalao    
                ,numero                     : ait.talao.numero   
                ,codigoRenainf              : ait.talao.codigoRenainf          
                ,tipo                       : ait.talao.tipo 
                ,idStatus                   : ait.talao.idStatus     
        
            }
            if(ait.talao.status){
                ait.talao.status = { 
                     idStatus : ait.idStatus                    
                    ,nome : ait.nome
                    ,tipo : ait.tipo               
                }    
            }

            if(ait.talao.equipamento){
                let equipamento = {
                    descricao : ait.talao?.equipamento?.descricao
                    ,identificador : ait.talao?.equipamento?.identificador
                    ,idStatus : ait.talao.equipamento.idStatus
                    ,idTipoEquipamento : ait.talao.equipamento.idTipoEquipamento
                }
                if(ait.talao.equipamento.tipoEquipamento){
                    let tipoEquipamento = {
                        nome: ait.talao.equipamento.tipoEquipamento.nome
                    }
                    equipamento.tipoEquipamento = tipoEquipamento
                }
                this.talao =  {
                    equipamento: equipamento
                }
            }
            
        }
        console.log(this)
        
    }
}
