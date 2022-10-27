import type { FC } from 'react';
import { Suspense, useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { PageContainer } from '@ant-design/pro-layout';
import Metrics from './components/Metrics';
import { useRequest } from 'umi';
import { DatePicker, message } from 'antd';
import moment from 'moment';
import { getRegisteredAgents } from './service';
import type { Agents, MetricGetByPeriodFromAgentQuery } from './data';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import { getCpuMetricsFromAgent, getRamMetricsFromAgent, getHddMetricsFromAgent, getNetworkMetricsFromAgent, getDotNetMetricsFromAgent } from './service';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

type DashboardProps = {
  loading: boolean;
};
const format = 'DD.MM.YYYY HH:mm';

const Dashboard: FC<DashboardProps> = () => {
  const [currentTabKey, setCurrentTabKey] = useState<string>('');
  const [timeRange, setTimeRange] = useState<RangePickerValue>([moment([2021,5, 1]), moment()]);

  const { loading, data } = useRequest<{ data: Agents }>(getRegisteredAgents, {
    onSuccess: (result, params) => {
      if (result?.Agents[0])
      {
        loadMetrics({AgentId: result.Agents[0].AgentId,FromTime:timeRange?.[0], ToTime:timeRange?.[1]});
      }
    }
  });

  const { loading: cpuLoading, data: cpuData, run: cpuRun } = useRequest(getCpuMetricsFromAgent, {
    manual: true,
    formatResult: (res) => res?.Metrics,
  });

  const { loading: ramLoading, data: ramData, run: ramRun } = useRequest(getRamMetricsFromAgent, {
    manual: true,
    formatResult: (res) => res?.Metrics,
  });

  const { loading: hddLoading, data: hddData, run: hddRun } = useRequest(getHddMetricsFromAgent, {
    manual: true,
    formatResult: (res) => res?.Metrics,
  });

  const { loading: networkLoading, data: networkData, run: networkRun } = useRequest(getNetworkMetricsFromAgent, {
    manual: true,
    formatResult: (res) => res?.Metrics,
  });

  const { loading: dotNetLoading, data: dotNetData, run: dotNetRun } = useRequest(getDotNetMetricsFromAgent, {
    manual: true,
    formatResult: (res) => res?.Metrics,
  });

  const handleTabChange = (key: string) => {
    loadMetrics({AgentId: parseInt(key),FromTime:timeRange?.[0], ToTime:timeRange?.[1]});
    setCurrentTabKey(key);
  };

  const loadMetrics = (parameters: MetricGetByPeriodFromAgentQuery) => {
    cpuRun(parameters);
    ramRun(parameters);
    hddRun(parameters);
    networkRun(parameters);
    dotNetRun(parameters);
  };

  const activeKey = currentTabKey || (data?.Agents[0] && data?.Agents[0].AgentId.toString()) || '';

  const timeRangeChangeHandler = (values: RangePickerValue, agentId:string) => {
    if (values) {
      loadMetrics({AgentId: parseInt(agentId),FromTime:values[0], ToTime:values[1]});
      setTimeRange(values);
    }
  };

  return (
    <PageContainer
      content={
        <>
          <div style={{ textAlign: 'center' }}>
            <DatePicker.RangePicker
              defaultValue={timeRange}
              showTime
              format={format}
              onChange={(values)=>timeRangeChangeHandler(values, activeKey)}
            />
          </div>
        </>
      }
      header={{
        title: 'Agents Metrics Dashboard',
      }}
    >
      <GridContent>
        <>
          <Suspense fallback={null}>
            <Metrics
              activeKey={activeKey}
              loading={loading}
              timeRange={timeRange}
              agentsData={data?.Agents || []}
              cpuData={cpuData}
              cpuLoading={cpuLoading}
              ramData={ramData}
              ramLoading={ramLoading}
              hddData={hddData}
              hddLoading={hddLoading}
              networkData={networkData}
              networkLoading={networkLoading}
              dotNetData={dotNetData}
              dotNetLoading={dotNetLoading}
              handleTabChange={handleTabChange}
            />
          </Suspense>
        </>
      </GridContent>
    </PageContainer>
  );
};

export default Dashboard;
