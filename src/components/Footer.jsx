import React from 'react'
import {InstagramOutlined, GithubOutlined, LinkedinOutlined, WhatsAppOutlined} from '@ant-design/icons'

const Footer = () => {
  return (
    <div className='w-full mt-4 border-t-2 border-gray-400 py-4 text-center flex flex-col bg-black'>
        <h1>&copy; 2022. Design By Wandy</h1>
        <div className='flex justify-center gap-4 items-center'>
          <a href="https://github.com/wandywahidin" rel="noopener noreferrer" target="_blank">
            <GithubOutlined className='text-gray-300 hover:scale-125 duration-300' size={30}/>
          </a>
          <a href="https://www.instagram.com/wandywahidin/" rel="noopener noreferrer" target="_blank">
            <InstagramOutlined className='text-gray-300 hover:scale-125 duration-300' size={30}/>
          </a>
          <a href="https://www.linkedin.com/in/wandy-wahidin/" rel="noopener noreferrer" target="_blank">
            <LinkedinOutlined className='text-gray-300 hover:scale-125 duration-300' size={30}/>
          </a>
          <a href="https://wa.me/6287725499208?text=Hallo,%20Saya%20tertarik%20dengan%20profil%20anda" rel="noopener noreferrer" target="_blank">
            <WhatsAppOutlined className='text-gray-300 hover:scale-125 duration-300' size={30}/>
          </a>
        </div>
    </div>
  )
}

export default Footer