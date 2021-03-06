import bbox from '@turf/bbox'
import buffer from '@turf/buffer'
import distance from '@turf/distance'
import booleanWithin from '@turf/boolean-within'
import { featureCollection } from '@turf/helpers'
import { point } from '@turf/helpers'

export const asPoint = (coords, properties) => {
  return point(coords, properties)
}

export const asFeatureCollection = (feature) => {
  return featureCollection(feature)
}

export const getBuffer = (geojsonFeature, dist) => {
  return buffer(geojsonFeature, dist, { units: 'meters' })
}

export const getBbox = (geojsonFeature) => {
  return bbox(geojsonFeature)
}

export const within = (feat, feat2) => {
  return booleanWithin(feat, feat2)
}

export const getDistance = (originCoords, destCoords) => {
  const dist = distance(asPoint(originCoords), asPoint(destCoords), { units: 'meters' })
  return Math.round(dist)
}

export const combineFCs = (fc1, fc2) => {
  return asFeatureCollection(fc1.features.concat(fc2.features))
}

export const getFirstPointCoords = (FC) => {
  return FC.features[0].geometry.coordinates
}

export const toLngLat = (coords) => {
  return { lng: coords[0], lat: coords[1] }
}

export const getLngLatFromFC = (FC) => {
  const feat = FC.features[0]
  if (feat) {
    return toLngLat(feat.geometry.coordinates)
  } else return null
}
