import { useState } from "react";


export default function ContactCard() {
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    return (
        <div className="text-white">
            <div
                className="flex justify-between bg-slate-900"
                onClick={() => setIsToggleOpen(!isToggleOpen)}
            >
                <label className="">Ana Lee</label>
                <div className="btn-grp flex">
                    <button className="bg-fuchsia-800 px-2 py-1">E</button>
                    <button className="bg-fuchsia-800 px-2 py-1">D</button>
                </div>
            </div>
            {isToggleOpen && <div className="flex flex-col bg-slate-700">
                <label>+91 9933448326</label>
                <label>analee@gmail.com</label>
            </div>}
        </div>
    )
}
