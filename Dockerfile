# API CCIR - V1
# -------------------------------------------
# Modelo Dockerfile para utilizacao com container
#
# PASSO 1: 
# Fazer o checkout ou clone do projeto do gitlab (git clone etc...)
# Checar os arquivos Dockerfile, scripts shells, portas, versoes etc.
#
# PASSO 2:
# Fazer o build da imagem
# Verificar como passar o parametro de profile (verificar a melhor forma para o react)
#
# $ docker build --build-arg env={PARAM_BUILD} -t simove/ccirportal:v1.0 .
#
# PASSO 3:
# Executar o container com o buid
# $ docker run -d --name ccir_portal_{profile} -e PROFILE=${PROFILE}? -e CLIENT=${CLIENT}? -p 3000:3000 --restart=always simove/ccirportal:v1.0
#
#

# Estagio 1 - Será responsavel em construir nossa aplicação
FROM node:12.16.1-slim as node_react

LABEL version="2.0"
LABEL description="CCIR - Sistema Gestão de Infração"
LABEL maintainer="Raphael Pinheiro <raphael.pinheiro@engineti.com.br>"

WORKDIR /app
COPY ./ /app/

## INCLUIR PROCEDIMENTO DE BUILD PARA O REACT AQUI




# Estagio 2 - Será responsavel por expor a aplicação
FROM nginx:1.13

COPY --from=node_react /app/dist/??????? /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
