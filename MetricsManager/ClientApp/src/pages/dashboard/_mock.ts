import moment from 'moment';
import type { Request, Response } from 'express';
import type { AgentDataType, MetricDataType } from './data.d';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

// mock data

const agentsData: AgentDataType[] = [];
for (let i = 0; i < 5; i += 1) {
  agentsData.push({
    AgentId: i,
    AgentUrl: `192.168.1.${i}`,
    IsEnabled: true,
  });
}
agentsData.push({
  AgentId: 7,
  AgentUrl: `Тестовые данные для анализа`,
  IsEnabled: true,
});

const metricsData: () => MetricDataType[] = () => {
  const data: MetricDataType[] = [];
  for (let i = 0; i < 100; i += 1) {
    const Time = moment(new Date().getTime() + 1000 * 60 * 30 * i).toDate();
    data.push({
      Id:1,
      AgentId: 1,
      Time,
      Value: Math.floor(Math.random() * 100) + 10,
    });
  }
  return data;
};

const fakeAgentsData = async (_: Request, res: Response) => {
  await waitTime(20);
  const data = res.json({
    Agents: agentsData,
  });
  return data;
};

const fakeMetricsData = async (_: Request, res: Response) => {

  await waitTime(2000);

  return res.json({
    data: metricsData(),
  });
};

export default {
  'GET  /api/agents': fakeAgentsData,
  'GET  /api/metrics/cpu/agent': fakeMetricsData,
};
