### 环境要求
使用工具前确保如下几点:

* 安装EasyDev
将EasyDev下载后，放到/opt/EasyDev，如果没有/opt目录，自建

* 安装最新的 [theos](https://github.com/theos/theos/wiki/Installation)
```
sudo git clone --recursive https://github.com/theos/theos.git /opt/theos
```
配置环境变量，打开~/.bash_profile，末尾加入

```
export THEOS=/opt/theos
export PATH=/opt/theos/bin/:$PATH
```
刷新生效
```
source ~/.bash_profile
```

* 安装ldid(bin目录内已自带，可不安装)
```
brew install ldid
```

* 配置免密码登录越狱设备(如果没有越狱设备，跳过)
```
ssh-keygen -t rsa -P ''
ssh-copy-id -i /Users/username/.ssh/id_rsa root@ip
```

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
chmod +x md-install
./md-install
```

### 卸载
```
cd /opt/EasyDev/bin
chmod +x md-install
./md-uninstall
```

### 更新(暂无)
如果没有发布特殊说明，使用如下命令更新即可:
```
cd /opt/EasyDev/bin
chmod +x md-install
./md-update
```

安装/更新之后重启下Xcode再新建项目。
