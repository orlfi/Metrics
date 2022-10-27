import { DataItem } from '@antv/g2plot/esm/interface/config';
import moment from 'moment';

export { DataItem };

export type AgentDataType = {
  AgentId: number;
  AgentUrl: string;
  IsEnabled: boolean;
};

export type MetricDataType = {
  Id:number;
  AgentId: number;
  Value: number;
  Time: Date;
};

export type Metrics = {
  Metrics: DataItem[];
};

export type Agents = {
  Agents: AgentDataType[];
};

export type MetricGetByPeriodFromAgentQuery = {
  AgentId: number;
  FromTime: moment;
  ToTime: moment;
};