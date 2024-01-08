import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import avatar from '../assets/Avatar.jpg';
import styles from '../styles/User.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';

export default function Register() {
/** File upload */
  const [file, setFile] =  useState()

  const formik = useFormik({
    initialValues: {
      email:'Stones@yahoo.com',
      username:'example123',
      password: "admin@123" 
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values =>{
      values = await Object.assign(values, { profile: file || ''})
      console.log(values); 
    }
  })

  /** formik function to handle file upload*/
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

 
  return (
    <div className="container mx=auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex h-screen">
        <div className={styles.glass} /*style={{ width:'45%', paddingTop: '3em' }}*/> 
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Sign Up</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-5'>
              Welcome to our space!! 
            </span> 
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
                <img src={file || avatar} className={styles.profile_img} alt='avatar' />
              </label>

              <input onChange={onUpload} type='file' id='profile' name='profile' />
              
            </div>

            <div className='textbox flex flex-col items-center gap-1'>
              <input {...formik.getFieldProps('email')}className={styles.textbox}type='text' placeholder='Email*' />
              <input {...formik.getFieldProps('username')}className={styles.textbox}type='text' placeholder='Username*' />
              <input {...formik.getFieldProps('password')}className={styles.textbox}type='text' placeholder='Password*' />
              <button className={styles.btn} type='submit'>Register</button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>Already Registered? <Link className='text-red-500' to='/'>Login</Link></span>
            </div> 

          
  

          </form> 
        </div>
      </div>

    </div>
  )
}
 