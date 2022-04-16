import utime
from machine import Pin

led = Pin(25, Pin.OUT)

while True:
  led.value(1)
  print(True)
  utime.sleep(3)
  led.value(0)
  print(False)
  utime.sleep(3)
