import React, { useContext, useState, Fragment } from 'react';
import MyState from '../../context/data/myState';
import { useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import MyModal from '../../components/modal/Modal'
import { Dialog, Transition } from '@headlessui/react'
import { Description, Field, Label, Textarea } from '@headlessui/react';
import clsx from 'clsx';
import { AiTwotoneDelete } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import { addDoc, updateDoc, query, orderBy, deleteDoc, collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import { fireDB } from '../../components/firebase/FireabseConfig';
// Import Firebase
import { getFirestore } from "firebase/firestore";
const AllNotes = () => {
    const context = useContext(myContext);
    const { addNotes, noteData, note, setNote, setNoteTitle, noteTitle } = context

    const user = JSON?.parse(localStorage?.getItem('user'))

    const navigate = useNavigate();

    const [add, setadd] = useState(false);

    const [isOpen, setIsOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [active, setActive] = useState(0)
    const [updateNote, setUpdateNote] = useState(active.note)
    const [updateNoteTitle, setUpdateNoteTitle] = useState(active.noteTitle)

    const closeModal = () => {
        setIsOpen(false)
    }

    const closeModalOfAddNotes = () => {
        setadd(false)
    }

    const [productIdx, setProductIdx] = useState();

    const [date, setDate] = useState()

    const updateProductById = async (docId, data) => {

        if (!updateNote || !updateNoteTitle) {
            toast.error("Fill all the field!")
        }

        else {
            const docRef = doc(fireDB, "notes", docId);

            try {
                await updateDoc(docRef, data);
                console.log("Document updated successfully");
                toast.success("Document updated successfully")
            } catch (error) {
                console.error("Error updating document: ", error);
                toast.error("Error updating document: ", error)
            }
        }
    }

    const deleteNote = async (id) => {
        try {
            await deleteDoc(doc(fireDB, 'notes', id));
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error('Error deleting product: ' + error.message);
        }
    };


    return (
        <div>
            <div className=' h-[83vh] w-screen overflow-y-scroll flex flex-col justify-start items-center bg-slate-100'>

                <div className='flex-col items-center justify-center w-screen h-auto gap-4 p-3 '>
                    <div className='flex flex-row items-start justify-start w-screen h-auto gap-2 px-2 py-2 '>
                        <div className='flex flex-row items-center justify-start w-screen h-auto gap-2 px-2 py-2 '>
                            {/* <div className=' h-[3rem] w-[3rem] justify-center items-center flex border-b-2'>Id</div> */}
                            <div className=' h-[3rem] flex-row w-full justify-between items-center flex pl-2 bg-white-0 border-b-2'>
                                <h1>Title</h1>
                                {/* Add Note */}
                                <div onClick={() => { setadd(true) }} className='flex flex-row items-center justify-center w-auto h-auto gap-[1rem] p-2 rounded-full '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Date

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-start w-screen h-auto gap-3'>
                        <h1 className={` ${noteData ? "flex":"hidden"}`}>Plesae refresh the page if there is duplicacy occure.</h1>
                        {
                            noteData?.map((i, idx) => (
                                user?.user?.email === i.userEmail ?
                                    <div onClick={() => { setIsOpen(true); setActive(i); setProductIdx(i.id) }} className={`flex items-center justify-center bg-gradient-to-r to-transparent hover:from-slate-200 from-sky-100 w-[95vw] mx-auto h-auto `} key={i}>
                                        <div className={` h-[4rem] w-full justify-between items-center pl-2 flex  `}>
                                            {/* <h1>{i.noteTitle}</h1> */}
                                            <h1>{i.noteTitle.length > 25 ? i.noteTitle.slice(0, 300) + "..." : i.noteTitle}</h1>
                                            <h1>{i.date}</h1>
                                        </div>
                                    </div> : ""

                            ))
                        }

                    </div>
                </div>

                {/* Modal */}
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <div className="mt-2">
                                            <h1 className='font-semibold text-slate-500'>Title</h1>
                                            <h1 className='pl-1 '>{active.noteTitle}</h1>
                                            <h1 className='mt-2 font-semibold text-slate-500'>Description</h1>
                                            <p className='pl-1 '>
                                                {active.note}
                                            </p>
                                        </div>

                                        <div className="flex flex-row items-center justify-between mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Got it, thanks!
                                            </button>

                                            <div className="flex items-center justify-between gap-2 py-2 text-sm font-medium border border-transparent rounded-md ">
                                                {/* onClick={closeModal} */}
                                                <div onClick={() => { deleteNote(productIdx); setIsOpen(false) }} className='flex items-center justify-center w-auto h-auto px-4 py-2 font-semibold text-black rounded-md hover:bg-red-500 bg-red-500/55 bg-red-000'>
                                                    Delete
                                                </div>
                                                {/* <div  onClick={() => { updateProductById(active, { noteTitle: updateNote, note: updateNote }) }} className='flex items-center justify-center w-auto h-auto px-4 py-2 font-semibold text-white rounded-md hover:bg-black bg-black/55 bg-red-000'> */}
                                                <div onClick={() => { setIsOpen(false); setIsEditOpen(true) }} className='flex items-center justify-center w-auto h-auto px-4 py-2 font-semibold text-white rounded-md hover:bg-black bg-black/55 bg-red-000'>
                                                    Edit
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                {/* Modal for edit */}
                <Transition appear show={isEditOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => { setIsEditOpen(false) }}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <div className="mt-2">
                                            <h1 className='font-semibold text-slate-500'>Title</h1>
                                            {/* <h1 className='pl-1 '>{active.noteTitle}</h1> */}
                                            <input value={productIdx?.noteTitle} onChange={(e) => { setUpdateNoteTitle(e.target.value) }} placeholder={active.noteTitle} className=' h-[3rem] w-full border-2 pl-1 placeholder:pl-1' type="text" />

                                            <div className="w-[80vw] max-w-md px-4">
                                                <Field className='w-[80vw] h-auto flex flex-col'>
                                                    <Label className="mt-1 text-sm font-medium text-black">Description</Label>
                                                    <Description className="text-sm text-black/50">This will be shown under the Note Description.</Description>
                                                    <Textarea
                                                        value={productIdx?.note}
                                                        placeholder={active.note}
                                                        onChange={(e) => { setUpdateNote(e.target.value) }}
                                                        className={clsx(
                                                            'mt-3 bg-slate-50 -ml-4 block w-[80vw] resize-none rounded-lg border-none  py-1.5 px-3 text-sm text-slate-900',
                                                            'focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                        )}
                                                        rows={10}
                                                    />
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center justify-between mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => { setIsEditOpen(false) }}
                                            >
                                                Cancel
                                            </button>

                                            <div className="flex items-center justify-between gap-2 py-2 text-sm font-medium border border-transparent rounded-md ">
                                                <div onClick={() => { updateProductById(productIdx, { noteTitle: updateNoteTitle, note: updateNote }) }} className='flex items-center justify-center w-auto h-auto px-4 py-2 font-semibold text-white rounded-md hover:bg-black bg-black/55 bg-red-000'>
                                                    {/* <div onClick={updateDocument} className='flex items-center justify-center w-auto h-auto px-4 py-2 font-semibold text-white rounded-md hover:bg-black bg-black/55 bg-red-000'> */}
                                                    Edit
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                {/* Modal for add notes */}
                <Transition appear show={add} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModalOfAddNotes}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        {/* <div className="mt-2">
                                            <h1 className='font-semibold text-slate-500'>Title</h1>
                                            <h1 className='pl-1 '>{active.noteTitle}</h1>
                                            <h1 className='mt-2 font-semibold text-slate-500'>Description</h1>
                                            <p className='pl-1 '>
                                                {active.note}
                                            </p>
                                        </div>

                                        <div className="flex flex-row items-center justify-between mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Got it, thanks!
                                            </button>

                                            <div className="flex items-center justify-between gap-2 py-2 text-sm font-medium border border-transparent rounded-md ">
                                                <div onClick={() => {deleteNote(productIdx); setIsOpen(false)}} className='flex items-center justify-center w-auto h-auto px-4 py-2 font-semibold text-black rounded-md hover:bg-red-500 bg-red-500/55 bg-red-000'>
                                                    Delete
                                                </div>
                                                <div onClick={() => { setIsOpen(false); setIsEditOpen(true) }} className='flex items-center justify-center w-auto h-auto px-4 py-2 font-semibold text-white rounded-md hover:bg-black bg-black/55 bg-red-000'>
                                                    Edit
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className='p-0 '>
                                            {/* Note : ethire kn hebo na loko mane nijaro note debe " jemiti kali a product ku order karibaro achi". jebe se date asibo user ku notification jibo ki aji a note ra date asegala */}
                                            {/* for mobile */}
                                            <div className='flex flex-col items-center justify-center w-full h-auto bg-slate-100'>
                                                <div className='flex flex-col items-center justify-center w-full gap-10 p-3 mx-auto border-2 rounded-lg '>
                                                    {/* {error && <p className='text-red-500'>{error}</p>} */}
                                                    <form onSubmit={addNotes} className='flex flex-col items-center justify-center w-auto h-auto gap-5'>
                                                        <h1>Note</h1>
                                                        
                                                        <input
                                                            value={noteTitle}
                                                            onChange={(e) => { setNoteTitle(e.target.value) }}
                                                            placeholder='Note Title'
                                                            className='placeholder:pl-2 pl-2 h-[3rem] lg:w-[25rem] w-[80vw] bg-slate-50 rounded-[0.3rem]'
                                                            type="text"
                                                        />
                                                        {/* For laptop Description box*/}
                                                        <div className='hidden lg:flex justify-center items-center flex-col h-auto  lg:w-[25rem] w-[80vw] bg-white-0'>
                                                            <Field className=' lg:w-[25rem] w-[80vw] h-auto flex flex-col'>
                                                                <Label className="text-sm font-medium text-black">Description</Label>
                                                                <Description className="text-sm text-black/50">This will be shown under the Note Description.</Description>
                                                                <Textarea
                                                                    value={note}
                                                                    onChange={(e) => { setNote(e.target.value) }}
                                                                    className={clsx(
                                                                        'mt-3 block  lg:w-[25rem] w-[80vw] resize-none rounded-lg border-none bg-white py-1.5 px-3 text-sm text-slate-900',
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
                                                        <button type="submit" className='h-[3rem]   lg:w-[25rem] w-[80vw] mb-5 bg-gradient-to-r from-sky-400 to-green-500 text-white rounded-md'>Add Note</button>
                                                        {/* <div onClick={() => { navigate('/All-Notes') }} className='h-auto cursor-pointer text-sky-700 bg-white-0 -mt-[2rem] w-[80vw] mb-5 flex justify-end items-start'>View all notes</div> */}
                                                        {/* /All-Notes */}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <div>
                    {
                        noteData.length === 0 ? <div>
                            No Such Item Found
                        </div> : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default AllNotes
