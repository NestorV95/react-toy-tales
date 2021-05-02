import React, { Component } from 'react';

class ToyCard extends Component {

  donateHandler=e=>{
    e.preventDefault()
    this.props.donateToy(this.props.toy)
  }

  likeHandler=e=>{
    e.preventDefault()
    let newLikes = this.props.toy.likes + 1
    let likedToy={
      id: this.props.toy.id,
      likes: newLikes
    }
    this.props.likeToy(likedToy)

  }
  

  render() {
    let {name, image, likes} = this.props.toy
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" onClick={this.likeHandler}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.donateHandler}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
