import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { Button, message} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getRegisteredAgents, addAgent} from './service';
import type { AgentDataType } from './data.d';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import type { FormInstance } from 'antd';

const valueEnum = {
  false: { text: 'Disabled', status: 'Error' },
  true: { text: 'Enabled', status: 'Success' },
};

const columns: ProColumns<AgentDataType>[] = [
  {
    title: 'ID',
    width: 80,
    dataIndex: 'AgentId',
  },
  {
    title: 'URL',
    dataIndex: 'AgentUrl',
    align: 'left',
  },
  {
    title: 'Status',
    dataIndex: 'IsEnabled',
    align: 'center',
    valueEnum,
  },
];

const handleAdd = async (fields: AgentDataType) => {
  const hide = message.loading('Add');

  try {
    await addAgent({ ...fields, IsEnabled:true });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again！');
    return false;
  }
};

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  return (
    <PageContainer>
    <ProTable<AgentDataType>
      actionRef={actionRef}
      columns={columns}
      request={getRegisteredAgents}
      rowKey="AgentId"
      pagination={{
        disabled: true,
      }}
      search={false}
      dateFormatter="string"
      headerTitle={false}
      toolBarRender={() => [
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            formRef.current?.resetFields();
            handleModalVisible(true);
          }}
        >
          <PlusOutlined /> Add agent
        </Button>,
      ]}
    />
      <ModalForm
        title="New agent"
        width="400px"
        formRef={formRef}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as AgentDataType);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Agent URL is required',
            },
          ]}
          width="md"
          name="AgentUrl"
          label="URL"
          placeholder="Please enter agent's URL"
        />
      </ModalForm>    
    </PageContainer>
  );
};
export default TableList;