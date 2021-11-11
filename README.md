# Development Environment Setup

## Database
  - 数据库基本设置: 为了方便开发，目前数据库服务器在win/postgres目录下, 我已经配置好账户，密码，并且已经建好了目前的数据库表，写入了一些测试数据。
  - 启动数据库服务器：数据库服务器在win/postgres目录下，双击win/exe/db.bat脚本，会弹出命令行窗口，请保持不要关闭，这时数据库服务器就开启了。
  - 浏览更改数据库表和数据：postgres提供了数据库的管理UI，双击win/postgres/bin/pgAdmin3.exe就可以进入数据库的管理界面，点击文件 > 添加服务器 > 输入一个任意的名称，主机输入localhost，端口输入5432，账户输入postgres，密码输入666666 > 点击确认即可将UI连接到数据库服务器，这时就可以在UI查看、更改表和数据了(具体请点击数据库-postgres-架构-public-数据表-随便选一个表右键查看数据)
  - Session存储，需要起redis server：https://github.com/microsoftarchive/redis/releases/download/win-2.8.2401/Redis-x64-2.8.2401.msi
  
## Coding
  - 安装jdk并配置环境变量：网上直接下载jdk8, https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html，设置JAVA_HOME和PATH环境变量
  - 安装eclipse java EE: https://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/2018-12/R/eclipse-jee-2018-12-R-win32-x86_64.zip
  - 导入项目源代码: 打开eclipse > File > Import > Maven > Existing Maven Projects > 然后root directory里找到成绩分析系统代码code文件夹 > 点击Finish就可以了
  - 运行main函数: 找到源代码src/main/.../Application.java，右键菜单选择Run As > Run Configurations > Arguments > VM Arguments 里面输入 "-Dspring.profiles.active=production -Dserver.port=8080"。然后点击运行，如果运行成功，最后一行会显示Started Application in *** seconds (JVM running for ***) 
  - 浏览网站页面：打开浏览器输入http://localhost:8080, 即可看到登录页面，可以用以下测试账户登录账号test@qq.com密码123，所有账号密码可以见数据库的tbl_account表
 
## Framework & Language
  - spring boot
  - spring jdbc
  - postgresql数据库和sql语言
  - html, css,javascript网页技术可以在w3school网站上学习


# Code Directory

 - code：本项目的实际开发代码，编译之后的文件就是win目录下的target目录里的。
  - src/main/java/com/lucywu/xroster/Application.java: main函数启动文件
  - src/main/java/com/lucywu/xroster/controller/*: controller文件，一个函数对应一个URL请求的相对路径，处理相应业务逻辑并返回数据。
  - src/main/java/com/lucywu/xroster/model/*: 包含一些建数据库视图的sql文件
  - src/main/resources/templates/*: 网页内容的html
  - src/main/resources/public/css/*: 网页样式文件
  - src/main/resources/public/js/*: 网页javascript页面前端跳、转点击事件等逻辑处理文件
  - src/main/resources/public/image/*: 网页图标渲染文件
  - src/main/resources/public/lib/*: 网页第三方的javascript库
  - src/main/resources/public/asset/i18n/*: 多语言支持的关键词翻译配置
  - src/main/resources/application-production.properties: Springboot的依赖库参数配置，包括数据库连接的地址端口、账号、密码。
  - src/test/java/*: 单元测试代码
  - pom.xml: 项目依赖库管理配置，使用的maven包管理

 
# Exec Directory
 
 - win：该文件夹是可运行的成品项目
  - jdk：Java的执行环境包含了jvm虚拟机和一些底层java库, 网上直接下载jdk8, https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html。当然你也可以使用你本机安装的其他高版本的jdk。
  - postgres: Postgresql数据库的服务器（启动后本地连接地址和端口：localhost:5432，已设置好账号：postgres 密码：666666，且已经写入了相应的演示成绩数据）。通过命令行启动数据库服务器即可被程序连接使用。
  - redis：Session存储，需要起redis server：https://github.com/microsoftarchive/redis/releases/download/win-2.8.2401/Redis-x64-2.8.2401.msi
  - target: run $ mvn package编译好的成绩分析系统网站服务器，及其依赖库。这部分编译好文件，是真正开发的代码得来的。通过命令行启动服务器即可响应网页请求。
  - theworld：打包好的世界之窗浏览器，用于浏览成绩分析系统的网页，网上可以直接下载：http://www.theworld.cn/v5/。当然你也可以使用你本机系统安装的任意其他浏览器。
  - bin：里面包含了命令行脚本，用于按顺序启动或者关闭数据库->成绩分析系统网站服务器->浏览器。
  - start: 是bin文件夹里启动脚本的快捷方式
  - stop：是bin文件夹里关闭脚本的快捷方式
  - exe：等同于bin里的命令脚本。与bin里面的脚本的唯一不同是相对路径。所以运行bin里的文件必须点击start或者stop快捷方式，exe里面的脚本则可以直接点击运行。

  
# Others
 
## Background knowledge

To develop web applications, you should firstly have basic knowledge about HTML, CSS and JavaScript.

Besides, this sample project uses Spring Framework for server side, you need to check Spring Boot, Spring JDBC Template.

To access relational database, SQL is required.

## Development Environment

Set up [Project Lombok](https://projectlombok.org/) for your IDE (Eclipse) at first.

Use Eclipse and import this project as Maven project.

## Development Mode

This is the default mode, and embedded H2 database will be used.
You can customize its behaviour for your need.

But it is generally recommended that you should not use production database for development.

## Production Mode

At first, copy `src/main/resources/application-production.properties.example` to `src/main/resources/application-production.properties` and fill in your production database information.

But specifying `-Dspring.profiles.active=production` as VM options, such as what the `Procfile` does, the application will start up under production mode.

## Package & Submit

Enter code folder, run $ mvn package

Run `mvnw assembly:single` (or `mvnw.cmd` in Windows) to package the bundle, and then submit the zip file generated in `target` through STM web system.

Hint: you can use `mvnw` instead of `mvn` during your development. `mvnw` will download and install maven automatically so you don't need to do it.

## Cautions

1. The submitted content should follow [Heroku Standard](https://devcenter.heroku.com/articles/getting-started-with-java#define-a-procfile),
`Procfile` must exist to describe how to run the application. You may need to change the jar file name in `Procfile` if you change application name or version.
2. Your applications will be deployed by STM web system using **Heroku Java Buildpack**.
3. `src/assembly/bundle.xml` describe the content of the zip bundle. If you add files which are required to run your application, you need to add them in it.
4. You **must** use production database in deployed application.