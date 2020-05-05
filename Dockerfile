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
FROM node:13.1.0 as node_react

LABEL version="2.0"
LABEL description="CCIR - Sistema Gestão de Infração"
LABEL maintainer="Raphael Pinheiro <raphael.pinheiro@engineti.com.br>"

WORKDIR /app
COPY ./ /app/
# Adicionando `/app/node_modules/.bin` para o $PATH
# ENV PATH /app/node_modules/.bin:$PATH

## INCLUIR PROCEDIMENTO DE BUILD PARA O REACT AQUI
## npm update
## npm run build
## npm install -g serve
## serve -s build -l 3000

# update modules
RUN npm install
RUN npm run build
#RUN npm start
RUN npm install -g serve
#RUN npm run build
RUN serve -s build -l 3000
#CMD ["npm", "start"]


# Estagio 2 - Será responsavel por expor a aplicação
FROM nginx:1.13

COPY --from=node_react /app/build /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
