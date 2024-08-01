## github仓库地址

https://github.com/SuohTheBest/kanban

## 关于运行

使用pm2分别运行前端和后端，在正式运行之前需要全局安装pm2和serve。

```shell
npm install pm2 -g
npm install serve -g
```

- 运行前端
```shell
cd frontend
pm2 start ./ecosystem.config.js
```

- 运行后端
```shell
cd backend
pm2 start ./bootstrap.js --name backend
```

前端默认运行在5000端口，后端默认运行在7001端口。前端与后端连接的配置在源代码frontend/.env中，如果需要修改后端端口请同步修改此文件并重新编译前端。

## 关于功能与技术栈

支持忘记密码后重置密码，同时支持对任务的修改(其实没什么新功能)

技术栈使用了sqlite数据库，并使用typeorm进行操纵，用于存储各种类型的数据并查询。使用了bcrypt用于密码加密，使用jwt用于在中间件中鉴别用户身份，提供对部分api的保护。

暑假选了这门课，也算是从0速通了一下前端和后端，大部分人觉得麻烦或者教的太少就退了，我之前想做一个人网站，这次正好有这个项目可以练习一下，所以坚持了一下，不过确实花了我不少时间。。。
