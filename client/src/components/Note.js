import React from 'react'

export const Note = () => {
    let offsetX, offsetY;

    const move = (e) => {
        const el = e.target
        el.style.left = `${e.pageX - offsetX}px`
        el.style.top = `${e.pageY - offsetY}px`
    }

    const mousePressed = (e) => {
        const element = e.target
        offsetX = e.clientX - element.getBoundingClientRect().left
        offsetY = e.clientY - element.getBoundingClientRect().top
        element.addEventListener('mousemove', move)
    }

    const mouseReleased = (e) => {
        const element = e.target
        element.removeEventListener('mousemove', move)
    }
    return (
        <div onMouseDown={mousePressed} onMouseUp={mouseReleased} style={{ "maxWidth": "100px", "minHeight": "100px", "background-color": "black", "position": "absolute", "cursor":"pointer" }}>
            <div style={{"position": "static"}}>
                <h1>TYTUŁ</h1>
                <h2>Lorem ipsum kajsdkjasd kljaskl djklasjdkl ja</h2>
            </div>
        </div>
    )
}