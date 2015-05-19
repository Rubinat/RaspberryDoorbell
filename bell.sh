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
        LOGFILE=/tmp/bell.log
        #echo "Starting"
        sleep 10
        date >> $LOGFILE
        ~/RaspberryDoorbell/initports.sh >> $LOGFILE 2>&1
        node ~/RaspberryDoorbell/nodeServer.js >> $LOGFILE 2>&1
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
