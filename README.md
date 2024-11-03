## EasyDev

基于[MonkeyDev](https://github.com/AloneMonkey/MonkeyDev)开发的简化和增强版本。

支持 `Xcode 10 ~ Xcode 15`。

本版本修改点：

* 支持`CaptainHook Tweak`、`Logos Tweak`、`Debian Command-line Tool`、`Cocoa Touch Library`、`XPC Service`、`PreferenceLoader Bundle`
* 支持`iOS Command-line Tool`、`iOS App Plugin`、`Mac App Plugin`
* 去除了`MonkeyDev`自动集成class-dump、restore-symbol、Reveal、Cycript的功能
* 支持开发第三方应用插件并与第三方应用联调
* 集成一些常用的工具（可在终端中使用，不会集成到项目中）

![](ScreenShots/QQ20221213-213954@2x.png)

免责声明: 软件仅供技术交流，禁止用于商业及非法用途，如产生法律纠纷与本人无关。

## 环境配置

### 配置 theos

```
sudo git clone --recursive https://github.com/theos/theos.git /opt/theos
```

打开 `~/.bash_profile`，末尾加入

```
export THEOS=/opt/theos
export PATH=/opt/theos/bin/:$PATH
```

刷新生效

```
source ~/.bash_profile
```

遇到问题，请参考 [theos](https://github.com/theos/theos/wiki/Installation) 安装文档。

### 配置 EasyDev

```
sudo git clone --recursive https://github.com/lemon4ex/EasyDev.git /opt/EasyDev
```

### 配置 ldid

```
brew install ldid
```

`/opt/EasyDev/bin`目录内已自带，也可不安装。

### 配置免密码登录越狱设备

```
ssh-keygen -t rsa -P ''
ssh-copy-id -i /Users/username/.ssh/id_rsa root@ip
```

如果没有越狱设备，可跳过。

### 安装

你可以通过以下命令选择指定的Xcode进行安装:

```
sudo xcode-select -s /Applications/Xcode.app
```

查看安装的Xcode路径为:

```
xcode-select -p
```

执行安装命令:

```
cd /opt/EasyDev/bin
chmod +x ed-install
./ed-install
```

### 卸载
```
cd /opt/EasyDev/bin
chmod +x ed-uninstall
./ed-uninstall
```

为确保生效，安装或更新之后重启下Xcode再新建项目。

## 感谢
* [MonkeyDev](https://github.com/AloneMonkey/MonkeyDev)
* [iOSOpenDev-Xcode-Templates](https://github.com/kokoabim/iOSOpenDev-Xcode-Templates)
