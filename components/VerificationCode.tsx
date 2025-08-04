'use client'
import React, { useEffect, useState } from 'react'
import Provider from '@/components/ui/chakra-provider';
import { initParse, Parse } from '@/lib/parse'
import { PinInput } from './PinInput';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';


type Props = {
    name: string;
    email: string;
}


const VerificationCode = ({name, email}: Props) => {
    const text = 'لطفا کد ارسال شده به ایمیل را وارد کنید';
    const [sendAgain,setSendAgain] = useState(false);
    const [secondsLeft,setSecondsLeft] = useState(120);
    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_USER_ID as string;
    const [codeInDB,setCodeInDB] = useState('');
    const templateParams = {
      name: name,
      code: codeInDB,
      email: email,
    };


    useEffect(() => {
        if(sendAgain) return

        const interval = setInterval(() => {
            setSecondsLeft(prev => {
                if(prev <= 1) {
                clearInterval(interval);
                setSendAgain(true);
                return 0
            } 
            return prev - 1;
        })
        }, 1000)

        return () => clearInterval(interval)
    },[secondsLeft,sendAgain])

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `0${m} : ${s < 10? '0': ''}${s}`
    }

    useEffect(() => {
        const fetchCode = async () => {
            try{
            const currentUser = await Parse.User.currentAsync();
            console.log(currentUser);
            if(!currentUser) return;

            const codeInDB = currentUser.get('verificationCode') as string;
            console.log(codeInDB)
            setCodeInDB(codeInDB);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCode()
    },[])

    //send verification email
    const sendVerificationEmail = async() => {
      try {
        const res = await emailjs.send(serviceId,templateId,templateParams,publicKey);
        toast('ایمیل ارسال شد')
      } catch(err) {
        console.log(err);
      }
    }

    const handleSendAgain = async () => {
        setSendAgain(false);
        setSecondsLeft(120)
        await sendVerificationEmail()

    }


 
  return (
    <div className='relative w-full h-auto text-lg font-dirooz flex items-center justify-center' dir='rtl'>
        <div className='flex flex-col gap-6 !font-bold !font-dirooz !text-1 !text-lg '>
            <p className=''>
                {text}
            </p>
            <Provider>
                <PinInput />
            </Provider>
            {/* add resend button */}
            <div className='relative w-fit h-fit !text-sm text-1/60'>
                <p>
                    کد را دریافت نکردید.
                    <span className='pr-5' dir='ltr'>
                    {formatTime(secondsLeft)}
                    </span>
                </p>
                 
                <button className={`underline ${sendAgain? '!text-1 cursor-pointer' : '!text-1/50 cursor-not-allowed '}`} disabled={sendAgain? false : true} onClick={handleSendAgain}>
                    ارسال مجدد
                </button>
               
            </div>
        </div>
      
    </div>
  )
}

export default VerificationCode;
