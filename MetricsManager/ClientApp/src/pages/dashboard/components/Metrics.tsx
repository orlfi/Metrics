import { Card, Col, Row, Tabs, Switch } from 'antd';
import { useState } from 'react';
import CpuChart from './Charts/CpuChart';
import RamChart from './Charts/RamChart';
import HddChart from './Charts/HddChart';
import NetworkChart from './Charts/NetworkChart';
import DotNetChart from './Charts/DotNetChart';
import type { AgentDataType, DataItem, MetricDataType } from '../data.d';
import { useRequest } from 'umi';
import AgentInfo from './AgentInfo';
import styles from '../style.less';
import moment, { Moment } from 'moment';
import { enableAgentById, disableAgentById } from '../service';
import { message } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];
const metricsData: DataItem[] = [];

for (let i = 0; i < 100; i += 1) {
  const Time = moment(new Date().getTime() + 1000 * 60 * 30 * i).format('HH:mm');
  metricsData.push({
    Time,
    AgentId: 1,
    Type: 'CPU metrics',
    Value: Math.floor(Math.random() * 100) + 10,
  });
}

const AgentTabPane = ({
  data,
  currentTabKey: currentKey,
}: {
  data: AgentDataType;
  currentTabKey: string;
}) => {
  const [isAgentEnabled, setAgentEnableState] = useState(data.IsEnabled);

  const { loading: enableAgentLoading, run: runEnableAgent } = useRequest(enableAgentById, {
    manual: true,
    onSuccess: (result: any, params) => {
      message.success(`Agent  id="${params[0]}" is enabled!`);
    },
    onError: (result: any, params) => {
      setAgentEnableState(false);
      message.error(`Ошибка при изменении состояния агента id="${params[0]}" на  enabled!`);
    },
  });

  const { loading: disableAgentLoading, run: runDisableAgent } = useRequest(disableAgentById, {
    manual: true,
    onSuccess: (result: any, params) => {
      message.success(`Agent  id="${params[0]}" is disabled!`);
    },
    onError: (result: any, params) => {
      setAgentEnableState(true);
      message.error(`Ошибка при изменении состояния агента id="${params[0]}" на  disabled!`);
    },
  });

  const onSwitchChange = (checked: boolean, ev: Event) => {
    setAgentEnableState(checked);

    if (checked) {
      runEnableAgent(data.AgentId);
    } else {
      runDisableAgent(data.AgentId);
    }

    ev.stopPropagation();
  };

  return (
    <Row
      justify="start"
      wrap={false}
      align="middle"
      gutter={8}
      style={{ width: 250, margin: '8px 0' }}
    >
      <Col flex="auto">
        <AgentInfo title={data.AgentUrl} />
      </Col>
      <Col flex="none">
        <Switch
          checked={isAgentEnabled}
          defaultChecked={isAgentEnabled}
          onChange={onSwitchChange}
          loading={enableAgentLoading || disableAgentLoading}
        />
      </Col>
    </Row>
  );
};

const { TabPane } = Tabs;

const metricsColProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 8,
  style: { marginBottom: 24 },
};

const Metrics = ({
  activeKey,
  loading,
  timeRange,
  agentsData,
  cpuData,
  cpuLoading,
  ramData,
  ramLoading,
  hddData,
  hddLoading,
  networkData,
  networkLoading,
  dotNetData,
  dotNetLoading,
  handleTabChange,
}: // handleTimeRangeChange
{
  activeKey: string;
  loading: boolean;
  timeRange: RangePickerValue;
  agentsData: AgentDataType[];
  cpuData: DataItem[] | undefined;
  cpuLoading: boolean;
  ramData: DataItem[] | undefined;
  ramLoading: boolean;
  hddData: DataItem[] | undefined;
  hddLoading: boolean;
  networkData: DataItem[] | undefined;
  networkLoading: boolean;
  dotNetData: DataItem[] | undefined;
  dotNetLoading: boolean;
  handleTabChange: (activeKey: string) => void;
  // handleTimeRangeChange:(values:RangePickerValue) => void;
}) => {
  const onTabChange = (key: string) => {
    handleTabChange(key);
  };

  return (
    <Card
      loading={loading}
      className={styles.offlineCard}
      bordered={false}
      style={{ marginTop: 32 }}
    >
      <Tabs activeKey={activeKey} onChange={onTabChange} tabPosition="left">
        {agentsData.map((agent) => (
          <TabPane
            tab={<AgentTabPane data={agent} currentTabKey={activeKey} />}
            key={agent.AgentId}
          >
            <div style={{ padding: '0 24px' }}>
              <Row gutter={24}>
                <Col {...metricsColProps}>
                  <Card
                    loading={cpuLoading}
                    title="CPU usage, %"
                    style={{ marginBottom: 24 }}
                    bordered={false}
                  >
                    <CpuChart
                      loading={cpuLoading}
                      data={cpuData}
                      agentId={agent.AgentId}
                      timeRange={timeRange}
                    ></CpuChart>
                  </Card>
                </Col>
                <Col {...metricsColProps}>
                  <Card
                    loading={ramLoading}
                    title="RAM available, Mb"
                    style={{ marginBottom: 24 }}
                    bordered={false}
                  >
                    <RamChart
                      loading={ramLoading}
                      data={ramData}
                      agentId={agent.AgentId}
                      timeRange={timeRange}
                    ></RamChart>
                  </Card>
                </Col>
                <Col {...metricsColProps}>
                  <Card
                    loading={hddLoading}
                    title="HDD active time, %"
                    style={{ marginBottom: 24 }}
                    bordered={false}
                  >
                    <HddChart
                      loading={hddLoading}
                      data={hddData}
                      agentId={agent.AgentId}
                      timeRange={timeRange}
                    ></HddChart>
                  </Card>
                </Col>
                <Col {...metricsColProps}>
                  <Card
                    loading={networkLoading}
                    title="Network send speed, Mb/s"
                    style={{ marginBottom: 24 }}
                    bordered={false}
                  >
                    <NetworkChart
                      loading={networkLoading}
                      data={networkData}
                      agentId={agent.AgentId}
                      timeRange={timeRange}
                    ></NetworkChart>
                  </Card>
                </Col>
                <Col {...metricsColProps}>
                  <Card
                    loading={dotNetLoading}
                    title="CLR Memory gen 1 heap size, Мб "
                    style={{ marginBottom: 24 }}
                    bordered={false}
                  >
                    <DotNetChart
                      loading={dotNetLoading}
                      data={dotNetData}
                      agentId={agent.AgentId}
                      timeRange={timeRange}
                    ></DotNetChart>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </Card>
  );
};

export default Metrics;
