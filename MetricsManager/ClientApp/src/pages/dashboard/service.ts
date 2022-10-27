import { request } from 'umi';
import type { Agents, MetricGetByPeriodFromAgentQuery, Metrics } from './data';

export async function getRegisteredAgents(): Promise<{ data: Agents }> {
  return {data:await request('/api/agents')};
}

  export async function getCpuMetricsFromAgent(parameters: MetricGetByPeriodFromAgentQuery) {
  var param = `api/metrics/cpu/agent/${parameters.AgentId}/from/${parameters.FromTime.toJSON()}/to/${parameters.ToTime.toJSON()}`;
  return request(param, {
     method: 'GET',
   });
}

export async function getRamMetricsFromAgent(parameters: MetricGetByPeriodFromAgentQuery) {
  var param = `api/metrics/ram/agent/${parameters.AgentId}/available/from/${parameters.FromTime.toJSON()}/to/${parameters.ToTime.toJSON()}`;
  return request(param, {
     method: 'GET',
   });
}

export async function getHddMetricsFromAgent(parameters: MetricGetByPeriodFromAgentQuery) {
  var param = `api/metrics/hdd/agent/${parameters.AgentId}/disk-time/from/${parameters.FromTime.toJSON()}/to/${parameters.ToTime.toJSON()}`;
  return request(param, {
     method: 'GET',
   });
}

export async function getNetworkMetricsFromAgent(parameters: MetricGetByPeriodFromAgentQuery) {
  var param = `api/metrics/network/agent/${parameters.AgentId}/from/${parameters.FromTime.toJSON()}/to/${parameters.ToTime.toJSON()}`;
  return request(param, {
     method: 'GET',
   });
}

export async function getDotNetMetricsFromAgent(parameters: MetricGetByPeriodFromAgentQuery) {
  var param = `api/metrics/dotnet/agent/${parameters.AgentId}/heap-size/from/${parameters.FromTime.toJSON()}/to/${parameters.ToTime.toJSON()}`;
  return request(param, {
     method: 'GET',
   });
}

export async function enableAgentById(agentId: number) {
  var param = `/api/agents/enable/${agentId}`;
  return request<number>(param, {
    method: 'PUT',
  });
}

export async function disableAgentById(agentId: number) {
  var param = `/api/agents/disable/${agentId}`;
  return request<number>(param, {
    method: 'PUT',
  });
}