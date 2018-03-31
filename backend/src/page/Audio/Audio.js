import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Tooltip, Modal, message } from 'antd';

import './audio.scss';
import { getAudioList } from '../../api/audio';
import { fullImgUrl, timeFormat, fullAudioUrl } from '../../public/lib/utils';


class Audio extends Component {
  state = {
    posterPreviewSrc: '',
    isShowPreviewModal: false,
    list: [],
    nowPage: 1,
    totalCount: 0
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
      title: '文件',
      dataIndex: 'src',
      render: src => <audio src={src} controls preload="none"></audio>
    }, {
      title: '来源',
      dataIndex: 'origin',
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      render: time => timeFormat(time),
    }, {
      title: '最后修改时间',
      dataIndex: 'updated_at',
      render: time => timeFormat(time),
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
