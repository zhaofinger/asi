import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';


import './audio-create.scss';

import AudioFrom from './_Form';
import { createAudio } from '../../api/audio';

class AudioCreate extends Component {
  state = {
  }

  static propTypes = {
  }

  componentDidMount() {
  }

  submit = async values => {
    const result = await createAudio(values);
    if (result.id) {
      message.success('创建成功！');
      this.props.history.push('/audio/index');
    }
  }

  render() {
    return (
      <div id="audio_create">
        <h1>创建新的音乐</h1>
        <AudioFrom submit={this.submit.bind(this)}/>
      </div>
    );
  }
}

export default connect(state => ({
}), {
  })(AudioCreate);
