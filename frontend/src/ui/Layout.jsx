import React from 'react'
import { IoBookOutline } from 'react-icons/io5'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function Layout() {

    const navigate = useNavigate()

    function home() {
        navigate('/home')
    }

    return (
        <section>
            <nav className='w-full bg-neutral-400 h-30 fixed rounded-b-2xl shadow-2xl flex'>
                <div className='w-30 h-30 flex items-center justify-center'>
                    <IoBookOutline className='text-violet-900 text-7xl cursor-pointer' onClick={home} />
                </div>

                <div className='w-300 h-30'>
                    <ul className='w-full h-30 items-center justify-center flex gap-10'>
                        <li>
                            <Link to="/book/register" className='text-neutral-700 hover:text-black transition-colors duration-300 hover:underline hover:underline-offset-8 text-xl'>
                                Registrar livro
                            </Link>
                        </li>
                        <li>
                            <Link to="/book/library" className='text-neutral-700 hover:text-black transition-colors duration-300 hover:underline hover:underline-offset-8 text-xl'>
                                Biblioteca
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>
        </section>
    )
}

export default Layout