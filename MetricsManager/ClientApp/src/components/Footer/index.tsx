import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Orlfi',
  });

  return (
    <DefaultFooter
      copyright={`2021 ${defaultMessage}`}
      links={[
        {
          key: 'Orlf',
          title: 'Orlfi',
          href: 'https://mtrics.orlfi.tk',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/orlfi/GeekBrains/tree/main/3.AspNetCoreWebApi/Metrics',
          blankTarget: true,
        },
      ]}
    />
  );
};
