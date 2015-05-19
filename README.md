RaspberryDoorbell
=================

The server side of the wireless doorbell project (raspberry running a tcp node server)

See also http://github.com/Rubinat/doorbell for documentation.

### Set fixed IP for RaspberryPI at VCXL
(values retrieved by following [these steps](http://www.modmypi.com/blog/tutorial-how-to-give-your-raspberry-pi-a-static-ip-address))
```
sudo nano /etc/network/interfaces
......
iface eth0 inet static
address 217.149.135.9
netmask 255.255.255.192
network 217.149.135.0
gateway 217.149.135.62
broadcast 217.149.135.63
.......
sudo reboot
```

### Setup DNS
You also need to set a DNS server if you want to be able to access online repositories.
```
sudo nano /etc/resolv.conf
....
nameserver 8.8.8.8
name server 8.8.4.4
```

### Install gpio-admin
At the time of writing there is an open pull request for gpio-admin by VipSaran which solves a filepath issue to the gpio folders. I added VipSaran's fork as a submodule to our repository. So clone our repository recursively or use `git submodule update --init`. Make sure to `make` and `sudo make install` the gpio-project. Then run `initports.sh` to initialize the gpio pins.

### Autostart the bell script
Move the ```bell.sh``` from the repo to ```/etc/init.d/bell```. Then run ```sudo update-rc.d bell defaults``` (as described [here](http://raspberrywebserver.com/serveradmin/run-a-script-on-start-up.html))
