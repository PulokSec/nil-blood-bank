import { IInputType } from '@/types/types'
import React from 'react'


const InputType = ({labelTxt,inputType,id,name,value,onChange,checked}:IInputType) => {
  return (
    <>

        {
            inputType==="radio" ? (
                <label className="flex items-center">
                    <input
                        type={inputType}
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        checked={checked}
                    />
                    <span className="ml-1">{labelTxt}</span>
                </label>
            ) : (
                <>
                    <label className="block text-gray-700 font-bold mb-2 text-[12px]" htmlFor={id}>
                        {labelTxt}
                    </label>
                    <input
                        type={inputType}
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="w-full px-2 py-1 border rounded-md  focus:border-red-500 text-black bg-white placeholder:text-black placeholder:bg-white dark:placeholder:text-black dark:placeholder:bg-white"
                    />
                </>
            )

        }
        
    </>
  )
}

export default InputType