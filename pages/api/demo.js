import fetch from 'isomorphic-unfetch'
import _ from 'lodash'
import React from 'react'
import { Group } from '@vx/group'
import { genBins } from '@vx/mock-data'
import { scaleLinear } from '@vx/scale'
import { HeatmapCircle, HeatmapRect } from '@vx/heatmap'

const hot1 = '#77312f'
const hot2 = '#f33d15'
const cool1 = '#122549'
const cool2 = '#b4fbde'
const bg = '#28272c'

const data = genBins(16, 16)

// utils
const max = (data, value = d => d) => Math.max(...data.map(value))
const min = (data, value = d => d) => Math.min(...data.map(value))

// accessors
const bins = d => d.bins
const count = d => d.count

const colorMax = max(data, d => max(bins(d), count))
const bucketSizeMax = max(data, d => bins(d).length)

// scales
const xScale = scaleLinear({
  domain: [0, data.length]
})
const yScale = scaleLinear({
  domain: [0, bucketSizeMax]
})
const circleColorScale = scaleLinear({
  range: [hot1, hot2],
  domain: [0, colorMax]
})
const rectColorScale = scaleLinear({
  range: [cool1, cool2],
  domain: [0, colorMax]
})
const opacityScale = scaleLinear({
  range: [0.1, 1],
  domain: [0, colorMax]
})

const Page = ({
  width = 768,
  height = 512,
  separation = 20,
  newData,
  margin = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 20
  }
}) => {
  // bounds
  let size = width
  if (size > margin.left + margin.right) {
    size = width - margin.left - margin.right - separation
  }

  const xMax = size / 2
  const yMax = height - margin.bottom - margin.top

  const binWidth = xMax / data.length
  const binHeight = yMax / bucketSizeMax
  const radius = min([binWidth, binHeight]) / 2

  xScale.range([0, xMax])
  yScale.range([yMax, 0])

  return (
    <>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} rx={14} fill={bg} />
        <Group top={margin.top} left={margin.left}>
          <HeatmapCircle
            data={data}
            xScale={xScale}
            yScale={yScale}
            colorScale={circleColorScale}
            opacityScale={opacityScale}
            radius={radius}
            gap={2}
          >
            {heatmap =>
              heatmap.map(bins =>
                bins.map(bin => (
                  <circle
                    key={`heatmap-circle-${bin.row}-${bin.column}`}
                    className="vx-heatmap-circle"
                    cx={bin.cx}
                    cy={bin.cy}
                    r={bin.r}
                    fill={bin.color}
                    fillOpacity={bin.opacity}
                    onClick={event => {
                      const { row, column } = bin
                      alert(JSON.stringify({ row, column, ...bin.bin }))
                    }}
                  />
                ))
              )
            }
            }}
          </HeatmapCircle>
        </Group>
        <Group top={margin.top} left={xMax + margin.left + separation}>
          <HeatmapRect
            data={data}
            xScale={xScale}
            yScale={yScale}
            colorScale={rectColorScale}
            opacityScale={opacityScale}
            gap={2}
          >
            {heatmap =>
              heatmap.map(bins =>
                bins.map(bin => (
                  <circle
                    key={`heatmap-rect-${bin.row}-${bin.column}`}
                    className="vx-heatmap-circle"
                    cx={bin.cx}
                    cy={bin.cy}
                    r={bin.r}
                    fill={bin.color}
                    fillOpacity={bin.opacity}
                    onClick={event => {
                      const { row, column } = bin
                      alert(JSON.stringify({ row, column, ...bin.bin }))
                    }}
                  />
                ))
              )
            }
          </HeatmapRect>
        </Group>
      </svg>
      <pre
        children={JSON.stringify(newData)}
        style={{
          maxWidth: '100%',
          whiteSpace: 'pre-wrap',
          backgroundColor: 'pink'
        }}
      />

      <pre
        children={JSON.stringify(data)}
        style={{ maxWidth: '100%', whiteSpace: 'pre-wrap' }}
      />
    </>
  )
}

Page.getInitialProps = async ({ req }) => {
  const origin = req ? `http://${req.headers.host}` : ''
  const dl = await fetch(`${origin}/static/records.json`)
  const profiles = await dl.json()
  const dlStates = await fetch(`${origin}/static/states.json`)
  const states = await dlStates.json()
  const stateIndex = abbrev => _.find(states, { abbrev }).id

  const republicans = _.filter(profiles, { party: 'Republican', role: 'rep' })
  /*
  _.toNumber(r.id.match(/\d+/).join(''))
  _.toNumber(
      r.role === 'sen' ? 10 + r.id.match(/\d+/)[0] : r.district
    )
  */
  const repubBins = _.map(republicans, r => ({
    id: r.id,
    stateId: stateIndex(r.state).toString(),
    district: r.district.toString(),
    bin: stateIndex(r.state).toString() + r.district.toString(),
    count: r.gunRightsTotal
  }))
  const democrats = _.filter(profiles, { party: 'Democrat', role: 'rep' })
  const demBins = []
  const data = [{ bin: 0, bins: repubBins }, { bin: 1, bins: demBins }]
  return { newData: data }
}

export default Page
