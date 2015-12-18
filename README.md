RaspberryDoorbell
=================

The server side of the wireless doorbell project (raspberry running a tcp node server)

See also http://github.com/Rubinat/doorbell for documentation.

### Login through SSH
```
ssh pi@bel.vcxl.nl
```

### API
GET: http://bel.vcxl.nl:8081/api/v1/status

POST: http://bel.vcxl.nl:8081/api/v1/ring/F1.19

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
dns-nameservers 8.8.8.8 8.8.4.4
.......
sudo reboot
```

### Install gpio-admin
At the time of writing there is an open pull request for gpio-admin by VipSaran which solves a filepath issue to the gpio folders. I added VipSaran's fork as a submodule to our repository. So clone our repository recursively or use `git submodule update --init`. Make sure to `make` and `sudo make install` the gpio-project. Then run our `initports.sh` script to initialize the gpio pins.

### Autostart the bell script
Make a symbolic link to bell.sh
```bash
sudo ln -s ~/RaspberryDoorbell/bell.sh /etc/init.d/bell
```
Then run `sudo update-rc.d bell defaults` (as described [here](http://raspberrywebserver.com/serveradmin/run-a-script-on-start-up.html))

### VechtclubXL layout
the layout is now part of the source code in `nodeServer.js`
<del>
| Unit  |row-col| Unit |row-col| Unit  |row-col|Unit   |row-col|
|-------|-------|------|-------|-------|-------|-------|-------|
| VCXL  | 0-0   | D1.2 | 1-0   | E1.5  | 2-0   |F1.18  | 3-0   |
| C1.2  | 0-1   | D1.3 | 1-1   | E2.1  | 2-1   |F1.19  | 3-1   |
| C1.3  | 0-2   | D1.4 | 1-2   | E2.2  | 2-2   |G1.11  | 3-2   |
| C1.4  | 0-3   | D2.1 | 1-3   | E2.3  | 2-3   |G1.11a | 3-3   |
| C1.5  | 0-4   | D2.2 | 1-4   | E2.4  | 2-4   |G1.14  | 3-4   |
| C1.6  | 0-5   | D2.3 | 1-5   | E2.5  | 2-5   |G1.15  | 3-5   |
| C2.1  | 0-6   | D2.4 | 1-6   | F1.4  | 2-6   |G1.16  | 3-6   |
| C2.2  | 0-7   | E1.1 | 1-7   | F1.5  | 2-7   |G1.18  | 3-7   |
| C2.3  | 0-8   | E1.2 | 1-8   | F1.10 | 2-8   |G2.4   | 3-8   |
| C2.4  | 0-9   | E1.3 | 1-9   | F1.11 | 2-9   |G2.5   | 3-9   |
| C2.5  | 0-10  | E1.4 | 1-10  | F1.17 | 2-10  |       |       |
</del>
