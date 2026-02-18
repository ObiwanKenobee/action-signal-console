import { LineChart, Line, ResponsiveContainer, ReferenceLine } from 'recharts';

interface MiniSparklineProps {
  data: number[];
  anomaly?: boolean;
  color?: string;
  height?: number;
}

export function MiniSparkline({
  data,
  anomaly = false,
  color,
  height = 36,
}: MiniSparklineProps) {
  const chartData = data.map((v, i) => ({ v, i }));
  const strokeColor = color || (anomaly ? 'hsl(35 95% 52%)' : 'hsl(174 68% 42%)');

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
        {anomaly && (
          <ReferenceLine
            x={chartData.length - 3}
            stroke="hsl(35 95% 52% / 0.4)"
            strokeDasharray="2 2"
          />
        )}
        <Line
          type="monotone"
          dataKey="v"
          stroke={strokeColor}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
