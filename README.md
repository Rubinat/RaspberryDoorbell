RaspberryDoorbell
=================

The server side of the wireless doorbell project (raspberry running a tcp node server)

See also http://github.com/Rubinat/doorbell for documentation.

### Set fixed IP for RaspberryPI at VCXL
(values retrieved by following the steps on http://www.modmypi.com/blog/tutorial-how-to-give-your-raspberry-pi-a-static-ip-address)
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

### Autostart the bell script
Move the ```bell.sh``` from the repo to ```/etc/init.d/bell```. Then run ```sudo update-rc.d bell defaults```
