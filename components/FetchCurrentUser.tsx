'use client'
import { initParse, Parse } from '@/lib/parse';
import useProps from '@/lib/useProps'
import React, { useEffect } from 'react'

const FetchCurrentUser = ({children} : {
  children: React.ReactNode
}) => {
  const setCurrentUser = useProps(state => state.setCurrentUser);
  const currentUser = useProps(state => state.currentUser);

  const fetchCurrentUser = async () => {
     try {
        const u = await Parse.User.currentAsync();
        return u;
        // console.log(currentUser);
      } catch (err) {
        console.log(err)
      }

  }

  useEffect(() => {
    initParse();

    fetchCurrentUser().then(u => {
      if(u) setCurrentUser(u)
    })




  },[])

  return <>{children}</>;
}

export default FetchCurrentUser
