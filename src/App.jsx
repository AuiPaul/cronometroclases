import React, { Component } from 'react'

import Chronometer from './components/Chronometer'

import { createGlobalStyle } from 'styled-components' 

const GlobalStyle = createGlobalStyle` 
body{
  background-color:#e0ece4;
  color: #056674;   
  ${'' /* color:#ff4b5c; */}
  text-align:center;
  margin:0;
  

  
}
h1{
    ${'' /* whidt:100%; */}

  font-family: 'Montserrat', sans-serif;  
    ${'' /* background-color:#66bfbf; */}
    ${'' /* padding:0; */}
    font-size: 3rem;
    ${'' /* margin:0; */}
    
    text-shadow: 4px 4px 4px rgb(167,167,167);

}

`

class App extends Component {

    render() {
        return (
            <>
                <GlobalStyle/> 
                <h1>Cronometro</h1>
                <Chronometer /> 
            </>
        )
    }
}


export default App;