start:
	./node_modules/.bin/browser-sync start --server --files='**,!jspm_packages/**,!node_modules/**'

dist:
	- rm -r www/
	mkdir www
	cp style.css www/style.css
	jspm bundle-sfx app/main www/app.js
	./node_modules/.bin/uglifyjs www/app.js -o www/app.min.js
	./node_modules/.bin/html-dist index.html --remove-all --minify --insert app.min.js -o www/index.html

deploy:
	scp www/* pi@bel.vcxl.nl:/home/pi/RaspberryDoorbell/www/
	
.PHONY: all dist
