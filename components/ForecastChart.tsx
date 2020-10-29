import * as React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

type ForecastData = { name: number; value: number }[]

interface ForecastChart {
  data: ForecastData
}

export function ForecastChart({ data }: ForecastChart): JSX.Element {
  return (
    <ResponsiveContainer height={200}>
      <LineChart data={data}>
        <Tooltip />
        <YAxis width={20} dataKey="value" domain={[0, 'dataMax']}></YAxis>
        <XAxis type="category" dataKey="name" domain={['dataMin', 'dataMax']} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
