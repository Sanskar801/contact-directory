import React from 'react'

type ContactFormProp = {
    setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContactForm({ setIsContactFormOpen }: ContactFormProp) {
    return (
        <div className='bg-gray-300 absolute rounded-lg px-3 py-2 w-3/4 md:w-fit'>
            <div className='header flex justify-between items-center'>
                <h1 className='text-2xl font-bold p-3'>Contact Save</h1>
                <button
                    className='w-fit px-3 py-2 rounded-2xl cursor-pointer hover:scale-110 active:scale-95 hover:text-red-700'
                    onClick={() => setIsContactFormOpen(false)}
                    type="button"
                    aria-label="Close form"
                >X</button>
            </div>
            <form className='flex flex-col gap-4 p-3'>
                <div className='md:flex md:gap-4'>
                    <div className='flex flex-col mb-4 md:mb-0'>
                        <label htmlFor="firstName" className='mb-1 font-medium'>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            // value={formData.firstName}
                            // onChange={handleChange}
                            className='px-3 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="lastName" className='mb-1 font-medium'>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            // value={formData.lastName}
                            // onChange={handleChange}
                            className='px-3 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="phone" className='mb-1 font-medium'>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        // value={formData.phone}
                        // onChange={handleChange}
                        className='px-3 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='mb-1 font-medium'>E-Mail</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        // value={formData.email}
                        // onChange={handleChange}
                        className='px-3 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        required
                    />
                </div>
                <button
                    className="bg-blue-500 text-white w-fit self-center px-6 py-2 rounded-xl cursor-pointer hover:scale-110 active:scale-95 hover:bg-blue-600 transition-colors"
                    type="submit"
                >Submit</button>
            </form>
        </div>
    )
}
