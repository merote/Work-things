call npm run build
call rd/s/q ..\..\Lomamuutto\build
call xcopy/e build ..\..\Lomamuutto\build\
call "c:\Program Files\nodejs\node.exe" c:\Users\merote\Documents\Lomamuutto\index.js