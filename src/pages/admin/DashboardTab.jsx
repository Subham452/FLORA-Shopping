import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import myContext from '../../context/data/myContext'
import { Description, Field, Label, Textarea } from '@headlessui/react';
import clsx from 'clsx';
import { addDoc, updateDoc, query, orderBy, deleteDoc, collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fireDB } from '../../components/firebase/FireabseConfig';
// Import Firebase
import { getFirestore } from "firebase/firestore";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
// import myContext from '../../../context/data/myContext';
const DashboardTab = () => {
    const navigate = useNavigate();


    const [idx, setIdx] = useState();

    const [updateName, setUpdateName] = useState('');
    const [updatePrice, setUpdatePrice] = useState('');
    const [updateImage, setUpdateImage] = useState('');
    const [updateDesc, setUpdateDesc] = useState('');
    const [updateCategory, setUpdateCategory] = useState('');
    const [open, setOpen] = useState(false)



    const context = useContext(myContext);
    const { deleteProduct, popup, setPopup, updateProduct, modal1, deleteUserById, editProducts, addProduct, name, setName, price, setPrice, category, setCategory, desc, setDesc, image, setImage, product } = context


    const [productIdx, setProductIdx] = useState()
    const modal = () => {
        alert('ggs')
    }


    const updateProductById = async (docId, data) => {

        if (!updateName || !updatePrice || !updateImage || !updateCategory || !updateDesc) {
            toast.error("Fill all the field!")
        }

        else {
            const docRef = doc(fireDB, "products", docId);

            try {
                await updateDoc(docRef, data);
                console.log("Document updated successfully");
                toast.success("Document updated successfully")
            } catch (error) {
                console.error("Error updating document: ", error);
                toast.error("Error updating document: ", error)
            }
            setUpdateName('')
            setUpdatePrice('')
            setUpdateCategory('')
            setUpdateImage('')
            setUpdateDesc('')
        }
    }
    const modal11 = () => {
        setPopup(true)
    }


    return (
        <div>
            <div className='flex flex-col items-start justify-start w-screen h-auto px-10 mt-10 min-h-96'>
                <Tabs className='w-full text-2xl font-semibold '>
                    <TabList className={' lg:text-2xl text-lg'} >
                        <Tab>Products</Tab>
                        <Tab>Orders</Tab>
                        <Tab >Users</Tab>
                    </TabList>

                    <TabPanel className='w-full '>
                        <div className='flex flex-row items-center justify-between w-full h-auto py-2 '>
                            <h2>Product Details</h2>
                            <button className='w-auto h-auto px-3 py-2 text-lg text-white bg-gradient-to-r from-sky-800 to-sky-300' onClick={() => { navigate('/addproduct') }}>Add Product</button>
                        </div>
                        <div className="relative w-full overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                {/* <tbody> */}
                                {
                                    product.map((i, idx) => {
                                        const { name, date, category, price, image, desc } = i
                                        return (
                                            <tbody className='w-full ' key={i}>
                                                <tr className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {idx + 1}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <div className=' h-[3rem] w-[5rem] justify-center items-center flex overflow-hidden bg-slate-600'>
                                                            <img src={image} alt="" />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {/* Laptop PC */}
                                                        {i.name}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {/* {price} */}{i.price}
                                                    </td>
                                                    <td className="px-6 py-4 capitalize">
                                                        {/* {category} */}{i.category}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {i.id}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className='flex flex-row items-center justify-between gap-3 '>
                                                            {/* <button data-modal-target="static-modal" data-modal-toggle="static-modal" className='p-2 text-black cursor-pointer bg-slate-50' onClick={() => { setProductIdx(i?.id) ;updateProductById(productIdx, {name:"new"}) }}>Edit</button> */}
                                                            <button data-modal-target="static-modal" data-modal-toggle="static-modal" className='p-2 text-black cursor-pointer bg-slate-50' onClick={() => { setProductIdx(i?.id); modal11() }}>Edit</button>
                                                            {/* <button className='p-2 text-black cursor-pointer bg-slate-100' onClick={() => deleteProduct(i.id)}>Delete</button>                                                            <Dialog open={open} onClose={setOpen} className="relative z-10"> */}
                                                            <button className='p-2 text-black cursor-pointer bg-slate-100' onClick={() => {setOpen(true); setProductIdx(i.id)}}>Delete</button>                                                            <Dialog open={open} onClose={setOpen} className="relative z-10">
                                                                <DialogBackdrop
                                                                    transition
                                                                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                                                                />

                                                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                    <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                                                                        <DialogPanel
                                                                            transition
                                                                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                                                                        >
                                                                            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                                                                                <div className="sm:flex sm:items-start">
                                                                                    <div className="items-center justify-center flex-shrink-0 hidden w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                                                                    </div>
                                                                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                                                            Deactivate account
                                                                                        </DialogTitle>
                                                                                        <div className="mt-2">
                                                                                            <p className="text-sm text-gray-500">
                                                                                                Are you sure you want to deactivate your item? All of your data will be permanently removed.
                                                                                                This action cannot be undone.
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                <button
                                                                                    type="button"
                                                                                    // onClick={() => { setOpen(false); deleteUserById(i.id) }}
                                                                                    onClick={()=>{
                                                                                        // alert('gg')
                                                                                        setOpen(false)
                                                                                        deleteProduct(productIdx)
                                                                                    }}
                                                                                    className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                                                >
                                                                                    Deactivate
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    data-autofocus
                                                                                    onClick={() => setOpen(false)}
                                                                                    className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                                >
                                                                                    Cancel
                                                                                </button>
                                                                            </div>
                                                                        </DialogPanel>
                                                                    </div>
                                                                </div>
                                                            </Dialog>
                                                        </div>
                                                    </td>
                                                </tr>

                                                <div className={`relative z-10 w-[20rem]  ${popup ? "" : "hidden"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                                    <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

                                                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                        <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">

                                                            <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl ">
                                                                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                                                                    <div className="flex-col sm:flex sm:items-start">
                                                                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full">
                                                                            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                                                            </svg>
                                                                        </div>
                                                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                            <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Deactivate account : <span className='text-red-700 '>{productIdx}</span></h3>
                                                                            <div className="mt-2">
                                                                                <div className='flex flex-col items-start justify-between'>
                                                                                    <div>
                                                                                        <form onSubmit={modal} className='flex flex-col items-center justify-center w-auto h-auto gap-5 text-black'>
                                                                                            <input
                                                                                                value={updateName}
                                                                                                onChange={(e) => { setUpdateName(e.target.value) }}
                                                                                                placeholder={name}
                                                                                                className='placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem]'
                                                                                                type="text"
                                                                                            />
                                                                                            <input
                                                                                                value={updatePrice}
                                                                                                onChange={(e) => { setUpdatePrice(e.target.value) }}
                                                                                                placeholder={i.price}
                                                                                                className='placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem]'
                                                                                                type="number"
                                                                                            />
                                                                                            <input
                                                                                                value={updateImage}
                                                                                                onChange={(e) => { setUpdateImage(e.target.value) }}
                                                                                                placeholder={i.image}
                                                                                                className='placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem]'
                                                                                                type="url"
                                                                                            />
                                                                                            <input
                                                                                                value={updateCategory}
                                                                                                onChange={(e) => { setUpdateCategory(e.target.value) }}
                                                                                                placeholder={i.category}
                                                                                                className='placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem]'
                                                                                                type="text"
                                                                                            />
                                                                                            <div className="w-full max-w-md px-4">
                                                                                                <Field className='w-[36rem] h-auto flex flex-col'>
                                                                                                    <Label className="text-sm font-medium text-black">Description</Label>
                                                                                                    <Description className="text-sm text-black/50">This will be shown under the product title.</Description>
                                                                                                    <Textarea
                                                                                                        value={updateDesc}
                                                                                                        onChange={(e) => { setUpdateDesc(e.target.value) }}
                                                                                                        placeholder={i.desc}
                                                                                                        className={clsx(
                                                                                                            'mt-3 -ml-2 block w-[27rem] resize-none rounded-lg border-none bg-slate-100 py-1.5 px-3 text-sm text-slate-900',
                                                                                                            'focus:outline-none focus:ring-2 focus:ring-blue-500'
                                                                                                        )}
                                                                                                        rows={10}
                                                                                                    />
                                                                                                </Field>
                                                                                            </div>
                                                                                        </form>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                                                                    <button type="button" className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={() => { updateProductById(productIdx, { name: updateName, price: updatePrice, category: updateCategory, image: updateImage, desc: updateDesc }) }}>Edit</button>
                                                                    <button type="button" className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => { setPopup(false) }}>Cancel</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </tbody>
                                        )
                                    })
                                }
                            </table>
                        </div>

                    </TabPanel>

                    <TabPanel>
                        <div className='flex flex-row items-center justify-between w-full h-auto py-2 '>
                            <h2>Oder Details</h2>
                            <button className='w-auto h-auto px-3 py-2 text-lg text-white bg-gradient-to-r from-sky-800 to-sky-300' onClick={() => { navigate('/addproduct') }}>Add Product</button>
                        </div>

                        <div className="relative w-full overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Payment id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Pincode
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Phone number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            111
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className=' h-[3rem] w-[5rem] justify-center items-center flex overflow-hidden bg-slate-600'>

                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            Title
                                        </td>
                                        <td className="px-6 py-4">
                                            $2999
                                        </td>
                                        <td className="px-6 py-4">
                                            Electronics
                                        </td>
                                        <td className="px-6 py-4">
                                            Laptop
                                        </td>
                                        <td className="px-6 py-4">
                                            HYBD
                                        </td>
                                        <td className="px-6 py-4">
                                            XXXXXX
                                        </td>
                                        <td className="px-6 py-4">
                                            984358953
                                        </td>
                                        <td className="px-6 py-4">
                                            xxx@gmail.com
                                        </td>

                                        <td className="px-6 py-4">
                                            12-Aug-2024
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            112
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className=' h-[3rem] w-[5rem] justify-center items-center flex overflow-hidden bg-slate-600'>

                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            Title
                                        </td>
                                        <td className="px-6 py-4">
                                            $2999
                                        </td>
                                        <td className="px-6 py-4">
                                            Electronics
                                        </td>
                                        <td className="px-6 py-4">
                                            Laptop
                                        </td>
                                        <td className="px-6 py-4">
                                            HYBD
                                        </td>
                                        <td className="px-6 py-4">
                                            XXXXXX
                                        </td>
                                        <td className="px-6 py-4">
                                            984358953
                                        </td>
                                        <td className="px-6 py-4">
                                            xxx@gmail.com
                                        </td>

                                        <td className="px-6 py-4">
                                            12-Aug-2024
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            113
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className=' h-[3rem] w-[5rem] justify-center items-center flex overflow-hidden bg-slate-600'>

                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            Title
                                        </td>
                                        <td className="px-6 py-4">
                                            $2999
                                        </td>
                                        <td className="px-6 py-4">
                                            Electronics
                                        </td>
                                        <td className="px-6 py-4">
                                            Laptop
                                        </td>
                                        <td className="px-6 py-4">
                                            HYBD
                                        </td>
                                        <td className="px-6 py-4">
                                            XXXXXX
                                        </td>
                                        <td className="px-6 py-4">
                                            984358953
                                        </td>
                                        <td className="px-6 py-4">
                                            xxx@gmail.com
                                        </td>

                                        <td className="px-6 py-4">
                                            12-Aug-2024
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className='flex flex-row items-center justify-between w-full h-auto py-2 '>
                            <h2>Users Details</h2>
                            <button className='w-auto h-auto px-3 py-2 text-lg text-white bg-gradient-to-r from-sky-800 to-sky-300' onClick={() => { navigate('/addproduct') }}>Add Product</button>
                        </div>

                        <div className="relative w-full overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            S No.
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Pincode
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Phone Number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            1
                                        </th>
                                        <td className="px-6 py-4">
                                            HYBD
                                        </td>
                                        <td className="px-6 py-4">
                                            XXXXXX
                                        </td>
                                        <td className="px-6 py-4">
                                            894567443
                                        </td>
                                        <td className="px-6 py-4">
                                            xxx@gmail.com
                                        </td>
                                        <td className="px-6 py-4">
                                            12-AUG-2024
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            2
                                        </th>
                                        <td className="px-6 py-4">
                                            HYBD
                                        </td>
                                        <td className="px-6 py-4">
                                            XXXXXX
                                        </td>
                                        <td className="px-6 py-4">
                                            894567443
                                        </td>
                                        <td className="px-6 py-4">
                                            xxx@gmail.com
                                        </td>
                                        <td className="px-6 py-4">
                                            12-AUG-2024
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            3
                                        </th>
                                        <td className="px-6 py-4">
                                            HYBD
                                        </td>
                                        <td className="px-6 py-4">
                                            XXXXXX
                                        </td>
                                        <td className="px-6 py-4">
                                            894567443
                                        </td>
                                        <td className="px-6 py-4">
                                            xxx@gmail.com
                                        </td>
                                        <td className="px-6 py-4">
                                            12-AUG-2024
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            4
                                        </th>
                                        <td className="px-6 py-4">
                                            HYBD
                                        </td>
                                        <td className="px-6 py-4">
                                            XXXXXX
                                        </td>
                                        <td className="px-6 py-4">
                                            894567443
                                        </td>
                                        <td className="px-6 py-4">
                                            xxx@gmail.com
                                        </td>
                                        <td className="px-6 py-4">
                                            12-AUG-2024
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>
                </Tabs>
                {/* Modal for Delete Product */}
            </div>

        </div>
    )
}

export default DashboardTab
