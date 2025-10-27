import { useState } from "react";


export default function ContactCard() {
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    return (
        <div className="text-white w-full h-fit cursor-pointer">
            <div
                className="flex justify-between bg-slate-900 pl-4 p-3  rounded-xl"
                onClick={() => setIsToggleOpen(!isToggleOpen)}
            >
                <label className="">Ana Lee</label>
                <div className="btn-grp flex gap-0.5 text-black">
                    <button className="bg-gray-300 w-fit px-3 py-2 rounded cursor-pointer hover:scale-110 active:scale-95">E</button>
                    <button className="bg-gray-300 w-fit px-3 py-2 rounded cursor-pointer hover:scale-110 active:scale-95">D</button>
                </div>
            </div>
            {isToggleOpen && <div className="flex flex-col bg-slate-700 p-2.5 pl-4 rounded-xl">
                <label className="py-1">+91 9933448326</label>
                <label className="py-1">analee@gmail.com</label>
            </div>}
        </div>
    )
}
