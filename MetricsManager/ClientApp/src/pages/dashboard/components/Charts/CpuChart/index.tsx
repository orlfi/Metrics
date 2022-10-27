import { Area } from '@ant-design/charts';
import type { DataItem } from '../../../data.d';
import moment from 'moment';
import React from 'react';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

export type ChartProps = {
  agentId: number;
  timeRange:RangePickerValue;
  data: DataItem[] | undefined;
  loading:boolean;
};

const CpuChart: React.FC<ChartProps> = (props) => {
  const { data} = props;
  
  var config = {
    areaStyle: { fillOpacity: 0.7 },
    appendPadding: 10,
    isPercent: true,
  };

  return (
    <Area {...config}
      forceFit
      height={400}
      data={data}
      xField="Time"
      yField="Value"
      
      yAxis={{
        max:100,
        label:{
          formatter: function formatter(v) {
            return v+"%";
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
export default CpuChart;
