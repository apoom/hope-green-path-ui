import React from 'react'
import { connect } from 'react-redux'
import { setMapReferenceForPopups, setSelectLocationsPopup } from './../../reducers/mapPopupReducer'
import { clickTol } from './../../constants'
import { utils } from './../../utils/index'

class OriginTarget extends React.Component {
    layerId = 'OriginTarget'
    source
    circleStyle = {
        'circle-color': [
            'match',
            ['get', 'type'],
            'origin', '#00fffa',
            'target', '#00ff4c',
            /* other */ '#51ff7c'
        ],
        'circle-stroke-color': 'black',
        'circle-radius': 5,
        'circle-stroke-width': 2
    }

    componentDidMount() {
        const { map, originTargetFC, setSelectLocationsPopup } = this.props

        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: originTargetFC })
            this.source = map.getSource(this.layerId)
            map.addLayer({
                id: this.layerId,
                source: this.layerId,
                type: 'circle',
                paint: this.circleStyle,
            })
            setMapReferenceForPopups(map)
            map.on('click', (e) => {
                // show popup only if path was not clicked
                const features = utils.getLayersFeaturesAroundClickE(['pathsGreen', 'shortestPath'], e, clickTol, map)
                if (features.length === 0) {
                    setSelectLocationsPopup(e.lngLat)
                }
            })
        })
    }

    componentDidUpdate = () => {
        const { map, originTargetFC } = this.props

        if (this.source !== undefined) {
            this.source.setData(originTargetFC)
        } else {
            map.once('sourcedata', () => {
                this.source.setData(originTargetFC)
            })
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    originTargetFC: state.originTarget.originTargetFC,
})

const ConnectedOriginTarget = connect(mapStateToProps, { setSelectLocationsPopup })(OriginTarget)

export default ConnectedOriginTarget
