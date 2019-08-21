call npm run build
::call rd/s/q ..\..\Lomamuutto\build
call xcopy/e/y build ..\..\Lomamuutto_back\build_admin\
call "c:\Program Files\nodejs\node.exe" "c:\Users\merote\Documents\Lomamuutto_back\index.js"