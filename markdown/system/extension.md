### [戻る](./../system.md)

# 余裕があれば

/python/main.py
```python
import utime
from machine import Pin

# 宣言
sw = Pin(15, Pin.IN, Pin.PULL_UP)
led = Pin(25, Pin.OUT)

# 変数の初期化
status = sw.value()
lock = 0
led.value(status)

while True:

  # 読み込み
  status = sw.value()

  # 変更があった時
  if status != lock:
    # 状態を表示
    print(status)
    # 状態 True なら光らせる
    led.value(status)

  lock = status

  utime.sleep(0.50)
```

<br><br>

# 課題

- 状態によってLEDを光らせてみよう。

<br><br>

## 参考リンク

- [./led.md](./led.md)