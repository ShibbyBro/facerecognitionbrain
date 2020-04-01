import React, { Component } from 'react';
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecog from "./components/FaceRecog/FaceRecog";
import Navigation from './components/Navigation/Navigation';
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import './App.css';

const app = new Clarifai.App({
  apiKey: "30ada9b48b5b4383a65b49f17da39624"
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      imageUrl:''
    };
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
      }
    );
  }

  render () {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        {/* need to trigger these above onInputChange with a call in ImageLinkForm.css*/}
        
        <FaceRecog imageUrl={this.state.imageUrl} />

      </div>
    );
  }
}

export default App;
