import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { Link } from 'umi';
import Footer from '@/components/Footer';
import { LinkOutlined } from '@ant-design/icons';

/** When you get the user information is slow, you will show a loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export function getInitialState(): {
  settings?: Partial<LayoutSettings>;
} {
  return {
    settings: {},
  };
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

/**
    200: The server successfully returned the requested data. ',
    201: New or modified data is successful. ',
    202: A request has entered the background queue (asynchronous task). ',
    204: Data deleted successfully. ',
    400: 'There was an error in the request sent, and the server did not create or modify data. ',
    401: The user does not have permission (token, username, password error). ',
    403: The user is authorized, but access is forbidden. ',
    404: The request sent was for a record that did not exist. ',
    405: The request method is not allowed. ',
    406: The requested format is not available. ',
    410':
        'The requested resource is permanently deleted and will no longer be available. ',
    422: When creating an object, a validation error occurred. ',
    500: An error occurred on the server, please check the server. ',
    502: Gateway error. ',
    503: The service is unavailable. ',
    504: The gateway timed out. ',
 */
export const request: RequestConfig = {
  errorHandler: (error: any) => {
    const { response } = error;

    if (!response) {
      notification.error({
        description: 'Your network is abnormal, unable to connect the server',
        message: 'network anomaly',
      });
    }
    throw error;
  },
};

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightRender: (initialState:any, setInitialState:any) => {
      return '';
    },
    disableContentMargin: false,
    waterMarkProps: {
      content: 'orlfi.tk',
    },
    footerRender: () => <Footer />,
    links: [
      <Link to="/swagger" target="_blank">
        <LinkOutlined />
        <span>OpenAPI Documentation</span>
      </Link>,
    ],
    ...initialState?.settings,
  };
};
