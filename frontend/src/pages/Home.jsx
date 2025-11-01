import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'
import Income from '../components/Income'
import { useState } from 'react'
import Expenses from '../components/Expenses'

const Home = () => {
    const [toggle, settoggle] = useState(false)

    return (
        <div>
            <Header toggle={toggle} settoggle={settoggle} />
            <div className='flex h-full w-full fixed content-start'>

                <div className="flex h-full w-full">
                    <Sidebar toggle={toggle} setToggle={settoggle} />
                    <main className="grow overflow-scroll overflow-x-hidden">
                        <Dashboard />
                        <Income />
                        <Expenses />
                    </main>
                </div>

            </div>
        </div>
    )
}

export default Home
