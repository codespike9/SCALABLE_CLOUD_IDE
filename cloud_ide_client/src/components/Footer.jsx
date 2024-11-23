import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We offer a fast and efficient online compiler, supporting various
            programming languages. Code, compile, and debug directly from your
            browser!
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-400">
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Features
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Pricing
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Documentation
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-github"></i> GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-10 pt-5">
        <p className="text-center text-gray-500 text-sm">
          © 2024 Online Compiler. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer