# Digitaltimer

https://digitaltimer.000webhostapp.com/
https://www.000webhost.com/members/website/digitaltimer/files
Kf2

# Localtest

http://localhost/escapetools/digitaltimer/control.php?id=ALIZ4TSH9CK31LDF56



## FTP

files.000webhost.com
21
Kf2

## Concept

http://moneysaw.eu/timer/timer.php?id=1234512345

your timer is:
https://xtimer.eu/timer.php?id={timer_token}

open current timer dashboard:
http://xtimer.eu/dashboard.php?id={timer_token}

Operations:
* Start 1 hour
* Add 5 minutes
* others will come ...

## Kiosk setup on OrangePi Armbian

On OrangePi:
cd .config/lxsession/LXDE
On RaspberryPi:
cd .config/lxsession/LXDE-pi

nano autostart

chromium --noerrdialogs --incognito --kiosk https://xtimer.eu/timer.php?id={timer_token}

Setup autostart

sudo nano /etc/lightdm/lightdm.conf

autologin-user={user}

## Kiosk setup on Raspbian
https://pi-store.com/pages/raspbian-jessie-kiosk-mode

nano /home/pi/.config/lxsession/LXDE-pi/autostart

@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash
@point-rpi
@xset s off
@xset s noblank
@xset -dpms
@unclutter -idle 0 #Hide mouse cursor
@chromium-browser --noerrdialogs --incognito --kiosk https://xtimer.eu/timer.php?id={ti$

## API

?getcommand={timer_token}
return


