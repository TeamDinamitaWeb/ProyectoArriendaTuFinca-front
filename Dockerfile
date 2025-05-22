# Etapa 1: Build de la aplicación Angular
FROM node:18.19.0 AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install --legacy-peer-deps

# Copiar el resto del proyecto
COPY . .

# Instalar Angular CLI y compilar la aplicación
RUN npm install -g @angular/cli \
    && ng build ProyectoAngular --configuration production

# Etapa 2: Servidor Apache para servir la app
FROM httpd:2.4

# Reemplazar la configuración de Apache (opcional)
COPY ./k8s/my-httpd.conf /usr/local/apache2/conf/httpd.conf

# Copiar .htaccess (si usas rutas amigables)
COPY ./k8s/.htaccess /usr/local/apache2/htdocs/

# Copiar la build de Angular al directorio público de Apache
COPY --from=builder /app/dist/proyecto-angular/browser/ /usr/local/apache2/htdocs/

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto de Apache
CMD ["httpd", "-D", "FOREGROUND"]