'use client'
import React from 'react'

const Loading = ({className}: {
    className?: string;
}) => {
  return (
      <div className={`loader ${className}`}></div>
  )
}

export default Loading
