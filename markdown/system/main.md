## [main.pyをpicoに書き込んでみよう](./../front-end.md)
実行してうまく動作していたら書き込んでみよう。

/python/main.py
```python
import utime
from machine import Pin

# 宣言
sw = Pin(15, Pin.IN, Pin.PULL_UP)

# 変数の初期化
status = sw.value()
lock = 0

while True:

  # 読み込み
  status = sw.value()

  # 変更があった時
  if status != lock:
    # 状態を表示
    print(status)

  lock = status

  utime.sleep(0.50)
```