// not currently used, for refactor
import { daysAfterNewYears2018 } from '@/lib/utils'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import {
    chartTooltipContentStyle,
    chartTooltipItemStyle
} from '@/styles/rechartStyles'

export default function CoinChart(pricesData: any): React.ReactElement {
    console.log(JSON.stringify(pricesData, null, 2))
    return (
        <ResponsiveContainer width="90%" height={300}>
            <AreaChart data={pricesData}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                {/* TODO: get correct xaxis date labels and ticks to display */}
                <XAxis stroke="#999999" ticks={[2019, 2020, 2021, 2022, 2023]} />
                <YAxis style={{ fontFamily: 'Arial', fontSize: '0.8rem' }} label={{ fontFamily: 'Arial', value: 'USD', offset: 13, position: 'insideBottomLeft', fill: '#777ace' }} stroke="#EEEEEE" />
                <Tooltip labelFormatter={(value) => daysAfterNewYears2018(parseInt(value))} contentStyle={chartTooltipContentStyle} itemStyle={chartTooltipItemStyle} separator=': ' formatter={(value, name) => [`$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`, name]} />
                <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}