import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';

import './layout.scss';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    sideMenu: [
      { name: '概览', route: '/index', icon: 'pie-chart' },
      { name: '用户管理', route: '/index', icon: 'user' },
      { name: '二级菜单父', icon: 'bars', children: [
        { name: 'chrome', route: '/user', icon: 'chrome' },
        { name: 'github', route: '/user', icon: 'github' }
      ] },
    ]
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  renderSideMenu = (menu, key) => {
    if (menu.children && menu.children.length) {
      return (
        <SubMenu key={key} title={<span><Icon type={menu.icon} /><span>{menu.name}</span></span>}>
          {
            menu.children.map((item, index) => (
              <Menu.Item key={key + 'child' + index}>
                <Link to={item.route} key={index}>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            ))
          }
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={key}>
          <Link to={menu.route}>
            <Icon type={menu.icon} />
            <span>{menu.name}</span>
          </Link>
        </Menu.Item>
      );
    }
  }

  render() {
    const { children } = this.props;
    return (
      <Layout id='layout'>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div id="logo">asi</div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {
              this.state.sideMenu.map(this.renderSideMenu)
            }
          </Menu>
        </Sider>

        <Layout>
          <Header id="header" />
          <Content id="content">
            <Breadcrumb className="content-nav">
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="content-content">
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Asi ©2018 Created by zhaofinger
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;