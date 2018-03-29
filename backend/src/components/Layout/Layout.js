import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from '../../public/lib/history';
import { logout } from '../../api/user';
import { removeUserData } from '../../store/user/action';

import './layout.scss';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class PageLayout extends React.Component {
  state = {
    collapsed: false,
    sideMenu: [
      { name: '概览', route: '/index', icon: 'pie-chart' },
      { name: '用户管理', route: '/user', icon: 'user' },
      { name: 'ASMR', icon: 'hdd', children: [
        { name: '列表', route: '/audio/index', icon: 'bars' },
        { name: '新建', route: '/audio/create', icon: 'upload' }
      ] },
      {
        name: '二级菜单父', icon: 'bars', children: [
          { name: 'chrome', route: '/s1', icon: 'chrome' },
          { name: 'github', route: '/s2', icon: 'github' }
        ]
      },
    ],
    nowRoute: '/index',
  };

  static propTypes = {
    removeUserData: PropTypes.func.isRequired
  }

  componentWillMount() {
    // 当前路由
    this.setState({
      nowRoute: window.location.pathname === '/' ? '/index' : window.location.pathname
    });
    // 监听路由变化
    history.listen((location, action) => {
      let path = location.pathname === '/' ? '/index' : location.pathname;
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

  async quitLogin() {
    await logout();
    this.props.removeUserData();
    history.push('/login');
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
          <Header id="header">
            <a className="quit-login" onClick={this.quitLogin.bind(this)}>退出登录</a>
          </Header>
          <Content id="content">
            <Breadcrumb className="content-nav">
              {
                this.state.nowRoute.split('/').map(item => (
                  <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
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

export default connect(state => ({
}), {
  removeUserData,
})(PageLayout);