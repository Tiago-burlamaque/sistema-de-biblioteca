import { IoIosAdd } from "react-icons/io";
import { IoBookOutline, IoLibrary } from "react-icons/io5";
import { Link } from 'react-router-dom'

function Home() {

  const usuario = JSON.parse(localStorage.getItem("usuario"))

  return (
    <section className='h-screen flex flex-col py-5 px-50 gap-10'>
      <header className="bg-neutral-300 h-25 text-center flex items-center justify-center rounded-2xl w-full border border-neutral-400 p-10">
        <h1 className="poppins-bold text-2xl text-neutral-600">
          Seja bem vindo(a) ao sistema de biblioteca <h2 className="poppins-extrabold text-violet-900"> {usuario?.nome} </h2>
        </h1>
      </header>

      <main className="bg-neutral-300 w-full h-150 rounded-2xl border-neutral-400 border p-10 flex flex-col items-center ">
        <header className="w-full h-30 items-center justify-center flex">
          <IoBookOutline className='text-violet-900 text-9xl' />
        </header>
        <div className="flex w-full h-150 rounded-2xl  items-center gap-10  ">

          <div className="w-1/2 h-60 bg-neutral-400 rounded-2xl shadow-violet-900 shadow-2xl p-2 opacity-55 hover:opacity-100 transition-all duration-300 cursor-pointer">
            <header className="w-full h-20 flex items-center justify-center">
              <h1 className="poppins-bold text-2xl">
                Registrar Livro
              </h1>
            </header>
            <main className="w-full h-20 flex items-center justify-center">
              <IoIosAdd className="text-9xl text-black" />
            </main>
          </div>
          <Link to="/book/library" className="w-1/2 h-60 bg-neutral-400 rounded-2xl shadow-violet-900 shadow-2xl p-2 opacity-55 hover:opacity-100 transition-all duration-300 cursor-pointer">
            <header className="w-full h-20 flex items-center justify-center">
              <h1 className="poppins-bold text-2xl">
                Biblioteca
              </h1>
            </header>
            <main className="w-full h-20 flex items-center justify-center">
              <IoLibrary className="text-9xl text-black" />
            </main>
          </Link>
        </div>
      </main>
    </section>
  )
}

export default Home