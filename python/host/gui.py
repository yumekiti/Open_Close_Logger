# -*- coding: utf8 -*-
import sys

# python 2
# from Tkinter import *
# from Tkinter import ttk
# python 3
from tkinter import *
from tkinter import ttk

# Initialization
root = Tk()
root.title(u"Software Title")

# set COM
def onSelectedCOM(event):
  print(event.widget.get())

# Frame
frame = ttk.Frame(root, padding=20)
frame.grid(column=0, row=0)

# Label
label = ttk.Label(frame, text="Select COM")
label.grid(column=0, row=0)

# Combobox
fruits = ['Apple', 'Banana', 'Grape']
combo = ttk.Combobox(frame, values=fruits, state='readonly')
combo.set(fruits[0])
combo.bind("<<ComboboxSelected>>", onSelectedCOM)
combo.grid(column=0, row=1, columnspan=2)

# Label
label = ttk.Label(frame, text="Set URL")
label.grid(column=0, row=2)

# Entry
text = ttk.Entry(frame, width=20)
text.grid(column=0, row=3, columnspan=2)

# Stop Button
stopBtn = ttk.Button(frame, text="Stop", command=root.destroy)
stopBtn.grid(column=0, row=4)

# Start Button
startBtn = ttk.Button(frame, text="Start", command=root.destroy)
startBtn.grid(column=1, row=4)

# loop
root.mainloop()
