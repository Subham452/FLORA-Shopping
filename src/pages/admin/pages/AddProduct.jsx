// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { Description, Field, Label, Textarea } from '@headlessui/react'
// import clsx from 'clsx'
// import myContext from '../../../context/data/myContext'
// const AddProduct = () => {
//     // const []
//     const context = useContext(myContext);
//     const { name, setName, price, setPrice, category, setCategory, desc, setDesc, image, setImage, addProduct } = context
//     // const { products, setProducts, addProduct,handelOnChange, product } = context
//     return (
//         <div className='flex items-center justify-center w-screen h-auto py-20 '>
//             <div className='absolute flex items-center w-screen h-screen bg-white justify-evenly'>
//                 <div className=' -mb-[16rem] rounded-full h-60 w-60 bg-sky-300'></div>
//                 <div className='-mt-[10rem] -ml-[10rem] bg-green-500 rounded-full h-60 w-60'></div>
//                 <div className='absolute flex items-center w-screen h-screen -mr-20 bg-white/20 backdrop-blur-3xl justify-evenly'></div>
//                 <div className='absolute flex items-center w-screen h-screen ml-[20rem] bg-white/0 backdrop-blur-3xl justify-evenly'></div>
//             </div>
//             <div className=' h-[53rem] py-10 flex flex-col gap-10 justify-start items-center mx-auto w-[36rem] bg-slate-400/20 border-black/30 border-2 rounded-lg  z-20'>
//                 <h1 className='text-2xl font-customFont'>AddProduct</h1>
//                 <div className='flex flex-col items-center justify-center w-auto h-auto gap-5'>
//                     <div className='flex flex-col items-start justify-between'>
//                         <input
//                             // value={products.title}
//                             // onChange={(e) => { setProducts({ ...product, title: e.target.value }) }}
//                             value={name}
//                             onChange={(e) => { setName(e.target.value) }}
//                             placeholder='Product Title' className='placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem] ' type="Text" />
//                     </div>
//                     <div className='flex flex-col items-start justify-between'>
//                         <input
//                             // value={products.price}
//                             // onChange={(e) => { setProducts({ ...product, price: e.target.value }) }} 
//                             value={price}
//                             onChange={(e) => { setPrice(e.target.value) }}
//                             placeholder='Product Price' className=' placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem] ' type="Text" />
//                     </div>
//                     <div className='flex flex-col items-start justify-between'>
//                         <input
//                             // value={products.imageURL}
//                             // onChange={(e) => { setProducts({ ...product, imageURL: e.target.value }) }} 
//                             value={image}
//                             onChange={(e) => { setImage(e.target.value) }}
//                             placeholder='Product imgUrl' className='placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem] ' type="Text" />
//                     </div>
//                     <div className='flex flex-col items-start justify-between'>
//                         <input
//                             // value={products.category}
//                             // onChange={(e) => { setProducts({ ...product, category: e.target.value }) }}
//                             value={category}
//                             onChange={(e) => { setCategory(e.target.value) }}
//                             placeholder='Product Category' className='placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem] ' type="Text" />
//                     </div>
//                     <div className="w-full max-w-md px-4">
//                         <Field className=' w-[36rem] h-auto justify-start items-start flex  flex-col'>
//                             <Label className="font-medium text-black text-sm/6">Description</Label>
//                             <Description className="text-sm/6 text-black/50">This will be shown under the product title.</Description>
//                             <Textarea
//                                 // value={products.description}
//                                 value={desc}
//                                 onChange={(e) => { setDesc(e.target.value) }}
//                                 // onChange={(e) => { setProducts({ ...product, description: e.target.value }) }}

//                                 className={clsx(
//                                     'mt-3 -ml-2 block w-[27rem] resize-none rounded-lg border-none bg-white py-1.5 px-3 text-sm/6 text-slate-900',
//                                     'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
//                                 )}
//                                 rows={10}
//                             />
//                         </Field>
//                     </div>
//                     <button onClick={addProduct} className=' h-[3rem] w-[27rem] bg-gradient-to-r from-sky-400 to-green-500 text-white rounded-md'>Add Product</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AddProduct

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Description, Field, Label, Textarea } from '@headlessui/react';
import clsx from 'clsx';
import myContext from '../../../context/data/myContext';

const AddProduct = () => {
    const context = useContext(myContext);
    const { name, setName, addProduct, price, setPrice, category, setCategory, desc, setDesc, image, setImage } = context;
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e?.preventDefault();
        // Basic validation
        if (!name || !price || !category || !desc || !image) {
            setError('All fields are required');
            return;
        }
        setError('');
        addProduct();
    };

    return (
        <div>
            {/* for laptop */}
        <div className='items-center justify-center hidden w-screen h-auto py-20 lg:flex'>
            <div className='absolute flex items-center w-screen h-screen bg-white justify-evenly'>
                <div className='-mb-[16rem] rounded-full h-60 w-60 bg-sky-300'></div>
                <div className='-mt-[10rem] -ml-[10rem] bg-green-500 rounded-full h-60 w-60'></div>
                <div className='absolute flex items-center w-screen h-screen -mr-20 bg-white/20 backdrop-blur-3xl justify-evenly'></div>
                <div className='absolute flex items-center w-screen h-screen ml-[20rem] bg-white/0 backdrop-blur-3xl justify-evenly'></div>
            </div>
            <div className='h-[53rem] py-10 flex flex-col gap-10 justify-start items-center mx-auto w-[36rem] bg-slate-400/20 border-black/30 border-2 rounded-lg z-20'>
                <h1 className='text-2xl font-customFont'>Add Product</h1>
                {error && <p className='text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-auto h-auto gap-5'>
                    <input
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder='Product Title'
                        className='placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem]'
                        type="text"
                    />
                    <input
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                        placeholder='Product Price'
                        className='placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem]'
                        type="number"
                    />
                    <input
                        value={image}
                        onChange={(e) => { setImage(e.target.value) }}
                        placeholder='Product Image URL'
                        className='placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem]'
                        type="url"
                    />
                    <input
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                        placeholder='Product Category'
                        className='placeholder:pl-2 pl-2 h-[3rem] w-[27rem] bg-slate-50 rounded-[0.3rem]'
                        type="text"
                    />
                    <div className="w-full max-w-md px-4">
                        <Field className='w-[36rem] h-auto flex flex-col'>
                            <Label className="text-sm font-medium text-black">Description</Label>
                            <Description className="text-sm text-black/50">This will be shown under the product title.</Description>
                            <Textarea
                                value={desc}
                                onChange={(e) => { setDesc(e.target.value) }}
                                className={clsx(
                                    'mt-3 -ml-2 block w-[27rem] resize-none rounded-lg border-none bg-white py-1.5 px-3 text-sm text-slate-900',
                                    'focus:outline-none focus:ring-2 focus:ring-blue-500'
                                )}
                                rows={10}
                            />
                        </Field>
                    </div>
                    <button type="submit" className='h-[3rem] w-[27rem] bg-gradient-to-r from-sky-400 to-green-500 text-white rounded-md'>Add Product</button>
                </form>
            </div>
        </div>

        {/* for mobile */}
        <div className='flex flex-col items-center justify-center w-screen h-auto pt-6 lg:hidden bg-slate-200'>
            <div className='flex flex-col items-center justify-start w-screen gap-10 mx-auto border-2 rounded-lg '>
                {error && <p className='text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-auto h-auto gap-5'>
                    <input
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder='Product Title'
                        className='placeholder:pl-2 pl-2 h-[3rem] w-[80vw] bg-slate-50 rounded-[0.3rem]'
                        type="text"
                    />
                    <input
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                        placeholder='Product Price'
                        className='placeholder:pl-2 pl-2 h-[3rem] w-[80vw] bg-slate-50 rounded-[0.3rem]'
                        type="number"
                    />
                    <input
                        value={image}
                        onChange={(e) => { setImage(e.target.value) }}
                        placeholder='Product Image URL'
                        className='placeholder:pl-2 pl-2 h-[3rem] w-[80vw] bg-slate-50 rounded-[0.3rem]'
                        type="url"
                    />
                    <input
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                        placeholder='Product Category'
                        className='placeholder:pl-2 pl-2 h-[3rem] w-[80vw] bg-slate-50 rounded-[0.3rem]'
                        type="text"
                    />
                    <div className="w-[80vw] max-w-md px-4">
                        <Field className='w-[80vw] h-auto flex flex-col'>
                            <Label className="text-sm font-medium text-black">Description</Label>
                            <Description className="text-sm text-black/50">This will be shown under the product title.</Description>
                            <Textarea
                                value={desc}
                                onChange={(e) => { setDesc(e.target.value) }}
                                className={clsx(
                                    'mt-3 -ml-4 block w-[80vw] resize-none rounded-lg border-none bg-white py-1.5 px-3 text-sm text-slate-900',
                                    'focus:outline-none focus:ring-2 focus:ring-blue-500'
                                )}
                                rows={10}
                            />
                        </Field>
                    </div>
                    <button type="submit" className='h-[3rem] w-[80vw] mb-5 bg-gradient-to-r from-sky-400 to-green-500 text-white rounded-md'>Add Product</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default AddProduct;
