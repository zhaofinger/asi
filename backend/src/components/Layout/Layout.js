import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import history from '../../public/lib/history';

import './layout.scss';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class PageLayout extends React.Component {
  state = {
    collapsed: false,
    sideMenu: [
      { name: '概览', route: '/index', icon: 'pie-chart' },
      { name: '用户管理', route: '/user', icon: 'user' },
      {
        name: '二级菜单父', icon: 'bars', children: [
          { name: 'chrome', route: '/s1', icon: 'chrome' },
          { name: 'github', route: '/s2', icon: 'github' }
        ]
      },
    ],
    nowRoute: '/index',
  };

  componentWillMount() {
    history.listen((location, action) => {
      let path = location.pathname === '/' ? '/index' : location.pathname;
      console.log(path);
      this.setState({
        nowRoute: path
      });
    })
  }

  componentDidUpdate() {
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  }

  renderSideMenu = (menu, key) => {
    if (menu.children && menu.children.length) {
      return (
        <SubMenu key={key} title={<span><Icon type={menu.icon} /><span>{menu.name}</span></span>}>
          {
            menu.children.map((item, index) => (
              <Menu.Item key={item.route}>
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
        <Menu.Item key={menu.route}>
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
          <Menu theme="dark" defaultSelectedKeys={['/index']} selectedKeys={[this.state.nowRoute]} mode="inline">
            {
              this.state.sideMenu.map(this.renderSideMenu)
            }
          </Menu>
        </Sider>

        <Layout>
          <Header id="header" />
          <Content id="content">
            <Breadcrumb className="content-nav">
              {
                this.state.nowRoute.split('/').map(item => (
                  <Breadcrumb.Item>{item}</Breadcrumb.Item>
                ))
              }
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

export default PageLayout;