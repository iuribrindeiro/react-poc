import { Layout, Menu, Skeleton } from 'antd';
import {
  UserSwitchOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  OrderedListOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

import Link from 'next/link';
import { useRouter } from 'next/router'
import { ApolloProvider } from '@apollo/client';
import client from '../api-client/apollo-client';
import Head from 'next/head';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleRoutingStarted = () => setPageLoading(true);
    const handleRoutingStoped = () => setPageLoading(false);

    router.events.on('routeChangeStart', handleRoutingStarted);
    router.events.on('routeChangeComplete', handleRoutingStoped);
    router.events.on('routeChangeError', handleRoutingStoped);
  }, []);
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  }


  const routes = router.pathname.split('/').map(e => `/${e}`);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="light">
        <Menu defaultOpenKeys={routes.slice(1)} selectedKeys={[router.pathname]} mode="inline">
          <Menu.Item key="/" title="Home" icon={<HomeOutlined />}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <SubMenu key="/clients" title="Clients" icon={<UserSwitchOutlined />}>
            <Menu.Item key="/clients" title="Clients" icon={<OrderedListOutlined />}>
              <Link href="/clients">
                <a>List</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/clients/new-client" title="New Client" icon={<PlusOutlined />}>
              <Link href="/clients/new-client">
                <a>New</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="/charges" title="Charges" icon={<MoneyCollectOutlined />}>
            <Menu.Item key="/charges" title="Charges" icon={<OrderedListOutlined />}>
              <Link href="/charges">
                <a>List</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="/charges/new-charge" title="New Charge" icon={<PlusOutlined />}>
              <Link href="/charges/new-charge">
                <a>New</a>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>
            <ApolloProvider client={client}>
              <Head>
                  <title>Easy Charge</title>
                  <meta property="og:title" content="Easy Charge" key="title" />
              </Head>
              <Skeleton active loading={pageLoading}>
                <Component {...pageProps}></Component>
              </Skeleton>
            </ApolloProvider>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default MyApp
