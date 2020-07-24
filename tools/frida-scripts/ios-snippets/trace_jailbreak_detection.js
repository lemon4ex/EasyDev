// / <reference path="typings/node/node.d.ts"/> // 引入自动提示
// frida -U -f "com.ss.iphone.ugc.Aweme" -l trace_jailbreak.js –no-pause 

function logtrace(ctx) {
    var content = Thread.backtrace(ctx.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n') + '\n';
    if (content.indexOf('SubstrateLoader') == -1 && content.indexOf('JavaScriptCore') == -1 &&
        content.indexOf('FLEXing.dylib') == -1 && content.indexOf('NSResolveSymlinksInPathUsingCache') == -1 &&
        content.indexOf('MediaServices') == -1 && content.indexOf('bundleWithPath') == -1 &&
        content.indexOf('CoreMotion') == -1 && content.indexOf('infoDictionary') == -1 &&
        content.indexOf('objectForInfoDictionaryKey') == -1)  {
            console.log(content);
            // 写入日志文件
            // var file = new File("/var/root/trace_log.txt","a+");//a+表示追加内容，和c语言的fopen函数模式类似
            // file.write(content);
            // file.flush();
            // file.close();
        return true;
    }
    return false;
}

function iswhite(path) {
    if (path == null) return true;
    if (path.startsWith('/var/mobile/Containers')) return true;
    if (path.startsWith('/var/containers')) return true;
    if (path.startsWith('/var/mobile/Library')) return true;
    if (path.startsWith('/var/db')) return true;
    if (path.startsWith('/private/var/mobile')) return true;
    if (path.startsWith('/private/var/containers')) return true;
    if (path.startsWith('/private/var/mobile/Library')) return true;
    if (path.startsWith('/private/var/db')) return true;
    if (path.startsWith('/System')) return true;
    if (path.startsWith('/Library/Preferences')) return true;
    if (path.startsWith('/Library/Managed')) return true;
    if (path.startsWith('/usr')) return true;
    if (path.startsWith('/dev')) return true;
    if (path == '/AppleInternal') return true;
    if (path == '/etc/hosts') return true;
    if (path == '/Library') return true;
    if (path == '/var') return true;
    if (path == '/private/var') return true;
    if (path == '/private') return true;
    if (path == '/') return true;
    if (path == '/var/mobile') return true;
    if (path.indexOf('/containers/Bundle/Application') != -1) return true;
    return false;
}

Interceptor.attach(Module.findExportByName(null, "access"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        console.log("access " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "creat"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("creat " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "dlopen"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (!iswhite(path)) console.log("dlopen " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "dlopen_preflight"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (!iswhite(path)) console.log("dlopen_preflight " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "faccessat"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[1].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("faccessat " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "getxattr"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("getxattr " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "link"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("link " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "listxattr"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("listxattr " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "lstat"), {
    block: false,
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("lstat " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "open"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = Memory.readUtf8String(args[0]);
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("open " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "opendir"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("opendir " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "__opendir2"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("opendir2 " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "readlink"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("readlink " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "realpath"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("realpath " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "realpath$DARWIN_EXTSN"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("realpath$DARWIN_EXTSN " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "stat"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("stat " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "statfs"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("statfs " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "symlink"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var path = args[0].readUtf8String();
        if (iswhite(path)) return;
        if (logtrace(this)) console.log("symlink " + path);
    }
})

Interceptor.attach(Module.findExportByName(null, "syscall"), {
    onEnter: function(args) {
        if (args[0].isNull()) return;
        var callnum = args[0].toInt32();
        if (callnum == 180) return;
        console.log("syscall " + args[0].toInt32());
    }
})
