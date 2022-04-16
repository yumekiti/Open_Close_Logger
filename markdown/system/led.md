## [LEDを光らしてみよう](./../front-end.md)

/python/led.py
```python
from machine import Pin
import time

pin = Pin(25, Pin.OUT)

while True:
    pin.toggle()
    time.sleep_ms(1000)
```

### 参考リンク
- https://www.marutsu.co.jp/pc/static/large_order/zep/m-z-picoled-da1
