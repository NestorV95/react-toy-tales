import React, { Component } from 'react';

class ToyForm extends Component {
  state={
    name: "",
    image: ""
  }

  changeHandler=e=>{
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler=e=>{
    e.preventDefault()
    let newToy={
      name: this.state.name,
      image: this.state.image,
      likes: 0
    }
    this.props.postToy(newToy)
    e.target.reset()
  }

  render() {
    let {name,image} = this.state
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.submitHandler}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" value={name} onChange={this.changeHandler} 
          placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" value={image} onChange={this.changeHandler} 
          placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
