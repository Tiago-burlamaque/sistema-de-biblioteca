import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function RegisterBook() {

    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [ano, setAno] = useState('')
    const [genero, setGenero] = useState('')
    const [disponivel, setDisponivel] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/livro/cadastrar", {
                titulo: titulo,
                autor: autor,
                ano: Number(ano),
                genero: genero,
                disponivel: disponivel === 'true' ? 1 : 0
            })

            toast.success("Livro cadastrado com sucesso.")
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Erro ao cadastrar livro")
                return console.log("Erro interno no servidor", error)
            }
            if (error.response.status === 409) {
                return toast.warning("Livro já cadastrado.")
            }
        }
    }

    return (
        <section className='h-screen items-center justify-center flex'>
            <div className='w-300 h-140 top-40 rounded-2xl shadow-2xl  bg-neutral-300 fixed'>
                <header className='h-20 w-full flex items-center justify-center'>
                    <h1 className='poppins-extrabold text-neutral-700 text-4xl'>
                        Registar Livro
                    </h1>
                </header>
                <main>
                    <form className='w-full h-120 border-t-2 border-neutral-700 px-2 py-3' onSubmit={handleRegister}>
                        <div className='flex flex-col h-100 justify-center px-40 '>

                            <label className='poppins-extralight text-xl' htmlFor="titulo">Titulo</label>
                            <input
                                type="text"
                                id='titulo'
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                className='bg-neutral-400 rounded p-2 focus:outline-2 focus:outline-violet-900 transition-all'
                                required />

                            <label className='poppins-extralight text-xl' htmlFor="autor">Autor</label>
                            <input
                                type="text"
                                id='autor'
                                value={autor}
                                onChange={(e) => setAutor(e.target.value)}
                                className='bg-neutral-400 rounded p-2 focus:outline-2 focus:outline-violet-900 transition-all'
                                required />

                            <label className='poppins-extralight text-xl' htmlFor="genero">Genêro</label>
                            <input
                                type="text"
                                id='genero'
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                className='bg-neutral-400 rounded p-2 focus:outline-2 focus:outline-violet-900 transition-all'
                                required />

                            <label className='poppins-extralight text-xl' htmlFor="ano">Ano</label>
                            <input
                                type="number"
                                id='ano'
                                value={ano}
                                onChange={(e) => setAno(e.target.value)}
                                className='bg-neutral-400 rounded p-2 focus:outline-2 focus:outline-violet-900 transition-all'
                                required />

                            <label className='poppins-extralight text-xl' htmlFor="disponivel">Disponivel</label>
                            <select
                                name="disponivel"
                                id="disponivel"
                                value={disponivel}
                                onChange={(e) => setDisponivel(e.target.value)}
                                className='cursor-pointer bg-neutral-400 rounded p-2 focus:outline-2 focus:outline-violet-900'
                            >
                                <option value="">Selecionar</option>
                                <option value="true">Disponivel</option>
                                <option value="false">Não disponivel</option>
                            </select>
                            <button
                                className='p-3 bg-violet-900 mt-5 text-white rounded cursor-pointer hover:bg-violet-950 transition-all duration-300 hover:scale-105'
                                type='submit'>Cadastrar livro</button>
                        </div>
                    </form>
                </main>
            </div>
        </section>
    )
}

export default RegisterBook