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

const data = [
  {
    year: 1998,
    gunControl: 160000,
    gunRights: 4498393,
    gunManufacturing: 530000
  },
  {
    year: 1999,
    gunControl: 840000,
    gunRights: 5891966,
    gunManufacturing: 795000
  },
  {
    year: 2000,
    gunControl: 440000,
    gunRights: 6710758,
    gunManufacturing: 500000
  },
  {
    year: 2001,
    gunControl: 2113699,
    gunRights: 6236161,
    gunManufacturing: 708000
  },
  {
    year: 2002,
    gunControl: 1842054,
    gunRights: 5684546,
    gunManufacturing: 660000
  },
  {
    year: 2003,
    gunControl: 1021665,
    gunRights: 4283326,
    gunManufacturing: 672000
  },
  {
    year: 2004,
    gunControl: 1352346,
    gunRights: 4342400,
    gunManufacturing: 880000
  },
  {
    year: 2005,
    gunControl: 230000,
    gunRights: 4070587,
    gunManufacturing: 1395000
  },
  {
    year: 2006,
    gunControl: 90100,
    gunRights: 3184231,
    gunManufacturing: 1400000
  },
  {
    year: 2007,
    gunControl: 208374,
    gunRights: 3962242,
    gunManufacturing: 1368000
  },
  {
    year: 2008,
    gunControl: 150000,
    gunRights: 4128771,
    gunManufacturing: 1398000
  },
  {
    year: 2009,
    gunControl: 251425,
    gunRights: 5209870,
    gunManufacturing: 1594000
  },
  {
    year: 2010,
    gunControl: 290000,
    gunRights: 5847597,
    gunManufacturing: 1585000
  },
  {
    year: 2011,
    gunControl: 280000,
    gunRights: 5580651,
    gunManufacturing: 1375000
  },
  {
    year: 2012,
    gunControl: 250000,
    gunRights: 6129911,
    gunManufacturing: 979500
  },
  {
    year: 2013,
    gunControl: 2217765,
    gunRights: 15292052,
    gunManufacturing: 850000
  },
  {
    year: 2014,
    gunControl: 1942396,
    gunRights: 12013482,
    gunManufacturing: 817500
  },
  {
    year: 2015,
    gunControl: 1678956,
    gunRights: 11406347,
    gunManufacturing: 1010000
  },
  {
    year: 2016,
    gunControl: 1657992,
    gunRights: 11181199,
    gunManufacturing: 1120000
  },
  {
    year: 2017,
    gunControl: 1942415,
    gunRights: 11440684,
    gunManufacturing: 1334000
  },
  {
    year: 2018,
    gunControl: 2039212,
    gunRights: 12453572,
    gunManufacturing: 1161000
  },
  {
    year: 2019,
    gunControl: 1800000,
    gunRights: 8164488,
    gunManufacturing: 1210000
  }
]

export default () => (
  <BarChart
    width={512}
    height={300}
    data={data}
    style={{ maxWidth: '100vw' }}
  >
    <CartesianGrid strokeDasharray="3 3" stroke={palette.muted} />
    <XAxis dataKey="year" stroke={palette.muted} />
    <YAxis tickFormatter={v => `$${Number(v) / 1000 / 1000}m`} stroke={palette.muted} />
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
