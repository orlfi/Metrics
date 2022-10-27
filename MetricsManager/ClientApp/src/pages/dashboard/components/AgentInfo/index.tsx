import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { DesktopOutlined } from '@ant-design/icons';

export type AgentInfoProps = {
  title?: React.ReactNode | string;
  isEnabled?: boolean;
};
const AgentInfo: React.FC<AgentInfoProps> = ({ title, isEnabled, ...rest }) => (
  <div className={classNames(styles.agentInfo)} {...rest}>
    {title && (
      <span className={styles.agentInfoTitle} title={typeof title === 'string' ? title : ''}>
        <DesktopOutlined className={styles.agentInfoIcon} />
        {title}
      </span>
    )}
  </div>
);

export default AgentInfo;
