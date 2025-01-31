import React from 'react'
import Header from '~/components/header'
import RegisterForm from '~/components/registerForm'

const Register = () => {
  return (
    <div>
      <Header/>
      <div className='flex items-center justify-center'><RegisterForm /></div>
    </div>
  )
}

export default Register