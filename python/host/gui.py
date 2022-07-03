import sys
import serial
from serial.tools import list_ports
import requests
from threading import Thread
from time import sleep

# シリアルポート取得
ports = list_ports.comports()

# COM 初期化
COM = ""

def main():
  # グローバル変数 取得
  global COM

  # シリアル通信
  bitRate = 9600
  try:
    ser = serial.Serial(COM, bitRate, timeout=3)
  except serial.serialutil.SerialException:
    print("アクセスが拒否されました")

  # 初期化
  status = 0
  lock = 0
  global running
  headers = {"Accept": "", "Content-Type": "application/x-www-form-urlencoded"}

  try:
    while True and running:
      # 状態の取得
      status = ser.read_all().decode("UTF-8").rstrip("\n").rstrip("\r")

      if status:

        # 変更があれば
        if status != lock:

          # POST リクエスト
          payload = "status=" + status
          response = requests.request(
            "POST", url.get(), headers=headers, data=payload
          )
          print(response.text)

        lock = status

      sleep(0.1)

  except requests.exceptions.ConnectionError:
    print("Webサーバーと接続できませんでした")
  except Exception as err:
    print(err)

  finally:
    ser.close()


# --- GUI ---


# python 2
# from Tkinter import *
# from Tkinter import ttk
# python 3
from tkinter import *
from tkinter import ttk

thread = Thread(target=main)
running = True

def start():
  # disable
  startBtn["state"] = "disable"
  combo["state"] = "disable"
  url["state"] = "disable"

  # start main
  global thread
  thread.start()

# set COM
def onSelectedCOM(event):
  global COM
  global ports
  COM = str(ports[event.widget.current()][0])

# Initialization
root = Tk()
root.title("open_close_logger")

# Frame
frame = ttk.Frame(root, padding=20)
frame.grid(column=0, row=0)

# Label
label = ttk.Label(frame, text="Select COM")
label.grid(column=0, row=0)

# Combobox
combo = ttk.Combobox(frame, values=ports, state="readonly", width=50)
if ports:
  combo.set(ports[0])
  COM = str(ports[0][0])
combo.bind("<<ComboboxSelected>>", onSelectedCOM)
combo.grid(column=1, row=0, sticky=E)

# Label
label = ttk.Label(frame, text="Set URL")
label.grid(column=0, row=2)

# Entry
url = ttk.Entry(frame, width=50)
url.grid(column=1, row=2, sticky=E)

# Stop Button
stopBtn = ttk.Button(frame, text="Stop", command=root.destroy)
stopBtn.grid(column=0, row=3, sticky=W, pady=(20, 0))

# Start Button
startBtn = ttk.Button(frame, text="Start", command=start)
startBtn.grid(column=1, row=3, sticky=E, pady=(20, 0))

# loop
root.mainloop()

# stop main thread
running = False
if thread.is_alive():
  thread.join()
