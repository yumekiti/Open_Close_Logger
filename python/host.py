import serial
import requests

# 変更
COM="COM3"
bitRate=9600

# シリアル通信
ser = serial.Serial(COM, bitRate, timeout=3)

# 宣言
url = "http://localhost:8080"
headers = {
  'Accept': '',
  'Content-Type': 'application/x-www-form-urlencoded'
}

# 初期化
status = False
lock = False

try:
  while True:

    # 状態の取得
    status = ser.readline().decode('UTF-8')

    # 変更があれば
    if status != lock:
      payload='status=' + status
      # POST リクエスト
      response = requests.request("POST", url, headers=headers, data=payload)
      print(response.text)

    lock = status
    print(status)

except:
  print('program end')
  ser.close()
