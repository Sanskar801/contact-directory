import ContactCard from "./common/ContactCard";


export default function ContactList() {
    return (
        <div className="w-full flex flex-col gap-0.5">
            <ContactCard />
            <ContactCard />
        </div>
    )
}
