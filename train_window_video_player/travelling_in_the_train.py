#!/usr/bin/env python
#pip install python-vlc
#pip install mouse
import vlc,sys,time,os,mouse

#pip install pynput
from pynput import keyboard
from gpiozero import Button

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
video_path = os.path.join(ROOT_DIR, 'vonat_jobb.mp4') 
video = vlc.MediaPlayer(video_path)

video.toggle_fullscreen()

button = Button(4)
mouse.move(6000,6000)

def button_pressed():
  print("Button pressed")
  video.stop()
def button_released():
  video.play()
  print("Button released")

running = True

def on_release(key):
  global running
  print('{0} released'.format(
        key))
  if key == keyboard.Key.esc:
       print("Stopping")
       running = False
       return False

button.when_pressed = button_pressed
button.when_released = button_released
       
listener = keyboard.Listener(
    on_release=on_release)
listener.start()

while running:
  time.sleep(1)

video.stop()

