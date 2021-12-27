## 1、安装xampp

/opt/lampp/./lampp start 启动
/opt/lampp/./lampp stop 关闭

## 2、安装jdk

1. 查询要安装jdk的版本：

    yum -y list java*

2. 安装jdk1.8

    yum install -y java-1.8.0-openjdk.x86_64

3. 查询jdk版本

     java -version

   

## 3、安装Jenkins

jdk----Jenkins使用java开发，首先必然需要安装jdk
1、直接选war包下载
2、java -jar jenkins.war

启动
service jenkins start
重启
service jenkins restart
停止
service jenkins stop

启动完成后直接访问链接：http://localhost:8080/jenkins/

**如果有报错进行配置 vi /etc/init.d/jenkins**

管理员的密码：ba607b387a684a459399041ef061cbef

**jenkins账户**
账户：xhz
密码：xhzshr
全名：xuhuazhi

## 4、安装gitlab

直接执行以下命令行

1、curl -s https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
2、sudo yum install gitlab-ce-14.0.6-ce.0.el7.x86_64

3、	/etc/gitlab/gitlab.rb
		  external_url 'http://10.101.126.9/:9090'
		  unicorn['port'] = 9090
4、gitlab-ctl reconfigure
修改root密码
	cd /opt/gitlab/bin/
	gitlab-rails console
	user = User.where(username:"root").first
	user.password = "Qdies@123"
	user.save!
	exit

启动服务
$ gitlab-ctl start
停止服务
$ gitlab-ctl stop
获取运行状态
$ gitlab-ctl status
获取帮助信息
$ gitlab-ctl --help

 **3、4、步都需要进行 开放端口号 重点！！！：**
关闭自启防火墙
systemctl disable firewalld
1、关闭防火墙
firewall-cmd--zon=public --list-ports
2、开放指定端口
firewall-cmd --zone=public --add-port=8086/tcp --permanent
 命令含义：
--zone #作用域
--add-port=1935/tcp  #添加端口，格式为：端口/通讯协议
--permanent  #永久生效，没有此参数重启后失效
3、查看防火墙状态
 firewall-cmd --state
4、查看对外开放端口
firewall-cmd --zone=public --list-ports
5、重新加载防火墙 立即生效
firewall-cmd --reload



**Gitlab** 
管理员账号：root
管理员密码： Qdies@123

**git**      用户
name：GGxu
密码：12345678
邮箱：510374040@qq.com





## 脚本

#!/bin/bash
#判断是否存在  如果存在删除
if [ -f /app/rh ]; then
	rm  -rf  /app/rh
fi
#临时创建一个文件 RH
mkdir  /app/rh
#把原来的项目 cp一份放到RH的文件夹里面
cp -r  /opt/lampp/htdocs/application   /app/rh
cp -r  /opt/lampp/htdocs/public   /app/rh
#进行打包压缩 加上时间
tar -zcPvf /app/rh$(date +%Y%m%d).tar.gz  /app/rh
#删除原来的项目
rm -rf /opt/lampp/htdocs
#把Jenkins拉取的项目 复制一份
cd /var/lib/jenkins/workspace/testPHP/00-source
cp -r htdocs  /opt/lampp
#删除新项目里面的public下的文件
rm -rf /opt/lampp/htdocs/public/uploads
rm -rf /opt/lampp/htdocs/public/static/index/video
#复制之前备份的临时文件夹里面的uploads文件 cp到  新的项目里面 进行替换
cp -r /app/rh/public/uploads   /opt/lampp/htdocs/public/uploads
cp -r /app/rh/public/static/index/video   /opt/lampp/htdocs/public/static/index/video
#删除临时文件夹
rm -rf /app/rh