import { Area } from '@ant-design/charts';
import type { DataItem } from '../../../data';
import React from 'react';
import type { RangePickerValue} from '../typings';

export type DotNetChartProps = {
  agentId: number;
  timeRange:RangePickerValue;
  data: DataItem[] | undefined;
  loading:boolean;
};

const DotNetChart: React.FC<DotNetChartProps> = (props) => {
  const { data} = props;
  
  return (
    <Area
      forceFit
      height={400}
      data={data}
      xField="Time"
      yField="Value"
      
      yAxis={{
        max:100,
        label:{
          formatter: function formatter(v) {
            return v;
            },
          },
      }}
      xAxis = {{
        mask:'DD.MM HH:mm:ss',
        type: 'time',
      }}
    />
  );
};
export default DotNetChart;
