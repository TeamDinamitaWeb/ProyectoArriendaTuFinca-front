FROM node:18.10.0 AS builder

# Instalar nvm y Node.js 18.16.1
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . ~/.nvm/nvm.sh \
    && nvm install 18.16.1 \
    && nvm use 18.16.1 \
    && nvm alias default 18.16.1 \
    && node -v \
    && npm -v

# Añadir nvm al PATH para que esté disponible en futuras etapas de RUN
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=18.16.1
ENV NVM_BIN=$NVM_DIR/versions/node/v$NODE_VERSION/bin
ENV PATH=$NVM_BIN:$PATH

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la aplicación
COPY . /app

# Instalar dependencias y construir la aplicación
RUN npm install --legacy-peer-deps \
    && npm install -g @angular/cli \
    && ng build


FROM httpd:2.4

COPY ./k8s/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./k8s/.htaccess /usr/local/apache2/htdocs/
    
COPY --from=builder /app/dist/adminpro /usr/local/apache2/htdocs/
    
# Copia los archivos de la aplicación construida al directorio de trabajo de Apache
    
EXPOSE 80
CMD ["httpd", "-D", "FOREGROUND"]    