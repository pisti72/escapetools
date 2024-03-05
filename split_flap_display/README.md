# SPLIT FLAP DISPLAY

## INSTALLÁLÁS LÉPÉSEI

1. Tedd fel az RaspiOS-t a raspberryre az Imagerrel innen: [https://www.raspberrypi.com/software/] vagy BalenaEtcherrel is kiirhatod microSD-re az iso fájlt.

2. Futtasd le terminálban az alábbi parancsokat. A terminált az CTRL+ALT+T -vel tudod előhívni.
```
sudo apt update
sudo apt upgrade
```

3. Telepítsd a Love2D frameworkot az alábbi paranccsal:
```
sudo apt install love
```

4. Telepítsd hozzá a csomagkezelőjét: 
```
sudo apt install luarocks
```

5. A csomagkezelővel telepítsd fel a luához a GPIO modult: 
```
sudo luarocks install lua-periphery
```

6. Másold a [split_flap_display/] könyvtárat az összes tartalmával együtt a [Documents] mappába.

7. A rapspi-configgal állítsd a hang kimenetet HDMI-ről Jackre. 
    Ezt csinálhatod GUI-ról is [https://projects.raspberrypi.org/en/projects/raspberry-pi-using/4]

    vagy parancssorból ezzel:
```
sudo raspi-config
```

8. A kimenő hangerőt állítsd maximumra ezzel:
```
sudo alsa-mixer
```

9. Letesztelheted az alkalmazást az alábbi parancsokkal, még mielőtt beállítjuk az automatikus indulást.
```
cd Documents
love split_flap_display/
```

10. Használata:
     - space: olyan mintha a GPIO 4-es porton jelet kapna
     - wasd: vízszintes és függőleges pozíció beállítása
     - e,q:  nagyítás, kicsinyítés
     - esc:  kilépés és a beállítások mentése

11. Most beállítjuk az autostartot. Hozd létre az 
    alábbi könyvtár struktúrát a home/pi könyvtárból.
    [https://learn.sparkfun.com/tutorials/how-to-run-a-raspberry-pi-program-on-startup#method-2-autostart]
    Lépjél oda először, majd hozd létre:
```
cd ~
cd .config/
mkdir lxsession/
cd lxsession/
mkdir LXDE-pi/
cd LXDE-pi/
```

12. Most elvileg benne vagy a LXDE-pi könyvtárban. Ezt ellenőrízheted
    a `pwd` paranccsal. Hozd létre az `autostart` fájlt így:
```
nano autostart
```

13. Bent vagy a nano szövegszerkesztőben. Használhatod még a vim-et is, de az
    macerásabb. Az alábbiakat kell beleírnod:
```
love /home/pi/Documents/escapetools/split_flap_display/
```

14. Mentés a CTRL+O -val. Az autostart név marad. ENTER. Majd CTRL+X -el kilépés.

