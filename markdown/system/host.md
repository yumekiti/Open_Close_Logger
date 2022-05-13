## [host.pyを実行してみよう](./../front-end.md)
変更部分を変えてから実行しよう

/python/host.py
```python
import serial
from serial.tools import list_ports
import requests

COM = ''

while len(COM) <= 0 :
  # シリアルポート取得
  ports = list_ports.comports()

  # 選択
  for index, info in enumerate(ports):
    if('USB' in info[1]):
      print(str((1 + index)) + ' : ' + str(info))

  try:
    num = input("シリアルポートを選択してください : ")
    num = int(num) - 1

    COM = ports[num][0]
  except:
    COM = ''

  if COM :
    break

# シリアル通信
bitRate=9600
try:
  ser = serial.Serial(COM, bitRate, timeout=3)
  url = input("WebサーバーのURLを入力してください : ")
  print('Ready')
except serial.serialutil.SerialException:
  print('アクセスが拒否されました')

headers = {
  'Accept': '',
  'Content-Type': 'application/x-www-form-urlencoded'
}

# 初期化
status = 0
lock = 0

try:
  while True:

    # 状態の取得
    status = ser.read_all().decode('UTF-8').rstrip('\n').rstrip('\r')

    if(status):

      # 変更があれば
      if status != lock:
        payload='status=' + status
        # POST リクエスト
        response = requests.request("POST", url, headers=headers, data=payload)
        print(response.text)

      lock = status

except requests.exceptions.ConnectionError :
  print("Webサーバーと接続できませんでした")
except Exception as err:
  print(err)

finally:
  ser.close()
```

### 参考リンク
- https://engineer-lifestyle-blog.com/code/python/pyserial-communication-usage/