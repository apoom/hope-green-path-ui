import { turf } from '../utils/index'

const geoOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 8000,
}
const initialUserLocation = {
  watchId: 0,
  expireTime: '',
  error: null,
  userLocFC: turf.asFeatureCollection([]),
  userLocHistory: [],
}

const userLocationReducer = (store = initialUserLocation, action) => {

  switch (action.type) {
    case 'START_TRACKING_USER_LOCATION':
      return {
        ...store,
        error: 'Waiting for location...'
      }

    case 'SET_WATCH_ID': return { ...store, watchId: action.watchId }

    case 'ERROR_IN_POSITIONING': {
      const error = store.userLocHistory.length > 0 ? null : 'Have you enabled location services?'
      return {
        ...store,
        error,
      }
    }
    case 'UPDATE_USER_LOCATION': {
      return {
        ...store,
        userLocFC: action.userLocFC,
        userLocHistory: store.userLocHistory.concat([action.coords]),
      }
    }
    case 'RESET_USER_LOCATION':
      return initialUserLocation

    default:
      return store
  }
}

export const mockUserLocation = () => {
  return async (dispatch) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const lng = 24.93312835
    const lat = 60.16910312
    const userLocFC = turf.asFeatureCollection([turf.asPoint([lng, lat])])
    dispatch({
      type: 'UPDATE_USER_LOCATION',
      coords: [lng, lat],
      userLocFC,
    })
  }
}

export const startTrackingUserLocation = () => {
  return (dispatch) => {
    dispatch({ type: 'START_TRACKING_USER_LOCATION' })
    dispatch(updateUserLocation())
  }
}

export const updateUserLocation = () => {
  return (dispatch) => {
    const geoError = () => {
      dispatch({ type: 'ERROR_IN_POSITIONING' })
    }
    const watchPosition = (pos) => {
      const lng = pos.coords.longitude
      const lat = pos.coords.latitude
      const userLocFC = turf.asFeatureCollection([turf.asPoint([lng, lat])])
      dispatch({
        type: 'UPDATE_USER_LOCATION',
        coords: [lng, lat],
        userLocFC,
      })
    }
    const watchId = navigator.geolocation.watchPosition(watchPosition, geoError, geoOptions)
    console.log('geolocation watchId:', watchId)
    dispatch({ type: 'SET_WATCH_ID', watchId })
  }
}

export default userLocationReducer
