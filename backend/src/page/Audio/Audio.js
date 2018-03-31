import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Tooltip, Modal, message, Button, Switch } from 'antd';

import './audio.scss';
import { getAudioList, publishAudio } from '../../api/audio';
import { fullImgUrl, timeFormat, fullAudioUrl } from '../../public/lib/utils';


class Audio extends Component {
  state = {
    posterPreviewSrc: '',
    isShowPreviewModal: false,
    list: [],
    nowPage: 1,
    totalCount: 0,
    publishLoadingIndex: null
  }

  static propTypes = {
  }

  componentDidMount() {
    let page = Number(window.location.hash.substring(1)) || 1;
    this.setState({
      nowPage: page
    });
    this.getList(page);
  }

  async getList(page = 1) {
    let { list, total } = await getAudioList({ page });
    list = list.map(item => {
      item.key = item.id;
      item.src = fullAudioUrl(item.src);
      item.poster = fullImgUrl(item.poster);
      return item;
    });
    if (!list.length) {
      message.error('没有更多数据了！');
    }
    this.setState({
      totalCount: total,
      list
    });
  }

  previewPoster(src) {
    this.setState({
      posterPreviewSrc: src,
      isShowPreviewModal: true
    });
  }

  quitPreviewPoster() {
    this.setState({
      isShowPreviewModal: false
    });
  }

  setPage(page, pageSize) {
    window.location.hash = page;
    let nowPage = Number(window.location.hash.substring(1)) || 1;
    this.setState({ nowPage });
    this.getList(nowPage);
  }

  async publishAudio(id, index, isPublish) {
    this.setState({
      publishLoadingIndex: index
    });
    await publishAudio(id, Number(!isPublish));
    this.setState({
      publishLoadingIndex: null
    });
    this.setState(preState => {
      preState.list[index].is_publish = !preState.list[index].is_publish;
      return { list: preState.list };
    });
  }

  render() {
    const columns = [{
      title: '标题',
      dataIndex: 'title'
    }, {
      title: '封面',
      dataIndex: 'poster',
      render: poster => <img className="pointer" src={poster} alt="封面图片" onClick={this.previewPoster.bind(this, poster)}/>
    }, {
      title: '简介',
      dataIndex: 'desc',
      render: desc => <Tooltip placement="top" title={desc}><span className="pointer">{desc.substr(0, 30)}</span></Tooltip>
    }, {
      title: '音频',
      dataIndex: 'src',
      render: src => <audio src={src} controls preload="none"></audio>
    }, {
      title: '来源',
      dataIndex: 'origin',
      render: origin => <Tooltip placement="top" title={origin}><span className="pointer">{origin.substr(0, 10)}</span></Tooltip>
    },  {
      title: '发布',
      dataIndex: 'is_publish',
      render: (isPublish, record, index) => <Switch size="small" checked={Boolean(isPublish)} loading={ this.state.publishLoadingIndex === index } onChange={this.publishAudio.bind(this, record.id, index, isPublish)} />
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      render: time => <Tooltip placement="top" title={timeFormat(time)}><span className="pointer">{timeFormat(time, 'yyyy-MM-dd')}</span></Tooltip>,
    }, {
      title: '修改时间',
      dataIndex: 'updated_at',
      render: time => <Tooltip placement="top" title={timeFormat(time)}><span className="pointer">{timeFormat(time, 'yyyy-MM-dd')}</span></Tooltip>,
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button type="primary" size="small">更新</Button>
          <Button type="danger" size="small">删除</Button>
        </div>
      ),
    }];
    return (
      <div id="audio">
        <Modal visible={this.state.isShowPreviewModal} onCancel={this.quitPreviewPoster.bind(this)} footer={null}>
          <img src={this.state.posterPreviewSrc} alt="封面图片"/>
        </Modal>
        <Table dataSource={this.state.list} columns={columns} pagination={{ pageSize: 10, total: this.state.totalCount, current: this.state.nowPage, onChange: this.setPage.bind(this) }} className="audio-list" />
      </div>
    );
  }
}

export default connect(state => ({
}), {
  })(Audio);
