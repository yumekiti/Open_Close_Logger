import sys
import urequests

url = "http://localhost:8080"

payload='status=' + sys.argv[1]
headers = {
  'Accept': '',
  'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

# ドアセンサーのon off設定
door_sw = False
# postループ対策
sw_lock = False

while True:

    # センサーの読み込み
    door_sw = GPIO.input(pin)

    if door_sw != sw_lock:

        payload = json.dumps({
            "token": token,
            "state": door_sw
        })

        # サーバーへPOST
        requests.request("POST", url, headers=headers, data=payload)

    sw_lock = door_sw

    time.sleep(0.50)