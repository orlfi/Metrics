// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';
import { parse } from 'url';
import type { AgentDataType } from './data.d';

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

const getAgents = async (_: Request, res: Response) => {
  const data = res.json({
    Agents: agentsData,
  });
  return data;
};


function postAgent(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method} = req;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'POST':
      (() => {
        const newAgent:AgentDataType = {
          AgentId: 10,
          AgentUrl:"https://localhost:5000",
          IsEnabled:true

        };
        return res.json(newAgent);
      })();
      return;
    default:
      break;
  }
}

export default {
  'GET  /api/agents': getAgents,
  'POST  /api/agents/register': postAgent,
};
