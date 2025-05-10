import React, { useEffect, useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery';

const Desert_Content = ({ handleClick, resetItem }) => {
  const [data, setdata] = useState(null);
  const [counters, setCounters] = useState({});

  useEffect(() => {
    fetch('./data.json')
      .then(Response => Response.json())
      .then(json => {
        setdata(json);
        // Initialize counters for each item
        const initialCounters = {};
        json.forEach(item => {
          initialCounters[item.name] = 0;
        });
        setCounters(initialCounters);
    })
  },[])

  // Reset all counters when resetItem changes
  useEffect(() => {
    if (resetItem === 'ALL') {
      // Reset all counters to 0
      const resetCounters = {};
      data?.forEach(item => {
        resetCounters[item.name] = 0;
      });
      setCounters(resetCounters);
    } else if (resetItem) {
      // Reset specific item counter
      setCounters(prev => ({
        ...prev,
        [resetItem]: 0
      }));
    }
  }, [resetItem, data]);

  const formatPrice = (price) => {
    return price.toFixed(2);
  }

  const handleAddToCart = (info) => {
    setCounters(prev => ({
      ...prev,
      [info.name]: prev[info.name] + 1
    }));
    handleClick({
      name: info.name,
      price: info.price,
      image: info.image  // Pass the image data
    });
  }

  const handleIncrement = (e, info) => {
    e.stopPropagation(); // Prevent parent onClick from firing
    setCounters(prev => ({
      ...prev,
      [info.name]: prev[info.name] + 1
    }));
    // Pass positive price and quantity: 1 to increase cart
    handleClick({
      name: info.name,
      price: info.price,
      image: info.image,
      quantity: 1
    });
  }

  const handleDecrement = (e, info) => {
    e.stopPropagation(); // Prevent parent onClick from firing
    if (counters[info.name] > 0) {
      const newCount = counters[info.name] - 1;
      // Reset to initial state if count becomes 0
      if (newCount === 0) {
        setCounters(prev => ({
          ...prev,
          [info.name]: 0
        }));
        handleClick({
          name: info.name,
          price: info.price,
          quantity: -counters[info.name], // Remove all quantities
          reset: true
        });
      } else {
        setCounters(prev => ({
          ...prev,
          [info.name]: newCount
        }));
        handleClick({
          name: info.name,
          price: info.price,
          quantity: -1
        });
      }
    }
  }

  const isMobile = useMediaQuery('(max-width: 639px)');
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');

  const getImage = (info) => {
    if (isMobile) return info.image.mobile;
    if (isTablet) return info.image.tablet;
    return info.image.desktop;
  };

  // Removed unused handleReset function
  return (
    <>
      {data && data.map((info, index) => (
        <div className="aspect-square rounded-lg relative md:mb-2.5 lg:mb-0" key={index}>
          <img 
            src={getImage(info)} 
            alt={info.name} 
            className="w-full h-full object-cover rounded-[6px]"
          />
          <div className='relative pb-6'>
            <div
              className={`flex absolute py-[5px] px-[20px] rounded-[30px] left-[113px] lg:left-[52px] md:left-[25px] top-[-22px] sm:top-[-19px] 
                border-solid border-[1px] items-center transition-colors w-[162px] h-[50px] sm:h-[35px] oejofja[ldjsfja]
                ${counters[info.name] > 0 
                  ? 'bg-[#c73a0f] border-[#c73a0f]' 
                  : 'bg-white border-[#c9aea6] hover:border-[#c73a0f]'} 
                group`}
            >
              {counters[info.name] > 0 ? (
                <div className='flex items-center gap-2 justify-around w-[100%] h-[27px] '>
                  <div 
                    onClick={(e) => handleDecrement(e, info)} 
                    className="cursor-pointer transition-opacity p-1 rounded-full border border-[#fcf9f7] flex items-center h-[19px] hover:bg-[#fcf9f7] group/dec"
                  >
                    <img 
                      src="./assets/images/icon-decrement-quantity.svg" 
                      alt="Decrease quantity" 
                      className='brightness-0 invert
                        group-hover/dec:[filter:brightness(0)_saturate(100%)_invert(31%)_sepia(97%)_saturate(2619%)_hue-rotate(357deg)_brightness(91%)_contrast(96%)]'
                    />
                  </div>
                  <span className='font-[600] text-white'>{counters[info.name]}×</span>
                  <div 
                    onClick={(e) => handleIncrement(e, info)} 
                    className="cursor-pointer transition-opacity p-1 rounded-full border border-[#fcf9f7] flex items-center h-[19px] hover:bg-[#fcf9f7] group/dec"
                  >
                    <img 
                      src="./assets/images/icon-increment-quantity.svg" 
                      alt="Increase quantity" 
                      className='brightness-0 invert
                        group-hover/dec:[filter:brightness(0)_saturate(100%)_invert(31%)_sepia(97%)_saturate(2619%)_hue-rotate(357deg)_brightness(91%)_contrast(96%)]'
                    />
                  </div>
                </div>
              ) : (
                <div 
                  className='flex items-center cursor-pointer'
                  onClick={() => handleAddToCart(info)}
                >
                  <img 
                    src="./assets/images/icon-add-to-cart.svg" 
                    alt="" 
                    className=''
                  />
                  <p className='font-[760] pl-2 group-hover:text-[#260f08]'>Add to Cart</p>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col justify-center mt-1 mb-2 sm:m-0 '>
            <span
              className='text-[#c9aea6] text-[14px] font-[600]'
              key={index}>
                {info.category}
            </span>
            <span
              className='text-[16px] font-[700]'
              key={index}>
                {info.name}
            </span>
            <span
              className='text-[#c73b0f] font-[600] text-[15px]'
              key={index}>
                ${formatPrice(info.price)}
            </span>
          </div>
        </div>
        ))}
    </>
  )
}

export default Desert_Content

// border: 1px solid white;
// border-radius: 50%;
// height: 19px;
// display: flex
// ;
// align-items: center;