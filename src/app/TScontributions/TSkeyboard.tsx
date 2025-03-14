const TSkeyboard = () => {
  return (
    <div className='bg-black h-screen flex items-center justify-center'>
      <div className='absolute md:relative rounded-md bg-zinc-800  p-1 scale-[1.7] translate-x-10 w-fit h-fit mx-auto'>
        <div className='flex gap-[2px] mb-[2px] w-full shrink-0'>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] hover:translate-y-[1px] cursor-pointer transition duration-100'>
            <div
              className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-start items-end text-white'>
                esc
              </div>
            </div>
          </div>

          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='h-[6px] w-[6px]'
                  >
                    <path
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      d='M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m10-6h1M12 2V1m0 22v-1m8-2l-1-1m1-15l-1 1M4 20l1-1M4 4l1 1m-4 7h1'
                    />
                  </svg>
                </span>
                <span className='block'>F1</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='h-[6px] w-[6px]'
                  >
                    <path
                      fill='currentColor'
                      d='M12 17q-2.075 0-3.537-1.463T7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17m-7-4H1v-2h4zm18 0h-4v-2h4zM11 5V1h2v4zm0 18v-4h2v4zM6.4 7.75L3.875 5.325L5.3 3.85l2.4 2.5zm12.3 12.4l-2.425-2.525L17.6 16.25l2.525 2.425zM16.25 6.4l2.425-2.525L20.15 5.3l-2.5 2.4zM3.85 18.7l2.525-2.425L7.75 17.6l-2.425 2.525z'
                    />
                  </svg>
                </span>
                <span className='block'>F2</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='h-[6px] w-[6px]'
                  >
                    <g fill='none' fillRule='evenodd'>
                      <path d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
                      <path
                        fill='currentColor'
                        d='M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm16 0H5v3h14zM5 19v-9h4v9zm6 0h8v-9h-8z'
                      />
                    </g>
                  </svg>
                </span>
                <span className='block'>F3</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='h-[6px] w-[6px]'
                  >
                    <path
                      fill='currentColor'
                      d='m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14'
                    />
                  </svg>
                </span>
                <span className='block'>F4</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 48 48'
                    className='h-[6px] w-[6px]'
                  >
                    <g
                      fill='none'
                      stroke='currentColor'
                      strokeLinejoin='round'
                      strokeWidth='4'
                    >
                      <rect width='14' height='27' x='17' y='4' rx='7' />
                      <path
                        strokeLinecap='round'
                        d='M9 23c0 8.284 6.716 15 15 15s15-6.716 15-15M24 38v6'
                      />
                    </g>
                  </svg>
                </span>
                <span className='block'>F5</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='h-[6px] w-[6px]'
                  >
                    <path
                      fill='currentColor'
                      d='M19.524 14.721h.008q.968-.001 1.886-.172l-.063.01c-1.146 4.122-4.866 7.098-9.281 7.098h-.058h.003c-5.343-.006-9.673-4.336-9.678-9.679v-.001A9.76 9.76 0 0 1 9.37 2.665l.069-.017a10 10 0 0 0-.162 1.819v.007c.005 5.658 4.59 10.243 10.247 10.248h.001zM12.006.47a1.16 1.16 0 0 0-1.043-.465h.005C4.813.596.034 5.724 0 11.976v.003C.008 18.614 5.385 23.991 12.019 24h.061c6.243 0 11.367-4.786 11.905-10.889l.003-.045a1.17 1.17 0 0 0-.423-1.009l-.002-.002a1.16 1.16 0 0 0-1.084-.213l.008-.002l-.524.156a7.7 7.7 0 0 1-2.435.385h-.007a7.91 7.91 0 0 1-7.903-7.903V4.46c0-1.03.198-2.014.558-2.915l-.019.053a1.17 1.17 0 0 0-.155-1.134l.002.003z'
                    />
                  </svg>
                </span>
                <span className='block'>F6</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 512 512'
                    className='h-[6px] w-[6px]'
                  >
                    <path
                      fill='currentColor'
                      d='M455.979 424.271A24.053 24.053 0 0 0 480 400.251V112.015a24 24 0 0 0-38.285-19.286L264 224.369V112.015a24 24 0 0 0-38.285-19.286L31.155 236.847a24 24 0 0 0 0 38.57l194.56 144.119A24 24 0 0 0 264 400.251V287.9l177.715 131.637a23.92 23.92 0 0 0 14.264 4.734M232 384.37L58.88 256.132L232 127.9ZM448 127.9v256.47L274.88 256.132Z'
                    />
                  </svg>
                </span>
                <span className='block'>F7</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 512 512'
                    className='h-[6px] w-[6px]'
                  >
                    <path
                      fill='currentColor'
                      fillRule='evenodd'
                      d='M341.333 128v256H384V128zM128 128v256l213.333-128zm42.667 75.328L258.432 256l-87.765 52.65z'
                    />
                  </svg>
                </span>
                <span className='block'>F8</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 512 512'
                    className='h-[6px] w-[6px]'
                  >
                    <path
                      fill='currentColor'
                      d='M32 111.882v288.236A23.979 23.979 0 0 0 70.285 419.4L248 287.763v112.355a23.979 23.979 0 0 0 38.285 19.282l194.56-144.119a24 24 0 0 0 0-38.57L286.285 92.6A24 24 0 0 0 248 111.882v112.355L70.285 92.6A24 24 0 0 0 32 111.882m248 15.881L453.119 256L280 384.237Zm-216 0L237.119 256L64 384.237Z'
                    />
                  </svg>
                </span>
                <span className='block'>F9</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 16 16'
                    className='h-[6px] w-[6px]'
                  >
                    <path
                      fill='currentColor'
                      fillRule='evenodd'
                      d='M1.5 5h2.79l3.86-3.83l.85.35v13l-.85.33L4.29 11H1.5l-.5-.5v-5zm3.35 5.17L8 13.31V2.73L4.85 5.85L4.5 6H2v4h2.5zm9.381-4.108l.707.707L13.207 8.5l1.731 1.732l-.707.707L12.5 9.207l-1.732 1.732l-.707-.707L11.793 8.5L10.06 6.77l.707-.707l1.733 1.73z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                <span className='block'>F10</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='h-[6px] w-[6px]'
                  >
                    <path
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6'
                    />
                  </svg>
                </span>
                <span className='block'>F11</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    className='h-[6px] w-[6px]'
                  >
                    <g fill='none' stroke='currentColor' strokeWidth='2'>
                      <path strokeLinejoin='round' d='M6 9H3v6h3l5 4V5z' />
                      <path
                        strokeLinecap='round'
                        d='M18.5 5.5a9.19 9.19 0 0 1 0 13M15 8a5.657 5.657 0 0 1 0 8'
                      />
                    </g>
                  </svg>
                </span>
                <span className='block'>F12</span>
              </div>
            </div>
          </div>

          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <div className='h-4 w-4 rounded-full bg-gradient-to-b from-20% from-neutral-900 via-black via-50% to-neutral-900 to-95% p-px'>
                  <div className='bg-black h-full w-full rounded-full'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-[2px] mb-[2px] w-full shrink-0'>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex flex-col justify-center items-center text-white h-full gap-[0.37rem]'>
                <span className='block leading-none'>~</span>
                <span className='block leading-none'>`</span>
              </div>
            </div>
          </div>

          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>!</span>
                <span className='block'>1</span>
              </div>
            </div>
          </div>

          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>@</span>
                <span className='block'>2</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>#</span>
                <span className='block'>3</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>$</span>
                <span className='block'>4</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>%</span>
                <span className='block'>5</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>^</span>
                <span className='block'>6</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>&</span>
                <span className='block'>7</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>*</span>
                <span className='block'>8</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>(</span>
                <span className='block'>9</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>)</span>
                <span className='block'>0</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>_</span>
                <span className='block'>-</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>+</span>
                <span className='block'>=</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-end pr-[4px] pb-[2px]'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center flex-col items-end text-white'>
                delete
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-[2px] mb-[2px] w-full shrink-0'>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>
                tab
              </div>
            </div>
          </div>

          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>Q</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-red-600 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>W</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>E</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>R</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>T</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>Y</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>U</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>I</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>O</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>P</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>{'{'}</span>
                <span className='block'>[</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>{'}'}</span>
                <span className='block'>]</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>|</span>
                <span className='block'>\</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-[2px] mb-[2px] w-full shrink-0'>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-[2.8rem] items-end justify-start pl-[4px] pb-[2px]'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center flex-col items-start text-white'>
                caps lock
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-red-600 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>A</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-red-600 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>S</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-red-600 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>D</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>F</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>G</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>H</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>J</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>K</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>L</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>:</span>
                <span className='block'>;</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>"</span>
                <span className='block'>'</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center flex-col items-end text-white'>
                return
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-[2px] mb-[2px] w-full shrink-0'>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-[3.65rem] items-end justify-start pl-[4px] pb-[2px]'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center flex-col items-center text-white'>
                shift
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>Z</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>X</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>C</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>V</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>B</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>N</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>M</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>{'<'}</span>
                <span className='block'>,</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>{'>'}</span>
                <span className='block'>.</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-white'>
                <span className='block'>?</span>
                <span className='block'>/</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 bg-[#0A090D] rounded-[3.5px] flex w-[3.65rem] items-end justify-start pl-[4px] pb-[2px]'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center flex-col items-center text-white'>
                shift
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-[2px] mb-[2px] w-full shrink-0'>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-7 w-7 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex items-center flex-col h-full justify-between py-[4px] text-white gap-[2px]'>
                {/* "fn" Text */}
                <div className='flex justify-end w-full pr-1'>
                  <div className='flex justify-start w-full pl-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-[5px] w-[5px]'
                    >
                      <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0'></path>
                      <path d='M3.6 9h16.8'></path>
                      <path d='M3.6 15h16.8'></path>
                      <path d='M11.5 3a17 17 0 0 0 0 18'></path>
                      <path d='M12.5 3a17 17 0 0 1 0 18'></path>
                    </svg>
                  </div>
                  <span className='block'>fn</span>
                </div>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>Z</span>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>Z</span>
              </div>
            </div>
          </div>
          <div
            className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'
            id='command-btn'
            style={{
              boxShadow: '0px 0px 0px 0px var(--blue-500)',
              transform: 'none',
            }}
          >
            <div
              className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-8'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex items-center flex-col h-full justify-between py-[4px] text-white'>
                <div className='flex justify-end w-full pr-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='h-[6px] w-[6px]'
                  >
                    <path d='M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10'></path>
                  </svg>
                </div>
                <div className='flex justify-start w-full pl-1'>
                  <span className='block'>command</span>
                </div>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-[8.2rem]'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[0.4rem] w-full flex justify-center items-center flex-col text-white'>
                <span className='block font-bold'>Scrollx UI</span>
              </div>
            </div>
          </div>
          <div
            className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'
            id='command-btn'
            style={{
              boxShadow: '0px 0px 0px 0px var(--blue-500)',
              transform: 'none',
            }}
          >
            <div
              className='h-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-8'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex items-center flex-col h-full justify-between py-[4px] text-white'>
                <div className='flex justify-end w-full pr-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='h-[6px] w-[6px]'
                  >
                    <path d='M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10'></path>
                  </svg>
                </div>
                <div className='flex justify-start w-full pl-1'>
                  <span className='block'>command</span>
                </div>
              </div>
            </div>
          </div>
          <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
            <div
              className='h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center'
              style={{
                boxShadow:
                  'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
              }}
            >
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                <span className='block'>Z</span>
              </div>
            </div>
          </div>
          <div className='w-[4.9rem] mt-[2px] h-6 p-[0.5px] rounded-[4px] flex flex-col justify-end items-center'>
            <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
              <div
                className='bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-6 h-3'
                style={{
                  boxShadow:
                    'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
                }}
              >
                <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='h-[6px] w-[6px]'
                  >
                    <path
                      d='M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z'
                      fill='currentColor'
                      strokeWidth='0'
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className='flex'>
              <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
                <div
                  className='bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-6 h-3'
                  style={{
                    boxShadow:
                      'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
                  }}
                >
                  <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-[6px] w-[6px]'
                    >
                      <path
                        d='M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z'
                        fill='currentColor'
                        strokeWidth='0'
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className='p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
                <div
                  className='bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-6 h-3'
                  style={{
                    boxShadow:
                      'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
                  }}
                >
                  <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-[6px] w-[6px]'
                    >
                      <path
                        d='M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z'
                        fill='currentColor'
                        strokeWidth='0'
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className='p-[0.7px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100'>
                <div
                  className='bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-6 h-3'
                  style={{
                    boxShadow:
                      'rgb(13,13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset',
                  }}
                >
                  <div className='text-[5px] w-full flex justify-center items-center flex-col text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-[6px] w-[6px]'
                    >
                      <path
                        d='M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z'
                        fill='currentColor'
                        strokeWidth='0'
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TSkeyboard;
