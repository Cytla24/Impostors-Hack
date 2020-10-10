import React from "react";

class Gallery extends React.Component {
  renderImage(imageUrl) {
    return (
      <div>
        <img src={imageUrl} style={{ height: '300px',float:"left"}}/>
      </div>
    );
  }

  render() {
    return (
      <div className="gallery">
        <div className="images" >
          {this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl))}
        </div>
      </div>
    );
  }
}

export default Gallery;