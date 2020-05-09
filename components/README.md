# 通用组件开发说明
1. 组件级别
	项目全局组件，只有全局通用组件可放入此目录中
2. 组件命名
	全局组件以wl开头 -分割
3. 组件引入
	在其他页面中用 <cts-rabbar-row></cts-rabbar-row> 形式书写
4. 全局组件
	一些header、loading等高频组件可定义为全局组件 在main.js中引入
5. 组件说明
┌─ mz-network-error 网络错误组件
│  └─ mz-network-error.vue  
├─ cts-botton-primary.vue   万历主按钮
├─ 
└─ README.md