import React from 'react'

type ContactFormProp = {
    setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContactForm({ setIsContactFormOpen }: ContactFormProp) {
    return (
        <div className='bg-amber-300 absolute'>
            <button onClick={() => setIsContactFormOpen(false)}>X</button>
            <form className='flex flex-col'>
                <div className='flex'>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                        />
                    </div>
                </div>
                <label htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                />
                <label htmlFor="email">E-Mail</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
