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
        date >> /tmp/bell.log
        sudo sh ~/RaspberryDoorbell/initports.sh >> /tmp/bell.log
        sudo node ~/RaspberryDoorbell/nodeServer.js >> /tmp/bell.log
        ;;
   stop)
        #echo "Stopping"
        #killall initports.sh
        sudo killall -9 node
        ;;
    *)
        echo "Usage: /etc/init.d/bell start|stop"
        exit 1
        ;;
esac

exit 0
