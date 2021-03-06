import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Input, Icon, Upload, message, Progress } from 'antd';
import uploadFile from '../../public/lib/file-upload';

import './_form.scss';
import { FILE_TYPE } from '../../public/lib/constants';
import { fullImgUrl, fullAudioUrl } from '../../public/lib/utils';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class AudioForm extends Component {
  state = {
    previewPosterSrc: '',
    posterLoading: false,

    previewAudioSrc: '',
    audioLoading: false,
    audioUploadPercent: 0,
  }

  static propTypes = {
    audioModel: PropTypes.object,
    submit: PropTypes.func.isRequired
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.audioModel && nextprops.audioModel.poster) {
      this.setState({
        previewPosterSrc: fullImgUrl(nextprops.audioModel.poster)
      });
    }

    if (nextprops.audioModel && nextprops.audioModel.src) {
      this.setState({
        previewAudioSrc: fullAudioUrl(nextprops.audioModel.src)
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.audioLoading || this.state.posterLoading) {
      message.error('请等待封面以及文件上传完成！');
      return;
    }
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.submit(values);
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
          data.onProgress(res.total.percent);
          _this.setState({
            audioUploadPercent: Math.floor(res.total.percent)
          });
        },
        complete(res) {
          data.onSuccess(res);
          res.fullUrl = fullAudioUrl(res.key);
          _this.setState({
            audioLoading: false,
            previewAudioSrc: res.fullUrl,
          });
          _this.props.form.setFieldsValue({
            src: res.key,
          });
        },
        error(err) {
          data.onError(err);
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
          data.onProgress(res.total.percent);
        },
        complete(res) {
          data.onSuccess(res);
          res.fullUrl = fullImgUrl(res.key);
          _this.setState({
            posterLoading: false,
            previewPosterSrc: res.fullUrl
          });
          _this.props.form.setFieldsValue({
            poster: res.key
          });
        },
        error(err) {
          data.onError(err);
          console.error(err);
        }
      });
    };

    return (
      <Form id="audio_form" layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题！', whitespace: true }],
          })(
            <Input placeholder="标题O(∩_∩)O题标" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="作者">
          {getFieldDecorator('author', {
            rules: [{ required: true, message: '请输入作者！', whitespace: true }],
          })(
            <Input placeholder="请输入作者名称" />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="asmr音频文件">
          {getFieldDecorator('src', {
            rules: [{ required: true, message: '请上传音频！', whitespace: true }],
          })(
            <div className="clearfix">
              <Upload name="audio" className="audio-uploader" accept="audio/*" showUploadList={false} beforeUpload={beforeUploadAudio} customRequest={uploadAudio}>
                <Button>
                  <Icon type={this.state.audioLoading ? 'loading' : 'upload'} /> 上传
                </Button>
              </Upload>
              {this.state.audioLoading ? <Progress percent={this.state.audioUploadPercent} /> : ''}
              {this.state.previewAudioSrc ? <audio controls className="asmr-audio-player" src={this.state.previewAudioSrc}></audio> : ''}
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
    );
  }
}

const WrappedAudioForm = Form.create({
  mapPropsToFields(props) {
    let fielsDict = {};
    for (let key in props.audioModel) {
      fielsDict[key] = Form.createFormField({ value: props.audioModel[key] });
    }
    return fielsDict;
  }
 })(AudioForm);

export default connect(state => ({
}), {
})(WrappedAudioForm);
