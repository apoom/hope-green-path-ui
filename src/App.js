import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Map from './components/map/Map'
import Notification from './components/Notification'
import GetRoutesButton from './components/GetRoutesButton'
import TopControlPanel from './components/TopControlPanel'
import BottomControlPanel from './components/BottomControlPanel'
import PathPanel from './components/pathpanel/PathPanel'
import MapControl from './components/map/MapControl'
import UserLocation from './components/map/UserLocation'
import PathShort from './components/map/PathShort'
import PathQuiet from './components/map/PathQuiet'
import PathSelected from './components/map/PathSelected'
import OriginTargetPoints from './components/map/OriginTargetPoints'
import Guide from './components/guide/Guide'
import DimLayer from './components/DimLayer'
import { showSetDestinationTooltip } from './reducers/originTargetReducer'

const AbsoluteContainer = styled.div`
  position: absolute;
  pointer-events: none;
  `
const TopPanel = styled(AbsoluteContainer)`
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 2;
  `
const BottomPanel = styled(AbsoluteContainer)`
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 3;
`

class App extends Component {

  componentDidMount() {
    this.props.showSetDestinationTooltip()
  }

  render() {
    return (
      <div>
        <DimLayer />
        <Map>
          <MapControl />
          <UserLocation />
          <PathSelected />
          <PathShort />
          <PathQuiet />
          <OriginTargetPoints />
        </Map>
        <Guide />
        <TopPanel>
          <TopControlPanel />
        </TopPanel>
        <BottomPanel>
          <Notification />
          <GetRoutesButton />
          <PathPanel />
          <BottomControlPanel />
        </BottomPanel>
      </div>
    )
  }
}

const ConnectedApp = connect(null, { showSetDestinationTooltip })(App)
export default ConnectedApp
