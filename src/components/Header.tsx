import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className='container bg-burgundy h-[64px] grid grid-cols-[280px_auto_280px] gap-x-1 items-center'>
        <Image src={"/herkey-logo.svg"} alt="logo" width={89} height={28.48}/>
        <input type="text" placeholder='Search' className='bg-pureWhite rounded-[12px] px-4 py-2 w-[350px] h-[40px] text-black'/>
        <div className='flex items-center gap-4'>
            <p className='text-white'>messaging</p>
            <p className='text-white'>notifications</p>
            <p className='text-white'>me</p>
        </div>
    </header>
  )
}

export default Header