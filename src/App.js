import React from 'react';
import './App.css';
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys:[]
  }

  componentDidMount(){
      fetch('http://localhost:3001/toys')
      .then(res=>res.json())
      .then(data=>{
        this.setState({
          toys: data
        })
      })
  }

  postToy=(newToy)=>{
    let configToy={
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(newToy)
    }
    fetch('http://localhost:3001/toys',configToy)
    .then(res=>res.json())
    .then(postedToy=>{
      this.setState({
        toys: [...this.state.toys, postedToy]
      })
    })
  }

  donateToy=donatedToy=>{
    let configDonation = {
      method: 'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    }
    let toyUrl = `http://localhost:3001/toys/${donatedToy.id}`
    fetch(toyUrl,configDonation)
    .then(res=>res.json())
    .then(req=>{
      this.setState({
        toys: this.state.toys.filter(toy=> toy.id !== donatedToy.id)
      })
    })
  }

  likeToy=(likedToy)=>{
    let configToy={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(likedToy)
    }
    let toyUrl = `http://localhost:3001/toys/${likedToy.id}`
    fetch(toyUrl,configToy)
    .then(res=>res.json())
    .then(updatedToy=>{
      this.setState({
        toys: this.state.toys.map(toy=> toy.id===updatedToy.id? updatedToy : toy)
      })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm postToy={this.postToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} donateToy={this.donateToy} likeToy={this.likeToy}/>
      </>
    );
  }

}

export default App;
