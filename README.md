# DzNewsFrontEnd
##Introduce
DzNews前端，利用AngularJS去调用Java端提供的RESTFul API，充当了MVC中Controller层的作用，达到了前后端分离的效果
Nginx负责前端静态文件的代理，以及将后端RESTFul API转发给运行在8080端口的Tomcat，两者都部署在一台机器，避免了
网络延迟等。
##Nginx配置
        
    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location /  {
            root   /usr/share/nginx/html/DzNewsFrontEnd/app;
            #index  index.html index.htm;
            try_files $uri $uri/ /index.html =404;
        }

        


        location /api/ {
            proxy_pass http://localhost:8080;
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            client_max_body_size 10m;
            client_body_buffer_size 128k;
            proxy_connect_timeout 90;
            proxy_send_timeout 90;
            proxy_read_timeout 90;
            proxy_buffer_size 4k;
            proxy_buffers 4 32k;
            proxy_busy_buffers_size 64k;
            proxy_temp_file_write_size 64k;
        }
        }

##访问
部署在阿里云
http://115.28.26.248/
