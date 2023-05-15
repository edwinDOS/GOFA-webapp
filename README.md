# GoFaIO
Web app for the Flexpendant to control the Input/Output of the GoFa robot

Steps to deploy the app in the real controller:
1) Create the folder WebApps in the $HOME/ directory
2) Copy/Paste the app folder in the WebApps folder (RW will detect the app)
3) Restart the controller

Attention: It is neccessary to check if the "Access Level" of the signals aimed to control is established to "All" instead of "Default"
The "Access Level" parameter can be set up from RobotStudio Controller->Configuration->I/O System->Signal
