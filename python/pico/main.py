from time import sleep_ms
from machine import Pin

# 定数の定義
SW_PIN = 1
LED_PIN = 25
DEBOUNCE_DELAY_MS = 50

# ピンの初期化
sw = Pin(SW_PIN, Pin.IN, Pin.PULL_UP)
led = Pin(LED_PIN, Pin.OUT)

# 初期状態の取得
prev_status = sw.value()
led.value(prev_status)

while True:
  # スイッチの状態を取得
  current_status = sw.value()

  # 状態が変化した場合
  if current_status != prev_status:
    # 状態を表示
    print(current_status)
    # LEDの状態を変更
    led.value(current_status)
    # 前回の状態を更新
    prev_status = current_status

  # デバウンスのための遅延
  sleep_ms(DEBOUNCE_DELAY_MS)
