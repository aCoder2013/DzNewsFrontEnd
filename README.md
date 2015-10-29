# DzNewsFrontEnd
##Introduce
DzNews前端，利用AngularJS去调用Java端提供的RESTFul API，充当了MVC中Controller层的作用，达到了前后端分离的效果
Nginx负责前端静态文件的代理，以及将后端RESTFul API转发给运行在8080端口的Tomcat，两者都部署在一台机器，避免了
网络延迟等。
##访问
部署在阿里云
http://115.28.26.248/
