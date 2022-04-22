from serial.tools import list_ports

def usb():

  ports = list_ports.comports()

  for info in ports:
    if('USB' in info[1]):
      return info[0]
  return None
