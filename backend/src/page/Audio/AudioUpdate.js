import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import AudioFrom from './_Form';
import { getAudio, updateAudio } from '../../api/audio';

class AudioUpdate extends Component {
  state = {
    id: '',
    audioModel: {}
  }

  static propTypes = {
  }

  async componentWillMount() {
    let id = Number(this.props.match.params.id);
    let audioModel = await getAudio(id);
    this.setState({ audioModel, id })
  }

  componentDidMount() {
  }

  async submit(audioModel) {
    let result = await updateAudio(this.state.id, audioModel);
    if (result.id) {
      message.success('更新成功！');
      this.props.history.push('/audio/index');
    }
  }

  render() {
    return (
      <div id="audio_update">
        <h1>更新音乐</h1>
        <AudioFrom submit={this.submit.bind(this)} audioModel={this.state.audioModel} />
      </div>
    );
  }
}


export default connect(state => ({
}), {
})(AudioUpdate);
