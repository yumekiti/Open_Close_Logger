import time
import network
import sys
import urequests as requests
from machine import Pin

# 変更する値
ssid = 'ssid'
password = 'pass'
url = 'http://ocl.ecc-comp.com/'
potision = 'asd'
SWITCH = 17

# 定数
sw = Pin(SWITCH, Pin.IN, Pin.PULL_UP)
led = Pin('LED', Pin.OUT)
status = sw.value()
lock = 0
led.value(status)

# Wi-Fi接続
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid, password)

while wlan.isconnected() == False:
  print('Connecting to Wi-Fi router')
  time.sleep(1)

while True:
  status = sw.value()

  # 変更があった時
  if status != lock:
    led.value(status)
    payload = {"position": potision, "status": status}
    headers = {'content-type': 'application/json'}
    response = requests.post(url, json=payload, headers=headers)
    print(response.text)

  lock = status

  time.sleep(0.1)


