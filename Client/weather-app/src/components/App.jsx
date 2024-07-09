import { useState } from 'react'
import Search from './Search'
import Navbar from './Navbar'



function App() {

  return (
    <>
    <div className='h-screen'>
    < Navbar />
      <div className='h-4/5 flex w-full justify-center'>
      <Search/>
      </div>
    </div>
    
      
    </>
  )
}

export default App
