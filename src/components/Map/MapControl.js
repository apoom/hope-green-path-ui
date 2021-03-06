import React from 'react'
import { connect } from 'react-redux'

class MapControl extends React.Component {

    getFitBoundsOptions = () => {
        if (window.innerWidth < 544) {
            return { padding: { top: 80, bottom: 310, left: 40, right: 40 } }
        } else return { padding: { top: 90, bottom: 90, left: 430, right: 50 } }
    }

    componentDidUpdate = async (prevProps) => {
        const { map } = this.props
        const { zoomToBbox } = this.props.mapState

        const { userLocHistory } = this.props.userLocation
        if (userLocHistory.length === 1 && prevProps.userLocation.userLocHistory.length === 0) {
            map.easeTo({ center: userLocHistory[0], zoom: 13.7 })
        }
        if (zoomToBbox !== prevProps.mapState.zoomToBbox) map.fitBounds(zoomToBbox, this.getFitBoundsOptions())

    }
    render() { return null }
}

const mapStateToProps = (state) => ({
    userLocation: state.userLocation,
    mapState: state.map,
})

const ConnectedMapControl = connect(mapStateToProps)(MapControl)

export default ConnectedMapControl
