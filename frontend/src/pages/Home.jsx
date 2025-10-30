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

                <div className="flex h-full w-full gap-4 fixed">
                    <div className="lg:w-1/4 xl:w-1/6 z-100">
                        <Sidebar toggle={toggle} />
                    </div>
                    <div className="grow overflow-scroll overflow-x-hidden min-h-4/4">
                        <Dashboard />
                        <Income />
                        <Expenses />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
