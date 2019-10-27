import React from 'react'
import styled from 'styled-components'
import { utils } from '../../utils/index'
import { PathNoisesBar } from './PathNoisesBar'

const StyledPathListPathBox = styled.div.attrs(props => ({
  style:
    ({
      border: props.selected ? '2px solid black' : '',
      boxShadow: props.selected ? '0 -1px 7px 0 rgba(0, 0, 0, 0.15), 0 4px 7px 0 rgba(0, 0, 0, 0.25)' : ''
    })
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  pointer-events: auto;
  height: 48px;
  border-radius: 5px;
  margin: 4px 0px 4px 0px
  background-color: white;
  border: 2px solid transparent;
  padding: 3px 4px;
  color: black;
  cursor: default;
  transition-duration: 0.12s;
  box-shadow: 0 -1px 6px 0 rgba(0,0,0,0.25), 0 3px 4px 0 rgba(0,0,0,0.3);
  width: calc(88% - 21px);
  &:hover { 
    cursor: pointer;
    @media (min-width: 600px) {
      box-shadow: 0 -1px 8px 0 rgba(0,0,0,0.3), 0 4px 8px 0 rgba(0,0,0,0.35);
    }
  }
`
const PathPropsRow = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  font-weight: 500;
  width: 96%;
  color: ${props => props.color || '#3c3c3c'};
`

const QuietPathLengthProps = styled.div`
  margin-left: 2px;
  text-align: center;
`

const PathListPathBox = ({ path, selected, pathType, handleClick }) => {
  if (pathType === 'short') {
    return <ShortestPathBox path={path} selected={selected} handleClick={handleClick} />
  } else {
    return <QuietPathBox path={path} selected={selected} handleClick={handleClick} />
  }
}

const ShortestPathBox = ({ path, selected, handleClick }) => {
  return (
    <StyledPathListPathBox selected={selected} onClick={handleClick}>
      <PathNoisesBar noisePcts={path.properties.noise_pcts} />
      <PathPropsRow>
        <div>
          {utils.getFormattedDistanceString(path.properties.length, false).string}
        </div>
        <div>
          {path.properties.nei_norm} <sub>ni</sub> ({utils.getNoiseIndexLabel(path.properties.nei_norm)})
        </div>
        <div>
          {Math.round(path.properties.mdB)} dB<sub>mean</sub>
        </div>
      </PathPropsRow>
    </StyledPathListPathBox>
  )
}

const QuietPathBox = ({ path, selected, handleClick }) => {
  const mdB_diff = path.properties.mdB_diff
  return (
    <StyledPathListPathBox selected={selected} onClick={handleClick}>
      <PathNoisesBar noisePcts={path.properties.noise_pcts} />
      <PathPropsRow>
        <QuietPathLengthProps>
          {utils.getFormattedDistanceString(path.properties.length, false).string}
          <sub>
            {' '}{utils.getFormattedDistanceString(path.properties.len_diff, true).string}
          </sub>
        </QuietPathLengthProps>
        <div>
          {Math.round(path.properties.nei_diff_rat) + ' % noise'}
        </div>
        <div>
          {Math.abs(mdB_diff) < 1 ? mdB_diff : Math.round(mdB_diff)} dB<sub>mean</sub>
        </div>
      </PathPropsRow>
    </StyledPathListPathBox>
  )
}

export default PathListPathBox
