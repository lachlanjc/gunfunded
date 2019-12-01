/** @jsx jsx */
import { jsx } from 'theme-ui'
import states from 'react-usa-map/src/data/usa-states-dimensions.json'
import { find } from 'lodash'

export default ({ id, ...props }) => {
  const state = states[id]
  const tr = state.dimensions.split(' ')[0].replace('M', '').split(',')
  tr[0] = Number(tr[0]) / 3
  tr[1] = Number(tr[1]) / 3
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 959 593"
        width={959}
        height={593}
        role="img"
        {...props}
      >
        <title>{state.stateName}</title>
        <path
          d={state.dimensions}
          transform={`translate(-${tr[0]} -${tr[1]})`}
        />
      </svg>
    </>
  )
}
