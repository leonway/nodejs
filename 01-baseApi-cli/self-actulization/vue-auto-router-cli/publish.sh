#!/user/bin/env bash
npm config get registry #检查仓库镜像库 
npm config set registry=http://registry.npmjs.org
echo '请进行登录相关'
npm login # 登录
echo "------publishing-------"
npm publish # 发布到
npm config set registry=https://registry.npm.taobao.org
echo "发布完成"
exit
