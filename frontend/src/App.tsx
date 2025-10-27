import { useState } from "react";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";


export default function App() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  return (
    <div className="w-screen flex flex-col justify-between relative">
      Hello
      <ContactList />
      <button
        className="bg-gray-300 w-fit"
        onClick={() => setIsContactFormOpen(true)}
      >Add Contact</button>
      {isContactFormOpen && <ContactForm setIsContactFormOpen={setIsContactFormOpen} />}
    </div>
  )
}
