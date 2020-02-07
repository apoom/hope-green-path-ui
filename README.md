# Green path UI

A user interface for [a green path route optimization application](https://github.com/DigitalGeographyLab/hope-green-path-server/) being developed for the project [HOPE](https://ilmanlaatu.eu/briefly-in-english/) – Healthy Outdoor Premises for Everyone by the Digital Geography Lab, University of Helsinki.

Its goal is to inform people on clean air and quiet routes for walking and cycling in Helsinki region. It utilizes Air Quality Index (AQI) from the [FMI-ENFUSER](https://en.ilmatieteenlaitos.fi/environmental-information-fusion-service) modelling system (by the Finnish Meteorological Institute) and modelled traffic noise data by the City of Helsinki. AQI is based on real-time hourly composite data on NO2, PM2.5, PM10 and O3.

Currently implemented features include calculation of walkable unpolluted and quiet paths with respect to real-time air quality and typical daytime traffic noise levels. The green path optimization application and user interface are based on [an MSc thesis](https://github.com/hellej/quiet-paths-msc). 

[Live demo](https://green-paths.web.app/)

## Materials
* [FMI Enfuser model](https://en.ilmatieteenlaitos.fi/environmental-information-fusion-service)
* [HOPE project](https://ilmanlaatu.eu/briefly-in-english/)
* [Traffic noise zones in Helsinki 2017](https://hri.fi/data/en_GB/dataset/helsingin-kaupungin-meluselvitys-2017)
* [OpenStreetMap](https://www.openstreetmap.org/about/)

## Built With
* React, Redux & Thunk
* Mapbox GL JS & Turf.js

## Installation
```
$ git clone git@github.com:DigitalGeographyLab/hope-green-path-ui.git
$ cd hope-green-path-ui
$ npm install
$ npm start
```
Create file `.env` and add your Mapbox access token to it as `REACT_APP_MB_ACCESS=`<br>
Open browser to http://localhost:3000/

## License
[MIT](LICENSE)
