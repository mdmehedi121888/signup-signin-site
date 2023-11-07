import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail, signInWithPopup,GoogleAuthProvider,GithubAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from './firebase.config';
import {EyeIcon } from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'



const Login = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const emailRef = useRef();
    const handleLogin = (event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
        
  .then((result) => {
    const user = result.user;
    if(!user.emailVerified)
    {
        toast('plz verify your email !!')
        return;
    }
// toast('successfully login!!')
Swal.fire({
  title: "Congratulations!",
  text: "You successfully Signin!",
  icon: "success"
});
  })
  .catch((error) => {
    toast(error.message);
  });
    }

const handleResetLink = ()=>{
    const email = emailRef.current.value;
    if(!email){
        toast('plz enter a valid email');
        return;
    }
    sendPasswordResetEmail(auth, email)
    .then(() => {
      toast('password reset email sent')
    })
    .catch((error) => {
      toast(error.message)
    });
}

const handleGoogleBtn = ()=>{
  signInWithPopup(auth, provider)
.then((result) => {
  // toast('successfully login !!')
  Swal.fire({
    title: "Congratulations!",
    text: "You successfully Signin!",
    icon: "success"
  });

}).catch((error) => {
  toast(error.message)
});
      }

      const handleGithubBtn = ()=>{
        signInWithPopup(auth, githubProvider)
      .then((result) => {
        // toast('successfully login !!')
        Swal.fire({
          title: "Congratulations!",
          text: "You successfully Signin!",
          icon: "success"
        });
      
      }).catch((error) => {
        toast(error.message)
      });
            }



    const [eye,setEye] = useState(false);
  
    return (
        <div className='flex  justify-center items-center mx-auto'>
            <div className='text-center '>
            <h1 className='font-bold text-3xl my-10'>Sign In</h1>
            <form onSubmit={handleLogin} className='flex flex-col gap-5'>
            <input type="email" ref={emailRef} name='email' required placeholder="Enter your email" className="input input-bordered input-info w-full max-w-xs" />
            <div className='flex items-center'>
            <input type={eye?"text":"password"} name='password' required placeholder="Enter your password" className="input input-bordered input-info w-full max-w-xs" />
            <p onClick={()=>setEye(!eye)} className='-ml-8 cursor-pointer'><EyeIcon className="h-6 w-6 text-blue-500" /></p>
            </div>
            <button className="btn btn-active btn-success">Sign In</button>
            <h1>Forget password? <Link onClick={handleResetLink} className='text-blue-800	font-bold'>Reset password</Link></h1>
            <h1>Don't have an acount? <Link className='text-blue-800	font-bold' to='/registration'>Sign Up</Link></h1>
            <h1>or you can sign in with</h1>
            </form>
            <button onClick={handleGoogleBtn}>
            <img className='h-14 w-full mt-5' src="https://www.oncrashreboot.com/images/create-apple-google-signin-buttons-quick-dirty-way-google.png"></img>
            </button>
            <br />
            <button onClick={handleGithubBtn}>
            <img className='h-28 w-full' src="https://assets-global.website-files.com/5c2a9a234fdbba7439c48fa4/632cc59b0ce5f831d6ce0c8c_Screen%20Shot%202022-09-22%20at%204.13.26%20PM.jpg"></img>
            </button>
            

        </div>
        </div>
    );
};

export default Login;