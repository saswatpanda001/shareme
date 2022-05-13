import React from 'react'
import {BeakerIcon,HeartIcon,MenuIcon,XIcon } from '@heroicons/react/solid'

const Navbar = () => {
  return (
    <div className='w-screen  h-[80px] x-10 bg-purple fixed drop-shadow-lg'>
        Navbar
    <div></div>
            <BeakerIcon className="h-10 w-10 text-gray-800"/>
            <HeartIcon className="h-10 w-10 text-gray-800"/>
            <MenuIcon className="h-10 w-10 text-gray-800"/>
            <XIcon className="h-10 w-10 text-gray-800"/>
            <h1></h1>
    </div>
  )
}


export default Navbar