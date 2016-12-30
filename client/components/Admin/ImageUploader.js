import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: null,
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    const CLOUDINARY_UPLOAD_PRESET = 'iawnzsio';
    const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djgbdzqzh/image/upload';
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.props.handleNewImage(response.body.secure_url);
      }
    });
  }

  render() {
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*"
          >
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFile === null ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </form>
    );
  }
}

module.exports = ImageUploader;
