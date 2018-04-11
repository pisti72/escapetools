# Raspbian things
sudo sfdisk -l

/dev/sda

sudo dd if=/home/iszalontai/Downloads/2017-11-29-raspbian-stretch.img of=/dev/sda bs=64M status=progress


ssh pi@192.168.0.37
escaperoom



sudo shutdown -h now
sudo reboot

# Install nodejs
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions


# Monitor
https://www.waveshare.com/wiki/7inch_HDMI_LCD_(B)

sudo nano /boot/config.txt


max_usb_current=1
hdmi_group=2
hdmi_mode=87
hdmi_cvt 800 480 60 6 0 0 0
hdmi_drive=1

 -- or --

dmi_force_hotplug=1
hdmi_group=2
hdmi_mode=1
hdmi_mode=87
hdmi_cvt 1024 600 60 6 0 0 0
hdmi_drive=1


http://www.raspberry-projects.com/pi/pi-operating-systems/raspbian/gui/disable-screen-sleep
sudo nano /etc/lightdm/lightdm.conf
Add the following lines to the [SeatDefaults] section: 

# don't sleep the screen
xserver-command=X -s 0 dpms

# Kiosk
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
@/home/pi/Documents/escapetools/pipeapp/start.sh
@sleep 10
@chromium-browser --noerrdialogs --incognito --kiosk http://localhost:3000/play$

## kiosk android

https://android.stackexchange.com/questions/88031/how-to-set-kiosk-mode-in-chrome

# TODO
* nothing

# GPIO
gpio readall
-- or --
pinout


https://www.w3schools.com/nodejs/nodejs_raspberrypi_gpio_intro.asp
