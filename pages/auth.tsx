'use client'
import { ChangeEvent, useCallback, useState } from "react";
import Input from "../components/inputs";
import Axios from "axios";
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';



const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [varient, setVarient] = useState('login');

  const toggleVarient = useCallback(() => {
    setVarient((currentVarient)=> currentVarient==='login' ? 'register' : 'login')
  },[])
  
  const login = useCallback(async () => {
    try {
       await signIn ('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/profiles'
       });
    } catch (error) {
       console.log(error)
    }
  },[email, password]);


  const register = useCallback (async () => {
    try {
      await Axios.post('/api/register', {
        email,
        name,
        password
      });
      callbackUrl: '/profiles'

      login();
    } catch (error) {
      console.log(error);
    }
  },[email, name, password]);

    return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
       <nav className="px-12 py-5">
         <img src="/images/logo.png" alt="logo" className="h-10"></img>
       </nav>
       <div className="flex justify-center">
        <div className="bg-black bg-opacity-70 px-16 py-10 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
        <h2 className="text-white text-4xl mb-8 font-semibold">
            {varient=="login" ? "Sign in" : "Register"}
          </h2>
          <div className="flex flex-col gap-4">
           {varient === "register" ? 
           <Input
            value={name} 
            label="Username"
            id="name"
            onChange={(e : ChangeEvent<HTMLInputElement>)=>{setName(e.target.value)}}
            /> : null}
           <Input
             value={email} 
             label="Email"
             id="Email"
             onChange={(e : ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}
           />
           <Input
             value={password} 
             type="password"
             label="Password"
             id="password"
             onChange={(e : ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}}
           />
          </div>
          <button onClick={varient=== "login" ?login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-6 hover:bg-red-700">
            {varient === "login" ? "login" : "Sign up"}
          </button>
          <div className="flex flex-row items-center gap-4 mt-6 justify-center">
           <div 
               onClick={() => signIn('google', { callbackUrl: '/profiles' })} 

               className="
                  w-9
                  h-9
                  rounded-full
                  bg-black
                  cursor-pointer
                  items-center
                  justify-center
                  hover:opacity-80
                  transition
                ">
               <FcGoogle size={40}/>
           </div>
           <div
               onClick={() => signIn('github', { callbackUrl: '/profiles'})} 
               className="
                  w-9
                  h-9
                  rounded-full
                  bg-white
                  cursor-pointer
                  items-center
                  justify-center
                  hover:opacity-80
                  transition
                ">
               <FaGithub size={40}/>
           </div>
          </div>
          <p className="text-neutral-500 mt-2">
            {varient === "login" ? "First time using Netflix?" : "Already have an account?"}
            <span onClick={toggleVarient} className="text-white text-sm ml-1 hover:underline cursor-pointer">
            {varient === "login" ? "Create an account" : "Sign in"}
            </span>
          </p>
        </div> 
       </div>
      </div>
    </div>
  );
}

export default Auth;
