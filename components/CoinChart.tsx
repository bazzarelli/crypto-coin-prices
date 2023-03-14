//! WIP - not working
import {
    AreaChart,
    Area,
    XAxis,
    YAxis
} from 'recharts';


export default function CoinChart(data: any): React.ReactElement {
    console.log(data)
    return (
        <AreaChart width={768} height={256} data={data}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
            </defs>
            {/* change the labels to be years */}
            <XAxis stroke="#999999" ticks={[2019, 2020, 2021, 2022, 2023]} />
            <YAxis stroke="#EEEEEE" />
            <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
    )

}