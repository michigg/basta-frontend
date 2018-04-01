FROM node:8 as build

COPY . /app
WORKDIR /app
RUN npm install && npm run build


FROM httpd:2.4-alpine
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/
