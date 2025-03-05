'use client';
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div id='root'>
      <section
        id='contact'
        className='py-20 bg-gradient-to-b from-black to-neutral-900'
      >
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center max-w-3xl mx-auto mb-16 animate__animated animate__fadeIn'>
            <h2 className='text-3xl font-bold text-neutral-50 mb-4'>
              Get in Touch
            </h2>
            <p className='text-lg text-neutral-600'>
              Have a question or ready to transform your web development
              workflow? Reach out to our team and we'll be happy to help.
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto'>
            <div className='bg-white rounded-xl shadow-lg p-8 animate__animated animate__fadeInLeft'>
              <h3 className='text-xl font-semibold text-neutral-900 mb-6'>
                Send Us a Message
              </h3>

              <form id='contact-form' className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-neutral-700 mb-1'
                    >
                      Full Name
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      placeholder='Your name'
                      className='w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 outline-none'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-neutral-700 mb-1'
                    >
                      Email Address
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='your@email.com'
                      className='w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 outline-none'
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='subject'
                    className='block text-sm font-medium text-neutral-700 mb-1'
                  >
                    Subject
                  </label>
                  <select
                    id='subject'
                    name='subject'
                    className='w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 outline-none'
                  >
                    <option value='general'>General Inquiry</option>
                    <option value='support'>Technical Support</option>
                    <option value='billing'>Billing Question</option>
                    <option value='partnership'>Partnership Opportunity</option>
                    <option value='feedback'>Product Feedback</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-neutral-700 mb-1'
                  >
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows={5}
                    placeholder='How can we help you?'
                    className='w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 outline-none resize-none'
                    required
                  ></textarea>
                </div>

                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='privacy'
                      name='privacy'
                      type='checkbox'
                      className='h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded'
                      required
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='privacy' className='text-neutral-600'>
                      I agree to the{' '}
                      <a href='#' className='text-primary hover:underline'>
                        Privacy Policy
                      </a>{' '}
                      and consent to being contacted.
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    className='w-full bg-neutral-900 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg flex justify-center items-center'
                  >
                    <span>Send Message</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 ml-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 5l7 7-7 7M5 5l7 7-7 7'
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>

              <div
                id='form-success'
                className='hidden mt-6 p-4 bg-green-100 text-green-700 rounded-lg'
              >
                <div className='flex items-center'>
                  <svg
                    className='h-5 w-5 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                  <span>
                    Your message has been sent successfully. We'll be in touch
                    soon!
                  </span>
                </div>
              </div>

              <div
                id='form-error'
                className='hidden mt-6 p-4 bg-red-100 text-red-700 rounded-lg'
              >
                <div className='flex items-center'>
                  <svg
                    className='h-5 w-5 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    ></path>
                  </svg>
                  <span>Something went wrong. Please try again later.</span>
                </div>
              </div>
            </div>

            <div className='animate__animated animate__fadeInRight'>
              <div className='bg-neutral-900 text-white rounded-xl shadow-lg p-8 mb-8'>
                <h3 className='text-xl font-semibold mb-6'>
                  Contact Information
                </h3>

                <div className='space-y-6'>
                  <div className='flex items-start'>
                    <div className='bg-neutral-800 rounded-lg p-3 mr-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-primary'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className='text-lg font-medium text-gray-200 mb-1'>
                        Email
                      </h4>
                      <a
                        href='mailto:support@scrollout.ai'
                        className='text-gray-400 hover:text-primary transition-colors duration-300'
                      >
                        support@scrollout.ai
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='bg-neutral-800 rounded-lg p-3 mr-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-primary'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className='text-lg font-medium text-gray-200 mb-1'>
                        Phone
                      </h4>
                      <a
                        href='tel:+18005551234'
                        className='text-gray-400 hover:text-primary transition-colors duration-300'
                      >
                        +91 800 555 1234
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='bg-neutral-800 rounded-lg p-3 mr-4'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 text-primary'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                        ></path>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className='text-lg font-medium text-gray-200 mb-1'>
                        Office
                      </h4>
                      <p className='text-gray-400'>
                        123 Innovation Drive
                        <br />
                        Purnia, BR 854301
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mt-8'>
                  <h4 className='text-lg font-medium text-gray-200 mb-4'>
                    Connect With Us
                  </h4>
                  <div className='flex space-x-4'>
                    <a
                      href='#'
                      className='bg-neutral-800 hover:bg-neutral-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300'
                    >
                      <svg
                        className='h-5 w-5 text-primary'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'></path>
                      </svg>
                    </a>
                    <a
                      href='#'
                      className='bg-neutral-800 hover:bg-neutral-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300'
                    >
                      <svg
                        className='h-5 w-5 text-primary'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z'></path>
                      </svg>
                    </a>
                    <a
                      href='#'
                      className='bg-neutral-800 hover:bg-neutral-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300'
                    >
                      <svg
                        className='h-5 w-5 text-primary'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'></path>
                      </svg>
                    </a>
                    <a
                      href='#'
                      className='bg-neutral-800 hover:bg-neutral-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300'
                    >
                      <svg
                        className='h-5 w-5 text-primary'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'></path>
                      </svg>
                    </a>
                    <a
                      href='#'
                      className='bg-neutral-800 hover:bg-neutral-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300'
                    >
                      <svg
                        className='h-5 w-5 text-primary'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-xl shadow-lg p-8'>
                <h3 className='text-xl font-semibold text-neutral-900 mb-4'>
                  Frequently Asked Questions
                </h3>
                <p className='text-neutral-600 mb-6'>
                  Find answers to common questions about Scrollout AI and how we
                  can help you build better websites faster.
                </p>
                <a
                  href='#faq'
                  className='inline-flex items-center  text-primary hover:text-blue-700 font-medium transition-colors duration-300'
                >
                  <span>View all FAQs</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 ml-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
