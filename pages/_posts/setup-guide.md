---
layout: post
title:  "ISP Logger Setup Guide (DRAFT)"
author: "Ronald Langeveld"
---



ISP LOGGER

Thank you for your interest in ISP Logger.
  
The project is still heavily work in progress, however this is the first beta version.

What you need:
 

1) Create an account on [isplogger.com](https://www.isplogger.com) then Login.

2) Create a network and obtain your Device ID. It's a UUID string.

For simplicity, run this project on [Docker](https://www.docker.com/products/docker-desktop), but you're also free to run the [python code directly](https://github.com/ronaldlangeveld/isplogger_server).


In future we'll have an easy to use executable app with GUI to make it as user friendly as possible for all users. 

It's been tested on MacOS, Linux and Windows where it runs without issues.  

Type the following in your Terminal (Linux & MacOS) or Command Prompt (Windows)

3) Pull the project from the Docker Hub Hub (Recommended): `$ docker pull ronaldl93/isp-logger `.

If this is successful, time to run the container.

Modify this line with your Device ID


`$ docker run -it -d -e NETWORK_ID="<the device id you obtained from the website>" ronaldl93/isp-logger`

 
A speed test will now perform once, and then again every 60 minutes.

You can see the results on your account at ISP Logger.

I highly recommend running this on a home server or computer that never sleeps / gets switched off.
I'm using an old-ish computer, running Ubuntu Server.

Something like a Raspberry Pi will work just fine as well. As long as it can run docker, you can run it on any device connected to the internet.

The Docker app is Open Source. Feel free to contribute. Contributers will be upgraded to PRO at no cost. 
