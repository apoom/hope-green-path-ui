import React from 'react'
import { connect } from 'react-redux'

class PathSelected extends React.Component {
    layerId = 'selectedPath'
    source

    layout = {
        'icon-image': 'circle-15',
        'icon-size': 0.7,
        'symbol-placement': 'line',
        'symbol-spacing': 28,
    }

    componentDidMount() {
        const { map, selPathFC } = this.props
        map.once('load', () => {
            // Add layer
            map.addSource(this.layerId, { type: 'geojson', data: selPathFC })
            this.source = map.getSource(this.layerId)
            map.addLayer({
                id: this.layerId,
                source: this.layerId,
                type: 'symbol',
                layout: this.layout,
            })
        })
    }

    componentDidUpdate = () => {
        const { map, selPathFC, detourLimit } = this.props

        if (this.source !== undefined) {
            this.source.setData(selPathFC)
            map.setFilter(this.layerId, ['<=', 'len_diff', detourLimit.limit])
        } else {
            map.once('sourcedata', () => {
                this.source.setData(selPathFC)
            })
            map.setFilter(this.layerId, ['<=', 'len_diff', detourLimit.limit])
        }
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => ({
    selPathFC: state.paths.selPathFC,
    detourLimit: state.paths.detourLimit,
})

const ConnectedPathSelected = connect(mapStateToProps, null)(PathSelected)

export default ConnectedPathSelected
