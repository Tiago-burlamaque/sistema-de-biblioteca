import './Login.module.css'
import { IoBookOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { useState } from 'react';


function Login() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {

    } catch (error) {

    }
  }

  return (
    <section className='h-screen opacity-90 py-10 px-40 flex items-center justify-center'>
      <div className='h-full w-1/2  bg-linear-to-tr from bg-neutral-950 via-neutral-900 to-neutral-950 rounded-2xl border-neutral-900 border px-10'>
        <header className='w-full h-50 flex flex-col justify-center gap-4'>
          <IoBookOutline className='text-violet-900 text-6xl' />
          <h1 className='poppins-extrabold text-2xl text-white'>
            Bem-vindo de volta!
          </h1>
          <p className='poppins-bold text-sm text-gray-300'>
            Faça login para acessar sua conta
          </p>
        </header>
        <form className='w-full h-80 flex flex-col gap-10 justify-center text-white' onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className='poppins-extralight'>E-mail</label>
            <input
              type="email"
              id='email'
              className='poppins-extralight border border-neutral-900 rounded w-full p-2 flex focus:outline-2 focus:outline-violet-900 text-xl bg-none placeholder:text-sm transition-all'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Digite seu e-mail'
              required />
          </div>

          <div>
            <label htmlFor="senha" className='poppins-extralight'>Senha</label>
            <input
              type="password"
              id='senha'
              className='poppins-extralight border border-neutral-900 rounded w-full p-2 flex focus:outline-2 focus:outline-violet-900 text-xl bg-none placeholder:text-sm transition-all'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder='Digite sua senha'
              required />
          </div>

          <div>
            <button
              className='poppins-extralight border w-full p-2 rounded hover:bg-violet-900 hover:border-violet-900 transition-all duration-300 border-neutral-900 text-xl cursor-pointer'
              type='submit'>
              Entrar
            </button>
            <div className='poppins-thin w-full gap-1 my-2 flex items-center justify-center'>
              <h2 className='text-sm'>
                Não tem uma conta?
              </h2>
              <button
                type='button'
                onClick={() => setIsModalOpen(true)}
                className='text-gray-300 hover:text-gray-500 cursor-pointer transition-all duration-300'>
                Cadastre-se
              </button>
            </div>
          </div>
        </form>
        <footer className='w-full'>
          <div className='w-full flex items-center justify-center gap-5 text-gray-300'>
            <div className='w-full border border-violet-900' />
            <h1 className='poppins-extralight text-sm '>
              OU
            </h1>
            <div className='w-full border border-violet-900' />
          </div>
          <div className='flex flex-col w-full h-30 items-center justify-center'>
            <button className='poppins-extralight border border-neutral-900 text-xl hover:bg-violet-900 hover:border-violet-900 cursor-pointer transition-all duration-300 text-white flex gap-5 items-center justify-center p-2 rounded'>
              <FaGoogle />
              Continue com o Google
            </button>
          </div>
        </footer>
      </div>
      {isModalOpen && (
        <section className='relative bg-white h-screen'>

        </section>
      )}
    </section>
  )
}

export default Login