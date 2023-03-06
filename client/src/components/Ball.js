import React from 'react'
import styled from 'styled-components'


export const Ball=
()=>
{
  let offsetX,offsetY
  const move=e=>
  {
    const el=e.target
    el.style.left = `${e.pageX-offsetX}px`
    el.style.top = `${e.pageY-offsetY}px`
  }
  const add=e=>
  {
    const el=e.target
    offsetX=e.clientX-el.getBoundingClientRect().left
    offsetY=e.clientY-el.getBoundingClientRect().top
    el.addEventListener('mousemove',move)
  }
  const remove=e=>{
    const el=e.target
    el.removeEventListener('mousemove',move)
  }
  const Wrapper=styled.div`
  width: 50px;
  height: 50px;
  border-radius: 29px;
  box-shadow: 0 0 6px;
  position: absolute;
  top: 40px;
  left: 227px;
  background-color: rgb(0,0,0,0.5);
  cursor:pointer;
  `
  return (
    <Wrapper onMouseDown={add} onMouseUp={remove}/>
  )
}