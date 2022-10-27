// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { AgentDataType } from './data';


export async function getRegisteredAgents(): Promise<{ data: AgentDataType[] }> {
  const agents = await request('/api/agents');
  return {data:agents.Agents};
}

export async function addAgent(body: AgentDataType,options?: { [key: string]: any }) {
  var response = await request<AgentDataType>('/api/agents/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
  
  return  response;
}
