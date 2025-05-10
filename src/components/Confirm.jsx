import React from 'react'

const Confirm = ({ items, onRestart }) => {
  // Calculate total price
  const total = items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

  return (
    <div className='bg-white pl-[20px] sm:w-[500px] rounded-[7px] sm:relative absolute  bottom-0 w-[100%]  scroll'>
      <div className='mb-4'>
        <img src="./assets/images/icon-order-confirmed.svg" alt="" />
      </div>
      <div>
        <h1 className='text-[#260f08] text-5xl font-[700] mb-1 sm:w-auto w-[206px] '>
          Order Confirmed
        </h1>
        <p className='text-[#c9aea6] font-[400]'>We hope you enjoy your food</p>
      </div>
      <div className='mt-6 bg-[#fcf9f7] rounded-lg p-4'>
        {items?.map((item) => (
          <div key={item.name} className='flex items-center gap-4 py-3 border-b border-[#caafa7] last:border-none'>
            <img 
              src={item.image?.desktop} 
              alt={item.name} 
              className='w-16 h-16 object-cover rounded-md'
            />
            <div className='flex-1'>
              <p className='font-[700] text-[14px] text-[#260f08]'>{item.name}</p>
              <div className='flex items-center gap-2'>
                <span className='font-[600] text-[#c73b0f]'>{item.quantity}×</span>
                <p className='text-[#87635a] text-[14px]'>@ ${item.price.toFixed(2)}</p>
              </div>
            </div>
            <p className='font-[600] text-[#260f08]'>
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        <div className='mt-4 pt-4  flex justify-between items-center'>
          <span className='font-[400] text-[15px] text-[#260f08]'>Order Total:</span>
          <span className='font-[700] text-[25px] text-[#260f08]'>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
      <div 
        className='flex justify-center items-center h-[50px] bg-[#c73a0f] rounded-[30px] cursor-pointer text-[#fcf9f7] mt-[20px] hover:bg-[#a12f0c]'
        onClick={onRestart}
      >
        Start New Order
      </div>
    </div>
  )
}

export default Confirm
