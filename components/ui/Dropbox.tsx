'use client'
import React from 'react'

const Dropbox = ({setState}: {
    setState: (flase: boolean) => void;
}) => {
  return (
    <div className='fixed top-0 z-40 backdrop-blur-3xl w-screen h-screen' onClick={() => setState(false)} />
  )
}

export default Dropbox
