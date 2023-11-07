import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,GoogleAuthProvider,signInWithPopup,GithubAuthProvider } from "firebase/auth";
import app from './firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {EyeIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2'


const Registration = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleSignUp = (event) =>{
        event.preventDefault();
        const email = event.target.email.value;
        const createPassword = event.target.createPassword.value;
        const confirmPassword = event.target.confirmPassword.value;
        if(createPassword !== confirmPassword){
            toast('does not match password...try again ')
            return ;
        }
        // console.log(confirmPassword);
         if(!/(?=.*?[A-Z])/.test(confirmPassword)){
            toast('at least one uppercase letter required');
            return;
        }
        else if(!/(?=.*?[a-z])/.test(confirmPassword)){
            toast('at least one lowercase letter required');
            return;
        }
        else if(!/(?=.*?[0-9])/.test(confirmPassword)){
            toast('at least one digit required');
            return;
        }
        else if(!/(?=.*?[#?!@$%^&*-])/.test(confirmPassword)){
            toast('at least one special character required');
            return;
        }
        else if(!/(.{8,})/.test(confirmPassword)){
            toast('Minimum eight in length required');
            return;
        }
        




        createUserWithEmailAndPassword(auth, email, confirmPassword)
  .then((result) => {
    toast("successfully registration!");
    const user = result.user;
    emailVerification(user);
    
  })
  .catch((error) => {
    toast(error.message);
    
  });

  const emailVerification = (user) =>{
    sendEmailVerification(user)
    .then(() => {
        toast('plz verify your email')
      });
      
  }

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
    const [eye2,setEye2] = useState(false);
    return (
        <div className='flex  justify-center items-center mx-auto'>
            <div className='text-center '>
            <h1 className='font-bold text-3xl my-10'>Sign Up</h1>
            <form onSubmit={handleSignUp} className='flex flex-col gap-5'>
            <input type="email" name='email' required placeholder="Enter your email" className="input input-bordered input-info w-full max-w-xs" />

            <div className='flex items-center'>
            <input type={eye?"text":"password"} name='createPassword' required placeholder="Create your password" className="input input-bordered input-info w-full max-w-xs" />
            <p onClick={()=>setEye(!eye)} className='-ml-8 cursor-pointer'><EyeIcon className="h-6 w-6 text-blue-500" /></p>
            </div>

            <div className='flex items-center'>
            <input type={eye2?"text":"password"} name='confirmPassword' required placeholder="Confirm your password" className="input input-bordered input-info w-full max-w-xs" />
            <p onClick={()=>setEye2(!eye2)} className='-ml-8 cursor-pointer'><EyeIcon className="h-6 w-6 text-blue-500" /></p>
            </div>


            <button  className="btn btn-active btn-success">Sign Up</button>
            <h1>Already have an acount? <Link className='text-blue-800	font-bold' to='/login'>Sign In</Link></h1>
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

export default Registration;