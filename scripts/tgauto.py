#通过api自动发送指定文本,自定义语句


from telethon import TelegramClient
import os
import re
import time
import datetime
import random
import sys
#pip install PySocks   安装socks5
import socket
import socks
socks.set_default_proxy(socks.SOCKS5, "192.168.2.16", 3220)
socket.socket = socks.socksocket
#填自己的
api_id = 4681177
api_hash = '799ebf6c9db54ea83b007889c0a4c094'
client = TelegramClient('anon', api_id, api_hash)

#日志路径,按照以下示例
try:
    logdir = '/123/v4bot/log/submit_codes/'
    flist = os.listdir(logdir)
    log = logdir + flist[0]
except:
    log = ""
if not log:
    print("找不到日志文件!")
    sys.exit(1)

Tdays = [1,8,16,24]
today = datetime.date.today().day

#socket5proxy
import socket
import socks
socks.set_default_proxy(socks.SOCKS5, "192.168.2.16", 3220)
socket.socket = socks.socksocket

async def main():
    with open(log,'r') as f:
        res = f.read()
    #@L
    Llists = re.findall(r'/jd[a-z]+\s.*?[a-zA-Z0-9-_&=]+',res)
    #@T
    Tlists =  re.findall(r'/submit_activity_codes\s.*?[a-z]+.*?[a-zA-Z0-9-_&=]+',res)
    #for diy,自定义发送语句,语句格式如下
    #Dlists = ['xxxx','xxxxxx']
    Dlists = []
    
    #touser自定义
    if today in Tdays:
        for msg in Tlists:
            await client.send_message('@TuringLabbot', msg)
            #time.sleep(1)  
    for msg in Llists:
        await client.send_message('@LvanLamCommitCodeBot', msg)
        #time.sleep(1)
    if Dlists:
        for msg in Dlists:      
            await client.send_message('@LvanLamCommitCodeBot', msg)
        #time.sleep(1)

with client:
    client.loop.run_until_complete(main())
