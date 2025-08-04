'use client'
import { initParse } from '@/lib/parse'
import React, { useEffect } from 'react'

const InitializeParse = () => {

    useEffect(() => {
        initParse()
    },[])

  return null
}

export default InitializeParse
