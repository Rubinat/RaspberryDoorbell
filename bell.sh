export PATH=$PATH:/usr/local/bin

case "$1" in
  start)
    date >> /tmp/initports.log
    /home/pi/RaspberryDoorbell/initports.sh >> /tmp/initports.log
    forever -o /tmp/bell.log -e /tmp/bell-error.log --sourceDir=/home/pi/RaspberryDoorbell nodeServer.js
    ;;
  stop)
    exec forever stopall
    ;;
  *)

  echo "Usage: /etc/init.d/nodeup {start|stop}"
  exit 1
  ;;
esac
exit 0
