import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getSetCleanPaths, getSetQuietPaths } from '../reducers/pathsReducer'
import { utils } from '../utils'

const OuterFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 13px 10px;
  align-items: center;
  @media (min-width: 550px) {
    flex-direction: row;
    justify-content: center;
  }
`
const Button = styled.div`
  cursor: pointer;
  padding: 6px 13px;
  color: white;
  border-radius: 8px;
  margin: 5px 6px;
  font-weight: 400;
  font-size: 28px;
  text-align: center;
  width: max-content;
  letter-spacing: 1px;
  max-width: 90%;
  overflow: auto;
  height: auto;
  pointer-events: auto;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  border: 1px solid white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.22), 0 6px 20px 0 rgba(0,0,0,0.14);
  background-color: #17af40f0;
  color: white;
  &:hover { 
    background-color: #128a32e8;
  }
`
const Tooltip = styled.div`
  font-size: 15px;
  color: rgba(255,255,255,0.9);
`

const FindPathsButtons = (props) => {
  const { cleanPathsAvailable, originTargetFC, originTargetError, routingId,
    waitingPaths, showingPaths, getSetCleanPaths, getSetQuietPaths } = props
  const originCoords = utils.getOriginCoordsFromFC(originTargetFC)
  const targetCoords = utils.getTargetCoordsFromFC(originTargetFC)
  const originOrTargetMissing = originCoords === null || targetCoords === null

  if (originOrTargetMissing || showingPaths || waitingPaths || originTargetError) {
    return null
  }

  return (
    <OuterFlex>
      {cleanPathsAvailable
        ? <Button
          onClick={() => getSetCleanPaths(originCoords, targetCoords, routingId)}> Find clean paths
          <Tooltip>by real-time air quality</Tooltip>
        </Button>
        : null
      }
      <Button onClick={() => getSetQuietPaths(originCoords, targetCoords, routingId)}> Find quiet paths
        <Tooltip>by typical traffic noise</Tooltip>
      </Button>
    </OuterFlex>
  )
}

const mapStateToProps = (state) => ({
  originTargetFC: state.originTarget.originTargetFC,
  originTargetError: state.originTarget.error,
  waitingPaths: state.paths.waitingPaths,
  showingPaths: state.paths.showingPaths,
  routingId: state.paths.routingId,
  cleanPathsAvailable: state.paths.cleanPathsAvailable,
})

const ConnectedFindPathsButtons = connect(mapStateToProps, { getSetCleanPaths, getSetQuietPaths })(FindPathsButtons)

export default ConnectedFindPathsButtons
