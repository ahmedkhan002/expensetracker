import { Menu } from 'lucide-react'
import React from 'react'

const Header = ({settoggle, toggle}) => {
    return (
        <header className="border-b sticky top-0 z-100 w-full border-gray-200 h-16 px-5 flex items-center bg-white">
            <Menu onClick={() => settoggle(!toggle)} className='lg:hidden cursor-pointer' size={20} />
            <h1 className="text-black font-sans max-lg:mx-auto text-xl font-semibold">
                Expense Tracker
            </h1>
        </header>
    )
}

export default Header