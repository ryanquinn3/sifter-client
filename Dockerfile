FROM nginx

COPY nginx.conf /etc/nginx.conf
COPY build /usr/share/nginx/html
