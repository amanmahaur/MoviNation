import React from 'react'
import { useState,useEffect } from 'react';
import Loading from '../Loading/Loading';
import Horror from '../carousels/Horror/Horror';
import Trending from '../carousels/Trending/Trending';
import Action from '../carousels/Action/Action';
import Romance from '../carousels/Romance/Romance';
export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading process (e.g., fetching data, etc.)
        setTimeout(() => {
            setLoading(false);  // Set loading to false after 3 seconds
        }, 1000);
    }, []);
  
    if (loading) {
        return <Loading />;  // Show loading spinner if still loading
    }

  return (
    <div>
      
       <Trending/>
       <Action/>
       <Horror/>
       <Romance/>
    </div>
  )
}
