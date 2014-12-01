#! /bin/sh
# /etc/init.d/bell

### BEGIN INIT INFO
# Provides:          bel
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Example initscript
# Description:       initscript to start listening to netcat
### END INIT INFO

case "$1" in
    start)
        #echo "Starting"
        sleep 10
        sudo sh /home/pi/TCP-Button/initports.sh
        sudo node /home/pi/TCP-Button/nodeServer.js
        ;;
   stop)
        #echo "Stopping"
        #killall initports.sh
        killall /home/pi/TCP-Button/nodeServer.js
        ;;
    *)
        echo "Usage: /etc/init.d/bel start|stop"
        exit 1
        ;;
esac

exit 0
