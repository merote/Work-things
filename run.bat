call npm run build
::call rd/s/q ..\..\Lomamuutto\build
call xcopy/e build ..\..\Lomamuutto - build\build\
call "c:\Program Files\nodejs\node.exe" "c:\Users\merote\Documents\Lomamuutto - build\index.js"