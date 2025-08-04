'use client'
import React, { useEffect, useState } from 'react'
import Button from './Button';
import Inputs from './Inputs';
import Footprints from './Footprints';
import CloseButton from './ui/CloseButton';
import { Parse , initParse } from '@/lib/parse';
import useProps from '@/lib/useProps';
import emailjs from '@emailjs/browser';
import Loading from './ui/Loading';
import VerificationCode from './VerificationCode';
import { toast } from 'react-toastify';

type Sign = {
    type: 'signin' | 'signup';
    setState: (value: boolean) => void;
}

const SignForms = ({type,setState}: Sign) => {
    const typeClass = type === 'signin' ? '': '';
    const baseClass = 'fixed top-0 text-1 bg-2 font-dirooz w-full h-full sm:w-[60vw] sm:h-[80vh] lg:w-[50vw] lg:h-[85vh] left-1/2 -translate-x-1/2 overflow-hidden sm:top-1/2 sm:-translate-y-1/2 border border-1 rounded-xl z-50 flex items-center justify-center flex-col gap-1';
    const [name,setName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_USER_ID as string;
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString(); 
    const templateParams = {
      name: name,
      code: randomCode,
      email: email,
    };
    const [loading,setLoading] = useState(false);
    const [showVerificationPage,setShowverificationPage] = useState(false);
    const {enteredCode} = useProps();
    const setOpenSignIn = useProps(state => state.setOpenSignInForm);
    const setCurrentUser = useProps(state => state.setCurrentUser)
 
    useEffect(() => {
      initParse()
    },[]);


    // validate the password 
    const validatepwd = (pwd: string) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return regex.test(pwd);
    }

    // validate email
    const validateEmail = (email: string) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    }

    //send verification email
    const sendVerificationEmail = async(params: {
      name: string;
      email: string;
      code: string;
    }) => {
      try {
        const res = await emailjs.send(serviceId,templateId,params,publicKey);
      } catch(err) {
        console.log(err);
      }
    }

    // create account
    const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(type === 'signin') return;

      else if(!validatepwd(password)) return useProps.getState().setShowWarningPwd(true);
      else if(!validateEmail(email)) return alert('email invalid');

      else if(name !== '' && lastName !== '' && email !== '' && password !== '') {
        console.log('sending')


        const user = new Parse.User();
        user.set("name", name);
        user.set("lastName", lastName);
        user.set("email", email);
        user.set("username",email);
        user.set("password", password);
        user.set("cart", []);
        user.set("verifiedEmail", false);
        user.set("verificationCode", randomCode);

        setLoading(true);
        
        try {
          const userAdded = await user.signUp();
          console.log(userAdded);
          sendVerificationEmail(templateParams);
          setShowverificationPage(true);
        } catch(err: any) {
          console.log(err.message);
          toast.error(err.message);
          throw err;
        } finally {
          setLoading(false)
        }
        
    }
  }

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(type === 'signup') return;

      else if(email !== '' && password !== '') {
        setLoading(true);
        console.log('logging in');
        try {
          const user = await Parse.User.logIn(email,password);
          const isValid = user.get('verifiedEmail');
          const getCode = user.get('verificationCode');
          const getName = user.get('name');
          const getEmail = user.get('email');

          if(isValid) {
            toast.success('خوش آمدید');
            setCurrentUser(user);
            setOpenSignIn(false);
          } else {
            toast('حساب شما تایید نشده است. لطفا ایمیل خود را بررسی کنید');
            const newTemplateParams =  {
            name: getName,
            code: getCode,
            email: getEmail,
          };
          sendVerificationEmail(newTemplateParams);
          setShowverificationPage(true);
          }
    
        } catch (err: any) {
          console.log(err.message);
          toast.error(err.message);
          throw err;
        } finally {
          setLoading(false);
        }
      } else {
        toast('لطفا ایمیل و پسوورد را به درستی وارد کنید')
      }
    }

    useEffect(() => {
      const verifyCode = async () => {
        if(enteredCode === '') return;

        const currentUser = await Parse.User.currentAsync();
        console.log(currentUser);
        if(!currentUser) return;

        const codeInDB = currentUser.get('verificationCode') as string;
      

        if(enteredCode === codeInDB) {
          currentUser.set('verifiedEmail', true);

          try {
            await currentUser.save();
            toast('ایمیل با موفقیت تایید شد')
            setShowverificationPage(false);
            if(type === 'signup') useProps.getState().setOpenSignUpForm(false);
            if(type === 'signin') useProps.getState().setOpenSignInForm(false);
          } catch (err) {
            console.log(err);
          }
        } else {
          toast('لطفا کد صحیح را وارد کنید')
        }

      }

      verifyCode();
    },[enteredCode])
    

    
  return (
    <div className={`${baseClass} ${typeClass}`}>
      {/* close button */}
      <CloseButton setState={setState} />

      
    {showVerificationPage? <VerificationCode name={name} email={email} /> : (
        <>
            {/* form based on signin signup */}
          <p className='font-roya text-5xl font-bold text-1 pointer-events-none'>
            {type === 'signin' ? 'ورود': 'ساخت حساب'}
          </p>
          <div className='w-full h-auto pt-[5rem]'>
            <form
                className='w-full flex flex-col gap-5 items-center justify-center' 
                action=""
                onSubmit={type === 'signin'? signIn : createAccount}
                >
                {type === 'signup' && (
                    <>
                        <Inputs type='text' label={'نام'} onChange={(e) => setName(e.currentTarget.value)} value={name} />
                        <Inputs type='text' label={'نام خانوادگی'} onChange={(e) => setLastName(e.currentTarget.value)} value={lastName} />
                    </>
                )}
                <Inputs type='email' label={'ایمیل(نام کاربری)'} onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
                <Inputs type='password' label={'رمز عبور'} onChange={(e) => setPassword(e.currentTarget.value)} value={password} warningText='رمز عبور باید حداقل 8 کاراکتر شامل حروف بزرگ و کوچک و عدد باشد.'/>
                <Button btnClass='mt-5' btnType='submit' disabled={loading && true}>
                  {loading? <Loading /> : (type === 'signin' ? 'ورود': 'ثبت نام')}
                </Button>
            </form>
          </div>
        </>
      )}
    
      
      {/* bg footprints */}
      <Footprints />

    
    </div>
  )
}

export default SignForms;
