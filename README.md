# Green path UI

A user interface for [a green path route optimization application](https://github.com/DigitalGeographyLab/hope-green-path-server/) being developed for [Urban Innovative Action](https://www.uia-initiative.eu/en), [HOPE](https://www.uia-initiative.eu/en/uia-cities/helsinki) – Healthy Outdoor Premises for Everyone.

Its goal is to inform people on clean routes for walking and cycling in Helsinki region. It utilizes Air Quality Index (AQI) from the Enfuser model (by the Finnish Meteorological Institute) and modelled traffic noise data. AQI is based on hourly updated and combined information on NO2, PM2.5, PM10 and O3.

Currently implemented features include calculation of walkable quiet paths with respect to typical daytime traffic noise levels. The quiet path optimization application and user interface are based on [an MSc thesis](https://github.com/hellej/quiet-paths-msc). 

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
