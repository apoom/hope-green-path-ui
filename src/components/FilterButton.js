import React from 'react'
import styled, { css } from 'styled-components'
import { Filter } from './Icons'

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  padding: 5px;
  margin-right: -30px;
  color: black;
  ${props => props.disabled === true && css`
    color: #989898;
    pointer-events: none;
  `}
  @media (min-width: 600px) {
    &:hover { 
      padding-top: 3px;
    }
  }
`
const FilterCount = styled.div`
  letter-spacing: 1px;
  font-size: 14px;
  margin-left: 1px;
`

const FilterButton = ({ onClick, qPathCount, lengthLimit, lengthLimits }) => {
  const disabled = lengthLimits.length <= 1
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}>
      <Filter />
      <FilterCount>{lengthLimit.count}/{qPathCount + 1}</FilterCount>
    </StyledButton>
  )
}

export default FilterButton
