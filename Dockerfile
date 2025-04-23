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