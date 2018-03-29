import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Icon, Upload, message, Progress } from 'antd';
import uploadFile from '../../public/lib/file-upload';

import './audio-create.scss';
import { FILE_TYPE } from '../../public/lib/constants';
import { IMG_PREFIX, AUDIO_PREFIX } from '../../config';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class AudioCreate extends Component {
  state = {
    previewPosterSrc: '',
    posterLoading: false,

    previewAudioSrc: '',
    audioLoading: false,
    audioUploadPercent: 0,
  }

  static propTypes = {
  }

  componentDidMount() {
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    // 音频上传
    const beforeUploadAudio = file => {
      const limit = file.size / 1024 / 1024 < 20;
      if (!limit) {
        message.error('请上传小于20M的音频！');
      }
      return limit;
    };
    const uploadAudio = async data => {
      this.setState({
        audioLoading: true,
      });

      let observable = await uploadFile(data.file, FILE_TYPE.AUDIO.default, false);
      let _this = this;

      observable.subscribe({
        next(res) {
          _this.setState({
            audioUploadPercent: Math.floor(res.total.percent)
          });
        },
        complete(res) {
          res.fullUrl = AUDIO_PREFIX + res.key;
          _this.setState({
            audioLoading: false,
            previewAudioSrc: res.fullUrl,
          });
          _this.props.form.setFieldsValue({
            audio: res.key,
          });
        },
        error(err) {
          console.error(err);
        }
      });

    };

    // 封面上传
    const beforeUploadPoster = file => {
      const limit = file.size / 1024 / 1024 < 2;
      if (!limit) {
        message.error('请上传小于2M的图片！');
      }
      return limit;
    };
    const uploadPoster = async data => {
      this.setState({
        posterLoading: true,
      });
      let observable = await uploadFile(data.file, FILE_TYPE.IMG.musicPoster);
      let _this = this;

      observable.subscribe({
        next(res) {
        },
        complete(res) {
          res.fullUrl = IMG_PREFIX + res.key;
          _this.setState({
            posterLoading: false,
            previewPosterSrc: res.fullUrl
          });
          _this.props.form.setFieldsValue({
            poster: res.key
          });
        },
        error(err) {
          console.error(err);
        }
      });
    };

    return (
      <div id="audio_create">
        <h1>创建新的音乐</h1>

        <Form className="create-audio-form" layout="horizontal" onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题！', whitespace: true }],
            })(
              <Input placeholder="标题O(∩_∩)O题标"/>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="asmr音频文件">
            {getFieldDecorator('audio', {
              rules: [{ required: true, message: '请上传音频！', whitespace: true }],
            })(
              <div className="clearfix">
                <Upload name="audio" className="audio-uploader" accept="audio/*" showUploadList={false} beforeUpload={beforeUploadAudio} customRequest={uploadAudio}>
                  <Button>
                    <Icon type={this.state.audioLoading ? 'loading' : 'upload'} /> 上传
                  </Button>
                </Upload>
                { this.state.audioLoading ? <Progress percent={this.state.audioUploadPercent} /> : '' }
                { this.state.previewAudioSrc ? <audio controls className="asmr-audio-player" src={this.state.previewAudioSrc}></audio> : '' }
              </div>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="封面照片">
            {getFieldDecorator('poster', {
              rules: [{ required: true, message: '请上传封面！', whitespace: true }],
            })(
              <Upload name="poster" listType="picture-card" className="poster-uploader" accept="image/*" showUploadList={false} beforeUpload={beforeUploadPoster} customRequest={uploadPoster}>
                {
                  this.state.previewPosterSrc
                    ? <img src={this.state.previewPosterSrc} alt="" />
                    : (<div>
                      <Icon type={this.state.posterLoading ? 'loading' : 'plus'} />
                      <div className="ant-upload-text">Upload</div>
                    </div>)
                }
              </Upload>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="简介">
            {getFieldDecorator('desc', {
              rules: [{ required: true, message: '请输入简介！', whitespace: true }],
            })(
              <TextArea placeholder="请输入一段简短有力的简介✧(≖ ◡ ≖✿)" />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="来源">
            {getFieldDecorator('origin', {
              rules: [{ whitespace: true }],
            })(
              <Input placeholder="如非原创请注明来源" />
            )}
          </FormItem>

          <FormItem wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedAudioCreate = Form.create()(AudioCreate);

export default connect(state => ({
}), {
  })(WrappedAudioCreate);
