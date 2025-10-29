import { useState } from "react";
import ContactList from "./components/contacts/ContactList";
import ContactForm from "./components/ContactForm";
import SearchContact from "./components/SearchContact";


export default function App() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  return (
    <div className="w-screen h-screen flex flex-col items-center relative px-4 pt-4 bg-slate-400">
      <SearchContact />
      <main className="h-full w-full flex flex-col items-center justify-between pb-6 md:max-w-2/3">
        <ContactList />
        <button
          className="bg-gray-300 w-fit px-3 py-2 rounded-2xl cursor-pointer hover:scale-110 active:scale-95"
          onClick={() => setIsContactFormOpen(!isContactFormOpen)}
        >Add Contact</button>
        {isContactFormOpen && <ContactForm setIsContactFormOpen={setIsContactFormOpen} />}
      </main>
    </div>
  )
}
