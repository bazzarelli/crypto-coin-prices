import Image from "next/image";
import { useCoinGeckoRangePrice } from "../hooks/useCoinGecko";
import { currentCoin } from "../lib/store";
import { useSelector } from "react-redux";

import {
  daysAfterNewYears2019,
  tickLabelDaysAfterAYearAgo,
} from "../lib/utils";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  chartTooltipContentStyle,
  chartTooltipItemStyle,
} from "../styles/rechartStyles";
import styles from "../styles/CoinChart.module.css";

export default function CoinChart(): React.ReactElement {
  const apiKey = process.env.NEXT_PUBLIC_GECKO_API_KEY;
  const chartCoin = useSelector(currentCoin);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      price: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      price: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      price: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      price: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      price: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      price: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      price: 2100,
    },
  ];

  const { prices, error } = useCoinGeckoRangePrice(
    chartCoin.selectedCoin,
    apiKey
  );

  if (error) {
    return <div>Error loading prices...</div>;
  }

  if (!prices) {
    return <div>Loading...</div>;
  }

  const pricesData = prices.map((day: number[]) => {
    return {
      price: day[1],
    };
  });

  return (
    <div className={styles.chart}>
      <div className={styles.chartImageCont}>
        <Image
          src={chartCoin.selectedCoinImage}
          alt={`${chartCoin} logo`}
          width={100}
          height={100}
        />
      </div>
      <ResponsiveContainer width="90%" height={300}>
        <AreaChart data={pricesData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            style={{ fontFamily: "Arial", fontSize: "0.5rem" }}
            stroke="#777ace"
            tickFormatter={(num) => tickLabelDaysAfterAYearAgo(parseInt(num))}
          />
          <YAxis
            style={{ fontFamily: "Arial", fontSize: "0.8rem" }}
            label={{
              fontFamily: "Arial",
              value: "USD",
              offset: 13,
              position: "insideBottomLeft",
              fill: "#777ace",
            }}
            stroke="#EEEEEE"
            tickFormatter={(num) =>
              `$${num.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
            }
          />
          <Tooltip
            labelFormatter={(value) => daysAfterNewYears2019(parseInt(value))}
            contentStyle={chartTooltipContentStyle}
            itemStyle={chartTooltipItemStyle}
            separator=": "
            formatter={(value, name) => [
              `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
              name,
            ]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
