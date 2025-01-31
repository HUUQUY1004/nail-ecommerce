import React from 'react'
import Header from '~/components/header'
import LoginForm from '~/components/loginForm'

const Login = () => {
  return (
    <div>
    <Header/>
    <div className='flex items-center justify-center'><LoginForm /></div>
  </div>
  )
}

export default Login