import { Area } from '@ant-design/charts';
import type { DataItem } from '../../../data.d';
import React from 'react';
import type { RangePickerValue} from '../typings';

export type RamChartProps = {
  agentId: number;
  timeRange:RangePickerValue;
  data: DataItem[] | undefined;
  loading:boolean;
};

const RamChart: React.FC<RamChartProps> = (props) => {
  const { data} = props;
  
  return (
    <Area
      forceFit
      height={400}
      data={data}
      xField="Time"
      yField="Value"
      
      yAxis={{
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
export default RamChart;
