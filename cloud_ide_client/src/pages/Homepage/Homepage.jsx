import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavBar from '../../components/NavBar';
import Hero from '../../components/homepage/Hero';
import Footer from '../../components/Footer';

const Homepage = () => {
    return (
        <div className=''>
            <div className='border-b border-gray-700'>
                <NavBar />
            </div>
            <div className='2xl:h-max'>
                <Hero/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>

    )
}

export default Homepage