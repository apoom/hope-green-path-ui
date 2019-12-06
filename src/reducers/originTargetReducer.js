import { turf } from '../utils/index'
import { initialOriginTargetFeatures } from './../constants'
import { closePopup } from './mapPopupReducer'
import { startTrackingUserLocation } from './userLocationReducer'
import { showNotification } from './notificationReducer'
import { utils } from './../utils/index'

const initialOriginTarget = {
  originTargetFC: turf.asFeatureCollection(process.env.NODE_ENV !== 'production' ? initialOriginTargetFeatures : []),
  useUserLocOrigin: false,
  error: null,
  showingPaths: false,
}

const pathsReducer = (store = initialOriginTarget, action) => {

  switch (action.type) {

    case 'RESET_ORIGIN_TARGET':
      return initialOriginTarget

    case 'SET_ORIGIN': {
      const error = utils.originTargetWithinSupportedArea(action.updateOriginTargetFC)
      return { ...store, originTargetFC: action.updateOriginTargetFC, error: error ? error : null, useUserLocOrigin: false }
    }

    case 'SET_ORIGIN_TO_USER_LOC': {
      const originTargetFC = updateOriginToFC(store.originTargetFC, action.userLngLat)
      return { ...store, originTargetFC, useUserLocOrigin: true }
    }

    case 'WAIT_FOR_USER_LOC_ORIGIN': {
      const onlyTargetFeat = store.originTargetFC.features.filter(feat => feat.properties.type === 'target')
      return { ...store, useUserLocOrigin: true, originTargetFC: turf.asFeatureCollection(onlyTargetFeat) }
    }

    case 'UPDATE_USER_LOCATION': {
      if (store.useUserLocOrigin && !store.showingPaths) {
        const updateOriginTargetFC = updateOriginToFC(store.originTargetFC, turf.toLngLat(action.coords))
        const error = utils.originTargetWithinSupportedArea(updateOriginTargetFC)
        return { ...store, originTargetFC: updateOriginTargetFC, error: error ? error : null }
      } else return store
    }

    case 'SET_TARGET': {
      const error = utils.originTargetWithinSupportedArea(action.updateOriginTargetFC)
      return { ...store, originTargetFC: action.updateOriginTargetFC, error: error ? error : null }
    }

    case 'SET_SHORTEST_PATH': return { ...store, showingPaths: true }

    case 'RESET_PATHS': {
      if (action.lngLat && store.useUserLocOrigin) {
        console.log('update origin to current user location:', action.lngLat)
        const updateOriginTargetFC = updateOriginToFC(store.originTargetFC, action.lngLat)
        const error = utils.originTargetWithinSupportedArea(updateOriginTargetFC)
        return { ...store, showingPaths: false, originTargetFC: updateOriginTargetFC, error: error ? error : null }
      }
      else return { ...store, showingPaths: false }
    }

    default:
      return store
  }
}

export const showSetDestinationTooltip = () => {
  return async (dispatch) => {
    dispatch(showNotification('Click on the map to set the origin / destination', 'info', 8))
  }
}

export const setOrigin = (lngLat, originTargetFC) => {
  return async (dispatch) => {
    const updateOriginTargetFC = updateOriginToFC(originTargetFC, lngLat)
    dispatch({ type: 'RESET_PATHS' })
    dispatch({ type: 'SET_ORIGIN', updateOriginTargetFC })
    dispatch(closePopup())
  }
}

export const setTarget = (lngLat, originTargetFC, routingId) => {
  return async (dispatch) => {
    const updateOriginTargetFC = updateTargetToFC(originTargetFC, lngLat)
    dispatch({ type: 'RESET_PATHS' })
    dispatch({ type: 'SET_TARGET', updateOriginTargetFC })
    dispatch(closePopup())
  }
}

export const useUserLocationOrigin = (userLocation) => {
  return async (dispatch) => {
    const userLngLat = turf.getLngLatFromFC(userLocation.userLocFC)
    dispatch({ type: 'RESET_PATHS' })
    dispatch(closePopup())
    if (userLngLat) {
      dispatch({ type: 'SET_ORIGIN_TO_USER_LOC', userLngLat, userLocFC: userLocation.userLocFC })
    } else {
      dispatch({ type: 'WAIT_FOR_USER_LOC_ORIGIN' })
      dispatch(startTrackingUserLocation())
    }
  }
}

const updateOriginToFC = (FC, lngLat) => {
  const features = FC.features
  const target = features.filter(feat => feat.properties.type === 'target')
  const coords = [lngLat.lng, lngLat.lat]
  const origin = [turf.asPoint(coords, { type: 'origin' })]
  return turf.asFeatureCollection(origin.concat(target))
}

const updateTargetToFC = (FC, lngLat) => {
  const features = FC.features
  const origin = features.filter(feat => feat.properties.type === 'origin')
  const coords = [lngLat.lng, lngLat.lat]
  const target = [turf.asPoint(coords, { type: 'target' })]
  return turf.asFeatureCollection(target.concat(origin))
}

export default pathsReducer
