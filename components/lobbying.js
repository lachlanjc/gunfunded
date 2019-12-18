import React from 'react'
import {
  Bar,
  BarChart,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts'
import { palette } from './theme'

export default ({ data }) => (
  <BarChart width={512} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke={palette.muted} />
    <XAxis dataKey="year" stroke={palette.muted} />
    <YAxis
      tickFormatter={v => `$${Number(v) / 1000 / 1000}m`}
      stroke={palette.muted}
    />
    <Legend />
    <ReferenceLine y={0} stroke="#000" />
    <Bar
      type="monotone"
      dataKey="gunControl"
      name="Control"
      fill={palette.blue}
      unit="$"
    />
    <Bar type="monotone" dataKey="gunRights" name="Rights" fill={palette.red} />
    <Bar
      type="monotone"
      dataKey="gunManufacturing"
      name="Manufacturing"
      fill={palette.muted}
    />
  </BarChart>
)
