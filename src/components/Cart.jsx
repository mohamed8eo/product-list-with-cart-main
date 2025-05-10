const Cart = ({ counter, items, onRemove, onConfirm }) => {
  // Calculate total price
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className='h-auto min-h-[320px] sm:w-[100%] bg-white rounded-[10px] py-4 px-5 sm:m-0 mx-5 w-[390px]'>
      <div className='pt-[25px] pl-[20px] font-[700] text-[#c73a0f] text-2xl mb-4'>
        {`Your Cart(${counter})`}
      </div>
      {items.length === 0 ? (
        <div className='flex flex-col justify-center items-center mt-6'>
          <img src="./assets/images/illustration-empty-cart.svg" alt="" className='w-[170px]' />
          <p className='text-[15px] font-[600] text-[#ad8985]'>Your added items will appear here</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {items.map((item) => (
            <div key={item.name} className='flex items-center gap-4 pb-5 justify-between border-b border-[#caafa7]'>
              <div>
                <div className='flex items-center gap-2'>
                  <p className='font-[700] text-[14px] mb-2 text-[#260f08]'>{item.name}</p>
                </div>
                <div className='flex gap-5 items-center'>
                  <span className='font-[600] text-[#c73b0f]'>{item.quantity}×</span>
                  <div className='flex items-center gap-2'>
                    <p className='text-[#87635a] text-[14px] font-[400] '>@ ${item.price.toFixed(2)}</p>
                    <p className='text-[#87635a] font-[600]'>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div 
                className='rounded-full border-[2px] border-[#caafa7] hover:border-[#260f08] group'
                onClick={() => onRemove(item.name)}
              >
                <img 
                  src="./assets/images/icon-remove-item.svg" 
                  alt="Remove item" 
                  className='p-1 cursor-pointer w-[18px] group-hover:[filter:brightness(0)_saturate(100%)_invert(8%)_sepia(19%)_saturate(2026%)_hue-rotate(333deg)_brightness(97%)_contrast(95%)]'
                />
              </div>
            </div>
          ))}
          <div>
            <div className='flex justify-between items-center mb-6'>
              <span className='font-[400] text-[15px] text-[#260f08]'>Order Total</span>
              <span className='font-[700] text-[25px] text-[#260f08]'>
                ${total.toFixed(2)}
              </span>
            </div>
              <div className='flex justify-center items-center bg-[#fcf9f7] rounded-2xl py-1.5 px-3 h-[53px] gap-2.5'>
                <img src="./assets/images/icon-carbon-neutral.svg" alt="" />
                <p className='text-[14px]'>This is a <span className='font-[700]'>Carbon-natural</span> deleviry</p>
              </div>
              <div className='cursor-pointer mt-[30px] flex justify-center items-center bg-[#c73a0f] py-[12px] px-5 rounded-[30px] text-[#fcf9f7] hover:bg-[#a12f0c]' onClick={onConfirm}>
                Confirm Order
              </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart



