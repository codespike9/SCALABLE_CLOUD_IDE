import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col 2xl:flex-row justify-center bg-black text-white font-display 2xl:h-4/5 h-auto 2xl:py-20'>
        {/* Left Section */}
        <div className="flex flex-col py-16  2xl:py-28 2xl:px-20 w-full 2xl:w-1/2 gap-5 text-center 2xl:text-left">
            <span className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold'>
                <span className='text-gray-600 text-3xl sm:text-4xl md:text-5xl'>Code In JavaScript</span> Anywhere
            </span>
            <span className="text-sm sm:text-base md:text-lg">
                Welcome to AeroIDE, the cutting-edge web application for remote JavaScript development.
            </span>
            <span className='border rounded border-white py-2 px-2 hover:-translate-y-1 w-fit mx-auto 2xl:mx-0'>
              <span className='font-semibold'>Get started</span> ---It's free
            </span>
        </div>

        {/* Right Section */}
        <div className='w-full 2xl:w-1/2 flex justify-center items-center py-4 sm:p-8 text-black'>
          <div className="px-3 bg-orange-100 w-full h-auto max-w-screen-md 2xl:max-h-max border rounded-3xl">
            {/* Editor Header */}
            <div className="border-b border-gray-500 p-2">
              <center>JavaScript</center>
            </div>

            {/* Code Example */}
            <div className='flex gap-1 mt-2'>
              <div className='flex flex-col'>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
                <div>-</div>
              </div>
              <div>
                <span className='text-xs sm:text-sm'>console.log('Hello World')</span>
              </div>
            </div>

            {/* Console Output */}
            <div className="bg-black w-full text-white text-xs sm:text-sm py-3 px-2 h-1/5">
              <span>Hello World</span>
            </div>

            {/* Footer */}
            <div className='border-t border-gray-500 mt-2 w-full p-1 text-center'>
              <span>Aero IDE</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero
