import serial
import requests

COM="COM3"
bitRate=9600

ser = serial.Serial(COM, bitRate, timeout=3)

url = "http://localhost:8080"

headers = {
  'Accept': '',
  'Content-Type': 'application/x-www-form-urlencoded'
}

# 状態
status = False
# ループ対策
lock = False

try:
  while True:

    # 状態の取得
    status = ser.readline().decode('UTF-8')

    if status != lock:
      payload='status=' + status
      response = requests.request("POST", url, headers=headers, data=payload)
      print(response.text)

    lock = status
    print(status)

except:
  print('program end')
  ser.close()
