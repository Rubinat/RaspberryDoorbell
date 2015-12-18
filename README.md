RaspberryDoorbell
=================

The server side of the wireless doorbell project (raspberry running a tcp node server)

See also http://github.com/Rubinat/doorbell for documentation.

### App
There's a status app at http://bel.vcxl.nl:8081. 
There's an API at: http://bel.vcxl.nl:8081/api/v1/status

You can run the app on your computer by cloning this repository.
Make sure you have installed `nodejs` and `npm` and run `npm install`

Launch the app by running `make` on your computer.

The app uses the 'React' framework. `app/main.js` is the main source file.

Use `make dist` to create a minified version of the app. Then use `make deploy` to upload it using SCP to the server (RaspberryPi).

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

