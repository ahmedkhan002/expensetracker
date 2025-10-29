import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'

const Home = () => {
    return (
        <div>
            <Header />
            <div className='flex h-full w-full fixed content-start'>

                <div className="flex h-full w-full gap-2 fixed">
                    <div className="lg:w-1/4 xl:w-1/6 z-100">
                        <Sidebar />
                    </div>
                    <div className="grow overflow-scroll overflow-x-hidden min-h-4/4">
                        <Dashboard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
