#rows input
gpio-admin unexport 25
gpio-admin unexport 11
gpio-admin unexport 8
gpio-admin unexport 7

gpio-admin export 25 pullup
gpio-admin export 11 pullup
gpio-admin export 8 pullup
gpio-admin export 7 pullup

#cols output
gpio-admin unexport 4 
gpio-admin unexport 14
gpio-admin unexport 15
gpio-admin unexport 17
gpio-admin unexport 18
gpio-admin unexport 21
gpio-admin unexport 22
gpio-admin unexport 23
gpio-admin unexport 24
gpio-admin unexport 10
gpio-admin unexport 9 

gpio-admin export 4 
gpio-admin export 14
gpio-admin export 15
gpio-admin export 17
gpio-admin export 18
gpio-admin export 21
gpio-admin export 22
gpio-admin export 23
gpio-admin export 24
gpio-admin export 10
gpio-admin export 9 
