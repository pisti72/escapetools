
import vlc,sys,time,os,mouse,glob,shutil
from pynput import keyboard
from gpiozero import Button

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
VIDEO_DIR = '/home/pi/Videos/'
video_path_copying = os.path.join(ROOT_DIR, 'copying.mkv')
video_path0 = os.path.join(VIDEO_DIR, '0.mp4')
video_path1 = os.path.join(VIDEO_DIR, '1.mp4')
video_path2 = os.path.join(VIDEO_DIR, '2.mp4') 
video_path3 = os.path.join(VIDEO_DIR, '3.mp4') 
video = vlc.MediaPlayer()
video.toggle_fullscreen()

media_copying = vlc.Media(video_path_copying)
media0 = vlc.Media(video_path0)
media1 = vlc.Media(video_path1)
media2 = vlc.Media(video_path2)
media3 = vlc.Media(video_path3)
video.set_media(media0)

ready_to_copy = True
running = True
counter = 0	

button1 = Button(4)
button2 = Button(17)
button3 = Button(27)

def button1_pressed():
  print("Button1 pressed")
  video.set_media(media1)
  video.play()
def button1_released():
  print("Button1 released")
def button2_pressed():
  print("Button2 pressed")
  video.set_media(media2)
  video.play()
  print("Button2 pressed")
def button2_released():
  print("Button2 released")
def button3_pressed():
  video.set_media(media3)
  video.play()
  print("Button3 pressed")
def button3_released():
  print("Button3 released")
  
button1.when_pressed = button1_released
button1.when_released = button1_pressed
button2.when_pressed = button2_released
button2.when_released = button2_pressed
button3.when_pressed = button3_released
button3.when_released = button3_pressed

def on_release(key):
  global running
  print('{0} released'.format(key))
  if key == keyboard.Key.esc:
       print("Stopping")
       running = False
       return False

listener = keyboard.Listener(
    on_release=on_release)
listener.start()

video.set_position(0.8)
video.play()

while running:
  folder_found = False
  for file_folder in os.listdir('/media/pi/'):
    path1 =  os.path.join('/media/pi/', file_folder)
    if os.path.isdir(path1):
      folder_found = True
      if ready_to_copy:
        video.stop()
        video.set_media(media_copying)
        video.play()
        ready_to_copy = False
        shutil.copyfile(os.path.join(path1,'0.mp4'), os.path.join('/home/pi/Videos/','0.mp4'))
        shutil.copyfile(os.path.join(path1,'1.mp4'), os.path.join('/home/pi/Videos/','1.mp4'))
        shutil.copyfile(os.path.join(path1,'2.mp4'), os.path.join('/home/pi/Videos/','2.mp4'))        
        shutil.copyfile(os.path.join(path1,'3.mp4'), os.path.join('/home/pi/Videos/','3.mp4'))
        print('File copied')
        break
  if not folder_found:
    ready_to_copy = True
  if not video.is_playing():
    video.set_media(media0)
    video.play()
  time.sleep(.5)
