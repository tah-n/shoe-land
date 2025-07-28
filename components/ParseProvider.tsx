'use client'
import React, { useEffect } from 'react'
import Parse from 'parse';


const ParseProvider = () => {
      const appId = process.env.NEXT_PUBLIC_APP_ID as string;
      const jsKey = process.env.NEXT_PUBLIC_JS_KEY as string;
      const server = process.env.NEXT_PUBLIC_SERVER_URL as string;
    
      function initializeParse() {
      Parse.initialize(appId,jsKey);
      Parse.serverURL = server;
    }
    
    useEffect(() => {
      initializeParse;
    }, []);
    
  return null
}

export default ParseProvider
