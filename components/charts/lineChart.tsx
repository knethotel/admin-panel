'use client';

import { useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent } from '../ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '../ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { ChevronDown } from 'lucide-react';

// Dummy x-axis data
const chartData = [
  { month: 'January', employees: 186 },
  { month: 'February', employees: 305 },
  { month: 'March', employees: 237 },
  { month: 'April', employees: 73 },
  { month: 'May', employees: 209 },
  { month: 'June', employees: 214 }
];

const chartConfig = {
  employees: {
    label: 'Employees',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export function LineChartLinear() {
  const [selectedValue, setSelectedValue] = useState('Monthly');
  const [activeButton, setActiveButton] = useState<number | null>(0);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  return (
    <Card className="bg-lightbrown space-y-6 pt-2 w-full">
      <div className="flex flex-col gap-3 p-4">
        <div className="w-full flex justify-between items-center">
          <p className="text-xs text-[#0B1C33] opacity-70 font-medium">
            TOTAL CASES
          </p>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[100px] border-white border relative">
              <SelectValue placeholder={selectedValue} />
              <ChevronDown className="absolute w-4 h-4 z-50 right-0 top-2 text-black" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monthly text-xs">Monthly</SelectItem>
              <SelectItem value="Yearly text-xs">Yearly</SelectItem>
              <SelectItem value="Weekly text-xs">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between bg-offWhite p-2 rounded-lg">
          {[
            'Employee Escalated',
            'Employee Escalated',
            'Employee Escalated'
          ].map((label, index) => (
            <div
              key={index}
              onClick={() => handleButtonClick(index)}
              className={`cursor-pointer text-sm font-medium px-4 py-2 rounded-lg ${
                activeButton === index
                  ? 'bg-coffee  text-orangeLight '
                  : 'bg-fadedCream text-[#0B1C33]'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="bg-lightbrown h-[200px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={20}
              width={60}
              orientation="left"
              className="w-12"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="employees"
              type="linear"
              stroke="var(--color-employees)"
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
