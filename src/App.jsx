import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react'

export default function App() {
  const [Lenght, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  let referencePass = useRef(null);


  const lengthChange = (e) => {
    let newLength = e.target.value;
    setLength(newLength);

  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    numberAllowed ? str = str + "0123456789" : "";
    charAllowed ? str = str + "!@#$%^&*()_+=-{}[];:'?/><" : "";

    for (let i = 1; i <= Lenght; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }
    setPassword(pass);

  }, [Lenght, numberAllowed, charAllowed, setPassword]);

  let copyPasswordToClipBoard = useCallback(() => {
    referencePass.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password])

  useEffect(() => {
    passwordGenerator()
  }, [numberAllowed, charAllowed, length, passwordGenerator])

  return (
    <>
      <div className='h-screen w-screen flex items-center justify-center'>
        <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 text-center'>
          <h2>Password Generator</h2>
          <div className='rounded-lg overflow-hidden mb-4 flex shadow p-6 '>
            <input type="text"
              value={Password}
              ref={referencePass}
              className='outline-none w-full py-2 px-4 mb-2 rounded-md'
              placeholder='Password'
              readOnly
            />
            <button className='outline-none bg-blue-700 text-white w-20 h-10 rounded-lg' onClick={copyPasswordToClipBoard}>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range"
                min={8}
                max={70}
                onChange={(e) => { lengthChange(e) }}
                value={Lenght}
                className='cursor-pointer'
              />
              <label>Lenght:{Lenght}</label>
              <div className='flex gap-x-2 items-center mx-4'>
                <input type="checkbox"
                  defaultChecked={charAllowed}
                  onChange={() => { setCharAllowed((prev) => { return !prev }) }}
                />
                <label htmlFor="charAllowed">Chacters</label>
              </div>

              <div className='flex gap-x-2 mx-4'>
                <input type="checkbox"
                  defaultChecked={numberAllowed}
                  onChange={() => { setNumberAllowed((prev) => { return !prev }) }}
                />
                <label htmlFor="numberAllowed">Numbers</label>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
