import Image from "next/image";
import { useCoinGeckoRangePrice } from "../hooks/useCoinGecko";
import { currentCoin } from "../lib/store";
import { useSelector } from "react-redux";

import { tickLabelDaysAfterAYearAgo } from "../lib/utils";

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
            labelFormatter={(value) =>
              tickLabelDaysAfterAYearAgo(parseInt(value))
            }
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
