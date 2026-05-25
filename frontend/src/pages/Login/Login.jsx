import { IoBookOutline } from "react-icons/io5";
import { FaGoogle, FaUserPlus } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Login() {

  // Inputes de login
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  // Inputs de cadastro
  const [nomeRegister, setNomeRegister] = useState('')
  const [emailRegister, setEmailRegister] = useState('')
  const [senhaRegister, setSenhaRegister] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: email,
        senha: senha
      })

      toast.success("Usuário logado.")
      navigate('/home')
      localStorage.setItem("usuario", JSON.parse(response.data.usuario))
      localStorage.setItem("token", response.data.token)

    } catch (error) {
      if (error.status === 401) {
        return toast.warning("E-mail ou senha inválidos.")
      }
      if (error.status === 500) {
        toast.error("Erro interno no servidor.")
        return console.log(error)
      }
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()


    try {
      if (senhaRegister !== confirmarSenha) {
        return toast.warning("As senhas não considem")
      }

      const response = await axios.post("http://localhost:3000/user/cadastro", {
        nome: nomeRegister,
        email: emailRegister,
        senha: senhaRegister
      })

      toast.success("Usuário cadastrado com sucesso.")
      console.log(response.data)
      setIsModalOpen(false)
    } catch (error) {
      if (error.status === 409) {
        return toast.warning("Usuário já cadastrado.")
      }

      if (error.status === 500) {
        toast.error("Erro interno no servidor.")
        return console.log(error)
      }
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
              className='poppins-extralight w-full p-2 rounded bg-violet-900 hover:border-violet-900 transition-all duration-200 text-white hover:bg-violet-950 text-xl cursor-pointer'
              type='submit'>
              Entrar
            </button>
            <div className='poppins-thin w-full gap-1 my-2 flex items-center justify-center'>
              <h1 className='poppins-extralight '>Não tem uma conta?</h1>
              <button
                className='poppins-bold text-neutral-300 hover:text-neutral-500 transition-all duration-300 cursor-pointer' type='button'
                onClick={() => setIsModalOpen(true)}>Cadastre-se</button>
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
        <section className='h-screen opacity-100 w-screen fixed top-0 right-0'>
          <div className='h-screen opacity-100 items-center justify-center flex py-10 px-40'>
            <div className='h-full w-1/2  bg-neutral-200 rounded-2xl shadow-black shadow-2xl p-10'>
              <header className='flex gap-10 w-full mb-10'>
                <div className='p-3 bg-neutral-300 rounded-2xl'>
                  <FaUserPlus className='text-6xl text-violet-900' />
                </div>
                <div className=' justify-center flex flex-col gap-2'>
                  <h1 className='poppins-extrabold  text-2xl text-neutral-800'>
                    Criar conta
                  </h1>
                  <h2 className='poppins-bold text-sm text-neutral-500'>
                    Preencha os campos para cadastrar
                  </h2>
                </div>
              </header>
              <form className='w-full h-100  text-black gap-5 flex flex-col' onSubmit={handleRegister}>
                <div className='flex flex-col gap-2'>
                  <label className='poppins-bold text-neutral-800' htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    id='nome'
                    value={nomeRegister}
                    onChange={(e) => setNomeRegister(e.target.value)}
                    className='poppins-extralight bg-neutral-400 rounded p-2 text-xl focus:outline-2 focus:outline-violet-900 transition-all' placeholder='Digite seu nome' />

                  <label className='poppins-bold text-neutral-800' htmlFor="gmail">E-mail</label>
                  <input
                    type="email"
                    id='gmail'
                    value={emailRegister}
                    onChange={(e) => setEmailRegister(e.target.value)}
                    className='poppins-extralight bg-neutral-400 rounded p-2 text-xl focus:outline-2 focus:outline-violet-900 transition-all' placeholder='Digite seu e-mail' />

                  <label className='poppins-bold text-neutral-800' htmlFor="password">Senha</label>
                  <input
                    type="password"
                    id='password'
                    value={senhaRegister}
                    onChange={(e) => setSenhaRegister(e.target.value)}
                    className='poppins-extralight bg-neutral-400 rounded p-2 text-xl focus:outline-2 focus:outline-violet-900 transition-all' placeholder='Digite sua senha' />

                  <label className='poppins-bold text-neutral-800' htmlFor="confirmarSenha">Repita a senha</label>
                  <input
                    type="password"
                    id='confirmarSenha'
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className='poppins-extralight bg-neutral-400 rounded p-2 text-xl focus:outline-2 focus:outline-violet-900 transition-all' placeholder='Confirme sua senha' />
                </div>

                <button
                  type='submit'
                  className='poppins-extralight w-full p-2 rounded bg-violet-900 hover:border-violet-900 transition-all duration-200 text-white hover:bg-violet-950 text-xl cursor-pointer'>
                  Cadastrar
                </button>
                <div className='flex gap-1 w-full justify-center'>
                  <h1 className='poppins-extralight '>Já tem uma conta?</h1>
                  <button className='poppins-bold text-neutral-700 hover:text-neutral-950 transition-all duration-300 cursor-pointer' type='button'
                    onClick={() => setIsModalOpen(false)}>Faça login</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </section>
  )
}

export default Login