 

import React, { useState ,useEffect} from 'react';

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

const Chronometer = () => { 



    const [clock,setClock] = useState ({
        horas: 0,
        minutos: 0,
        segundos: 0,
        milisegundos: 0
    })



    const [running,setRunnig] = useState(false)
    const [allTimestamps,setAllTimestamps] = useState([])
    const [started,setStarted] = useState(false)
    
  

 
    //Función que se llama con el boton start
    
    useEffect (() => {
        if (running) {
            const interval = setInterval (()=>{
                tick()
            },100 )

            return () => clearInterval(interval)
        }
        
        
    }, [running,clock ]);


    const  handleStartClick = () => {
        if ( !running) {        
            setRunnig (true)
            setStarted(true)            
        }
    }

    //Conteo del cronómetro
   const tick = () => {
        let  {horas,minutos,segundos,milisegundos} = clock
        milisegundos = milisegundos + 1

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

        updateTimer(horas, minutos, segundos, milisegundos)
    }

    //Función que se llama con el boton stop
 const   handleStopClick = () => {
        if ( running) {    
                              
            setRunnig(false)
        }
    }

    //Función que se llama con el boton timestamp
    const  handleTimestamp = () => {
       

        const timestamp = {
        horas : clock.horas,
        minutos :clock.minutos, 
        segundos: clock.segundos, 
        milisegundos:clock.milisegundos }

    
       setAllTimestamps([
            ...allTimestamps,
            timestamp

       ])

    }

    //Función que se llama con el boton reset
   const  handleReset = () => {
        updateTimer(0, 0, 0, 0)
         setAllTimestamps ([])
         setStarted(false)
         
    }

    //Función de actualización del estado
   const updateTimer = (horas, minutos, segundos, milisegundos) =>{
        setClock( {horas, minutos, segundos, milisegundos})
    }

   const addZero = (value) => (
         value < 10 ? `0${value}` : value
    )

    
        let { horas, minutos, segundos, milisegundos } = clock
        horas = addZero(horas)
        minutos = addZero(minutos)
        segundos = addZero(segundos)
        milisegundos = addZero(milisegundos)
        return (
            <>  
                <NumCrono>{`${horas}:${minutos} : ${segundos}:${milisegundos}`}</NumCrono>
                <Elboton disabled={running} onClick={handleStartClick}> INICIAR </Elboton>
                <Elboton disabled={!running} onClick={handleStopClick}> PARAR </Elboton>
                <Elboton disabled={!running} onClick={handleTimestamp}> MARCAR TIEMPO </Elboton>
                {started && <Elboton disabled={running} onClick={handleReset}> REINICIAR </Elboton>}

                <Unalista>
                    {allTimestamps.map((timestamp, idx) => (
                        <li key={id()}>
                            {`
                                ${idx + 1} -
                                ${addZero(timestamp.horas)} :
                                ${addZero(timestamp.minutos)} :
                                ${addZero(timestamp.segundos)} :
                                ${addZero(timestamp.milisegundos)}
                            `}
                        </li>
                    ))}

                </Unalista>
            </>
        )
    }


export default Chronometer;

