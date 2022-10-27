export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type AgentDataType = {
  AgentId: number;
  AgentUrl: string;
  IsEnabled: boolean;
};

export type Agents = {
  Agents: AgentDataType[];
};