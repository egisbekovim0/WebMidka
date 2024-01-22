So, in project we have routers, views,public folders. In public folder we have client side script, in views we have html file, in router we have router for /weather route. Each of them does they job very well. 
In our project we use express,path, bodyparser, so you can use npm install for them. I use 3 api: OpenWeatherApi, OpenCageDataApi, FlagsApi. That all work logically good, 
because we retrieve values from openWeatherApi as longitude and latitude and use it for openCage for the country information and for flagsApi for displaying the flag of the country
So we have 1 input field, where we should pass city name and retrieve weather data. So for displaying location I used leaflet.js as well as openStreetmap. So using marker and circle
I made it easier to point where is the city located, so we use longitude and latitude also for map, so we say map.setView and pass them. So that is simple project that uses 3 API and 
shows weather and country city details!
