import React from 'react'

const ProductInfo = () => {
    return (
        <div>
            <div className='flex items-center justify-center w-screen h-screen '>
                <div className='flex flex-row items-center justify-center w-full h-full gap-20 '>
                    <div className=' h-[25rem] w-[27rem] bg-slate-600/40'>

                    </div>
                    <div className=' h-[25rem] flex flex-col justify-start items-start w-[27rem] bg-slate-600/0'>
                        <h1 className='text-sm font-semibold text-slate-400'>BRAND NAME</h1>
                        <h1>The Catcher In The Rhy</h1>
                        <div className='flex flex-row items-center justify-between w-auto h-auto gap-3 py-3'>
                            <div>⭐⭐⭐⭐⭐</div>
                            <h1>5 Star Rating</h1>
                            <h1>|</h1>
                            <div>✨🐥🚀</div>
                        </div>
                        <div>
                            <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, est, fugiat, esse sapiente doloribus dolorum soluta vitae a asperiores velit ex ut totam expedita voluptatibus cupiditate quis. Saepe voluptatum laudantium, fuga culpa architecto dolor sunt excepturi numquam aut est obcaecati, quis reiciendis ut expedita voluptatibus perspiciatis! Vero similique mollitia esse.</h1>
                        </div>
                        <div className='w-full h-[0.19rem]  bg-slate-200 mt-5'></div>
                        <div className='flex flex-row items-center justify-between w-full h-auto mt-3 '>
                            <h1>$58.00</h1>
                            <div className='flex flex-row items-center justify-between gap-3 '>
                                <button className='w-auto h-auto px-10 py-5 text-white bg-violet-500'>Add to Cart</button>
                                <div className='flex items-center justify-center w-auto h-auto p-3 rounded-full bg-slate-100'>
                                    ❤️
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo
