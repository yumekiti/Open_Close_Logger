### [戻る](./../system.md)

# main.pyをpicoに書き込んでみよう

書き込むことによって次からは接続するだけで実行されるようになります

<br>

# 課題

- 実行してうまく動作していたら書き込んでみよう。

<br><br>

[/python/main.py](./../../python/pico/main.py)

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

<br><br>

## 参考リンク

- https://blog.tkrel.com/14899