import React, { useContext, useState } from 'react';
import MyState from '../../context/data/myState';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Description, Field, Label, Textarea } from '@headlessui/react';
import clsx from 'clsx';
import myContext from '../../context/data/myContext';
const Note = () => {
  const context = useContext(myContext);
  const { addNotes, noteData, note, setNote, noteTitle, setNoteTitle } = context

  const user = JSON?.parse(localStorage?.getItem('user'))
  const navigate = useNavigate()
  return (
    <div className='p-2 '>
      {/* Note : ethire kn hebo na loko mane nijaro note debe " jemiti kali a product ku order karibaro achi". jebe se date asibo user ku notification jibo ki aji a note ra date asegala */}
      {/* for mobile */}
      <div className='flex flex-col items-center justify-center w-screen h-auto pt-6 bg-slate-200'>
        <div className='flex flex-col items-center justify-start w-screen gap-10 mx-auto border-2 rounded-lg '>
          {/* {error && <p className='text-red-500'>{error}</p>} */}
          <form onSubmit={addNotes} className='flex flex-col items-center justify-center w-auto h-auto gap-5'>
            <input
              value={noteTitle}
              onChange={(e) => { setNoteTitle(e.target.value) }}
              placeholder='Note Title'
              className='placeholder:pl-2 pl-2 h-[3rem] w-[80vw] bg-slate-50 rounded-[0.3rem]'
              type="text"
            />
            {/* For laptop Description box*/}
            <div className='hidden lg:flex justify-center items-center flex-col h-auto w-[80vw] bg-white-0'>
            <Field className='w-[80vw] h-auto flex flex-col'>
                <Label className="text-sm font-medium text-black">Description</Label>
                <Description className="text-sm text-black/50">This will be shown under the Note Description.</Description>
                <Textarea
                  value={note}
                  onChange={(e) => { setNote(e.target.value) }}
                  className={clsx(
                    'mt-3 block w-[80vw] resize-none rounded-lg border-none bg-white py-1.5 px-3 text-sm text-slate-900',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500'
                  )}
                  rows={10}
                />
              </Field>
            </div>
            {/* For mobile Description box */}
            <div className="w-[80vw] lg:hidden flex max-w-md px-4">
              <Field className='w-[80vw] h-auto flex flex-col'>
                <Label className="text-sm font-medium text-black">Description</Label>
                <Description className="text-sm text-black/50">This will be shown under the Note Description.</Description>
                <Textarea
                  value={note}
                  onChange={(e) => { setNote(e.target.value) }}
                  className={clsx(
                    'mt-3 -ml-4 block w-[80vw] resize-none rounded-lg border-none bg-white py-1.5 px-3 text-sm text-slate-900',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500'
                  )}
                  rows={10}
                />
              </Field>
            </div>
            <button type="submit" className='h-[3rem] w-[80vw] mb-5 bg-gradient-to-r from-sky-400 to-green-500 text-white rounded-md'>Add Note</button>
            <div onClick={()=>{ navigate('/All-Notes')}} className='h-auto cursor-pointer text-sky-700 bg-white-0 -mt-[2rem] w-[80vw] mb-5 flex justify-end items-start'>View all notes</div>
            {/* /All-Notes */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Note
