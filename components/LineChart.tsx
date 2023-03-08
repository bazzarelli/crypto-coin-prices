import { LineChart, Line } from 'recharts';

const data = [];


export default function LineChart() {
  return (
    <LineChart width={768} height={256} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  );
}