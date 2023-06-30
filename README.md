> <div style="text-align: center">
>     <h1>
>        electron-nationalized-build
>     </h1>
> </div>



## © ENB 🎉🎉🎉

<div style="display:flex;align-items:center;justify-content:center;background-color:skyblue">     
        <p style="height:90px;line-height:90px;font-size:40px;color:white;
                  background-color:skyblue;margin-right:30px;">
         Electron-Nationalized-Build
    	</p>

</div>




## Install 🎉🎉🎉

- Note before installation
- 

1. 请确保 **node 版本在 16** 或以上 and **
2. 使用**yarn** 或者 **pnpm** 作为构建工具




#### 开始构建

``` bash
npm config edit
# 该命令会打开npm的配置文件，请在空白处添加，此操作是配置淘宝镜像。
# electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
# electron_custom_dir={{ version }}
# electron_mirror=https://cdn.npmmirror.com/binaries/electron/v
# registry=https://registry.npmmirror.com/
# 然后关闭该窗口，重启命令行.
# 使用yarn安装
yarn or yarn install

# 启动之后，会在9080端口监听
yarn dev

# build命令在不同系统环境中，需要的的不一样，需要自己根据自身环境进行配置
yarn build

```
---
# Built-in



# Support
感谢！
This project base on [electron-vue](https://github.com/SimulatedGREG/electron-vue)

<p style="text-align: left">
  <a href="https://github.com/umbrella22/electron-vue-template">
    <img src="https://github.com/umbrella22/electron-vue-template/actions/workflows/build-test.yml/badge.svg" alt="">
 </a>
</p>

