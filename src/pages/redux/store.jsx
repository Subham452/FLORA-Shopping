import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
export const store = configureStore ({
  reducer: {
    cart: cartSlice,
    
  },
  devTools:true
})

// import React from 'react'

// const store = () => {
//   return (
//     <div>
//       hsg
//     </div>
//   )
// }

// export default store
