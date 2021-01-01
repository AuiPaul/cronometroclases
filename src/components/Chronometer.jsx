 




import React, { Component } from 'react';

import { generate as id } from 'shortid'

import styled from 'styled-components'



const Elboton = styled.button`
  padding: .5rem .8rem;
  border:none;
  outline:none;
  margin-right:1rem;
  margin-bottom:1rem;
  color: ${({ disabled }) => disabled ? '#DADADA' : '#fff'} ;
  background-color: ${({ disabled }) => disabled ? 'rgb(167,167,167)' : '#66bfbf'} ;
/* transiciones  */
  transition:color,background-color  .5s;
  border: solid 3px #056674;
  border-radius: 2em;
  box-shadow: 4px 4px 4px rgb(167,167,167);
  letter-spacing:1px;

  &:hover{
    color:#fff;
    
    background-color: #056674;    
  }
`
const Unalista = styled.ul`
  list-style:none;
  padding-left:0;
   

  font-family: 'Montserrat', sans-serif;  
  color:#ff4b5c;
    font-size: 2rem;
`
const NumCrono = styled.h1`
color:#ff4b5c;
/* font-family: 'Goldman', cursive; */
text-shadow:none;

`

class Chronometer extends Component {

    state = {
        horas: 0,
        minutos: 0,
        segundos: 0,
        milisegundos: 0,
        running: false,
        allTimestamps: [],
        started: false
    }

    //Función que se llama con el boton start
    handleStartClick = () => {
        if (!this.state.running) {
            this.interval = setInterval(() => {
                this.tick()
            }, 100)

            this.setState({ running: true, started: true })
        }
    }

    //Conteo del cronómetro
    tick() {
        let horas = this.state.horas
        let minutos = this.state.minutos
        let segundos = this.state.segundos
        let milisegundos = this.state.milisegundos + 1

        if (milisegundos === 10) {
            milisegundos = 0
            segundos = segundos + 1
        }

        if (segundos === 60) {
            segundos = 0
            minutos = minutos + 1
        }

        if (minutos === 60) {
            minutos = 0
            horas = horas + 1
        }

        this.updateTimer(horas, minutos, segundos, milisegundos)
    }

    //Función que se llama con el boton stop
    handleStopClick = () => {
        if (this.state.running) {
            clearInterval(this.interval)
            this.setState({ running: false })
        }
    }

    //Función que se llama con el boton timestamp
    handleTimestamp = () => {
        const { horas, minutos, segundos, milisegundos, allTimestamps } = this.state

        const timestamp = { horas, minutos, segundos, milisegundos }

        const timestamps = allTimestamps

        timestamps.push(timestamp)

        this.setState({ allTimestamps: timestamps })

    }

    //Función que se llama con el boton reset
    handleReset = () => {
        this.updateTimer(0, 0, 0, 0)
        this.setState({ allTimestamps: [], started: false })
    }

    //Función de actualización del estado
    updateTimer(horas, minutos, segundos, milisegundos) {
        this.setState({
            horas, minutos, segundos, milisegundos
        })
    }

    addZero(value) {
        return value < 10 ? `0${value}` : value
    }

    render() {
        let { horas, minutos, segundos, milisegundos, running, allTimestamps } = this.state
        horas = this.addZero(horas)
        minutos = this.addZero(minutos)
        segundos = this.addZero(segundos)
        milisegundos = this.addZero(milisegundos)
        return (
            <>  
                <NumCrono>{`${horas}:${minutos} : ${segundos}:${milisegundos}`}</NumCrono>
                <Elboton disabled={running} onClick={this.handleStartClick}> INICIAR </Elboton>
                <Elboton disabled={!running} onClick={this.handleStopClick}> PARAR </Elboton>
                <Elboton disabled={!running} onClick={this.handleTimestamp}> MARCAR TIEMPO </Elboton>
                {this.state.started && <Elboton disabled={running} onClick={this.handleReset}> REINICIAR </Elboton>}

                <Unalista>
                    {allTimestamps.map((timestamp, idx) => (
                        <li key={id()}>
                            {`
                                ${idx + 1} -
                                ${this.addZero(timestamp.horas)} :
                                ${this.addZero(timestamp.minutos)} :
                                ${this.addZero(timestamp.segundos)} :
                                ${this.addZero(timestamp.milisegundos)}
                            `}
                        </li>
                    ))}

                </Unalista>
            </>
        )
    }
}

export default Chronometer;