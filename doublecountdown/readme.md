#Raspbian things
sudo sfdisk -l

/dev/sda

sudo dd if=/home/iszalontai/Downloads/2017-11-29-raspbian-stretch.img of=/dev/sda bs=64M status=progress


ssh pi@192.168.0.37
escaperoom

#Monitor
https://www.waveshare.com/wiki/7inch_HDMI_LCD_(B)

sudo nano /boot/config.txt


max_usb_current=1
hdmi_group=2
hdmi_mode=87
hdmi_cvt 800 480 60 6 0 0 0
hdmi_drive=1

