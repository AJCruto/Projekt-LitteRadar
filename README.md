![Alt text](Projekt LitteRadar App Source Code/assets/images/litteradar-logo.png)

## Description

The project would leverage IoT technology to enable users to locate nearby garbage bins efficiently. By providing real-time information about the nearest available bins, the system seeks to discourage littering and promote responsible waste disposal practices. This research initiative aligns with the broader goal of creating smart and sustainable environments, utilizing technology to tackle everyday challenges, and fostering a cleaner, more environmentally conscious community. The proposed solution not only serves as a practical tool for individuals seeking proper waste disposal options but also contributes to the ongoing efforts to mitigate the environmental impact of littering in open, public areas.

## Software Features
1. Real-time GPS-Based Location Tracking: Real-time monitoring of the location of the IoT-powered garbage bins using GPS technology.
2. Bin Scanning and Detection: The application can locate nearby garbage bins within a fixed portion of the area by tapping on the scan button. 
3. User and System Administrator Dashboards: The user dashboard functions as the default interface of the application. On the other hand, administrators also have a dashboard of their own that enables them to have exclusive access to certain features by logging in to the system, including the ability to see and know whether the bin has been moved from its previous position or is out of the fixed radius detection zone.
4. API-Integrated Map Display: Through the integration of the Google Maps API, a map is displayed in the application interface, showing information on the current location of the user and the garbage bins.
5. Bin Markers: These are red dots that appear on the map, indicating the current position of the bin. Tapping on it will show the name of the bin embedded in the icon and the path that the user needs to take to reach the location of the bin.

## Hardware + Physical Features
1. IoT Circuit (mainly composed of NEO-6M GPS module and ESP8266 Wi-Fi Module)
2. Custom Bin Holder (with Hardware Storage Box and Solar Panel Stand)

## Installation and Operation
Operating the Hardware Using Solar Panel
1.	Plug the USB cable into the solar panel. 
2.	Plug the micro USB cable into the port of the hardware (the ESP8266 Wi-Fi module).
3.	Attach the solar panel to the stand.
4.	Place the plugged hardware inside the hardware storage box.
5.	Place the solar panel in an area with exposure to the sun.
6.	Wait for the solar panel to power up.
7.	The hardware will automatically function on its own when the solar panel gathers enough solar energy, characterized by the blinking of the LEDs of both the GPS and Wi-Fi modules.
   
Operating the Hardware Using Power Bank
1.	Plug the USB cable into the power bank. 
2.	Plug the micro USB cable into the port of the hardware (the ESP8266 Wi-Fi module).
3.	Place the plugged hardware inside the hardware storage box.
4.	Place the power bank inside the hardware storage box.
5.	The hardware will automatically function on its own upon plugging in the power source, characterized by the blinking of the LEDs of both the GPS and Wi-Fi modules.
   
Operating the Application as a User
1.	Install the application package.
2.	Once done, have the network connection enabled. Using a Wi-Fi or a cellular data network will do.
3.	Similarly, have the GPS enabled.
4.	Open the installed application.
5.	Tap on “SCAN FOR NEARBY GARBAGE BINS”.
6.	Wait for a moment as the application processes the information.
7.	Once the application is done, a prompt will appear whether there are bins found. 
8.	Tap on the button to view the map to which the location of the bins will be shown.
   
Operating the Application as a System Administrator
1.	Install the application package.
2.	Once done, have the network connection enabled. Using a Wi-Fi or a cellular data network will do.
3.	Similarly, have the GPS enabled.
4.	Open the installed application.
5.	Tap on “LOGIN AS ADMIN”
6.	Enter the following credentials:
Email: admin@litteradar.com
Password: password
7.	Once the required information is entered, you may now view and monitor the bins on the map.
8.	For the bin monitoring module feature to activate, kindly wait for at least a few minutes since the module has to read that the bin should exceed 10 meters from its original position.

## Developer Contact
For inquiries, kindly contact at: [ajcruto@gmail.com]

## Disclaimer!
This project is created solely for academic purposes. Open for contributions. Not for commercial use. 
