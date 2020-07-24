#!python
#-*-coding:utf-8-*-
import codecs
import sys
import frida
from pprint import pprint

APP = 'com.ss.iphone.ugc.Aweme'
device = frida.get_usb_device()
pid = device.spawn([APP])
session = device.attach(pid)
with codecs.open('./trace_jailbreak.js', 'r', 'utf-8') as f:
    source = f.read()
script = session.create_script(source)
print("[*] Intercepting [{}]".format(pid))
script.load()
device.resume(pid)
sys.stdin.read()