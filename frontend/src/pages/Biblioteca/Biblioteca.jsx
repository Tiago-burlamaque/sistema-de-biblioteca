import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Livro from './Livros'
import { toast } from 'react-toastify'

function Biblioteca() {

    const [livros, setLivros] = useState([])
    const [modalEdit, setModalEdit] = useState(false)

    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [ano, setAno] = useState('')
    const [genero, setGenero] = useState('')
    const [disponivel, setDisponivel] = useState('')

    const fetchLivros = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/livro/listar`)

            setLivros(response.data.livros)
            console.log(response.data.livros)
        } catch (error) {
            console.log(`Erro ao carregar dados. ${error}`)
        }
    }

    useEffect(() => {
        fetchLivros()
    }, [])

    const handleDelete = async (id) => {


        try {

            const response = await axios.delete(
                `http://localhost:3000/livro/deletar/${id}`
            );


            toast.success("Livro excluído com sucesso.");
            fetchLivros();


        } catch (error) {
            console.error(error);

        }
    }

    const handleEdit = async (id, e) => {
        e.preventDefault()

        if (titulo == "" || autor == "" || genero == "" || ano == "" || disponivel == "default") {
            return toast.warning("Preencha os campos")
        }

        try {
            const response = await axios.put(
                `http://localhost:3000/livro/atualizar/${id}`,
                {
                    titulo: titulo,
                    autor: autor,
                    ano: ano,
                    genero: genero,
                    disponivel: true || false
                }
            )
            toast.success("Livro atuzalizado com sucesso.")
            // setModalEdit(false)
            setLivros(response.data.livros)
        } catch (error) {
            toast.error("Erro ao atualizar livro.")
            console.log("Erro: ", error)

        }
    }

    return (
        <section className='h-screen flex items-center justify-center'>

            <div className='w-[1200px] h-[560px] rounded-2xl shadow-2xl bg-neutral-300 fixed top-40 '>

                <header className='h-20 w-full flex items-center justify-center'>
                    <h1 className='poppins-extrabold text-neutral-700 text-4xl'>
                        Biblioteca
                    </h1>
                </header>

                <div className='w-full h-full border-t-2 border-neutral-700 px-5 py-3'>


                    {livros.map((livro) => (
                        <>
                            <div className='w-50 h-70 bg-neutral-400 p-4 flex flex-col items-center justify-center rounded-2xl'>

                                <div className='w-full flex flex-col justify-center '>

                                    <Livro
                                        key={livro.id}
                                        id={livro.id}
                                        titulo={livro.titulo}
                                        autor={livro.autor}
                                        genero={livro.genero}
                                        ano={livro.ano}
                                        disponivel={livro.disponivel}
                                    />
                                </div>
                                {modalEdit && (
                                    <section className="fixed inset-0 z-50 flex items-center justify-center">

                                        {/* Fundo escurecido */}
                                        <div
                                            className="absolute inset-0 bg-black/60"
                                            onClick={() => setModalEdit(false)}
                                        />

                                        {/* Modal */}
                                        <main className="relative z-10 h-150 w-100 bg-white rounded-xl shadow-2xl p-6">

                                            <button
                                                className="absolute top-4 right-4 text-3xl cursor-pointer hover:text-red-500 transition-colors"
                                                onClick={() => setModalEdit(false)}
                                            >
                                                ×
                                            </button>

                                            <h1 className="text-2xl font-bold">
                                                Editar Livro
                                            </h1>

                                            <main className='w-full h-120 border-t-2 border-neutral-700 px-2 py-3'>
                                                <div className='flex flex-col h-120 w-full justify-center  '>

                                                    <label className='poppins-extralight text-xl' htmlFor="titulo">Titulo</label>
                                                    <input
                                                        type="text"
                                                        id='titulo'
                                                        value={titulo}
                                                        onChange={(e) => setTitulo(e.target.value)}
                                                        className='poppins-bold bg-neutral-400 rounded p-2 focus:outline-2 focus:outline-violet-900 transition-all w-full'
                                                        required />

                                                    <label className='poppins-extralight text-xl' htmlFor="autor">Autor</label>
                                                    <input
                                                        type="text"
                                                        id='autor'
                                                        value={autor}
                                                        onChange={(e) => setAutor(e.target.value)}
                                                        className='poppins-bold bg-neutral-400 rounded p-2 focus:outline-2 focus:outline-violet-900 transition-all w-full'
                                                        required />

                                                    <label className='poppins-extralight text-xl' htmlFor="genero">Genêro</label>
                                                    <input
                                                        type="text"
                                                        id='genero'
                                                        value={genero}
                                                        onChange={(e) => setGenero(e.target.value)}
                                                        className='poppins-bold bg-neutral-400 rounded p-2 focus:outline-2 focus:outline-violet-900 transition-all w-full'
                                                        required />

                                                    <label className='poppins-extralight text-xl' htmlFor="ano">Ano</label>
                                                    <input
                                                        type="number"
                                                        id='ano'
                                                        value={ano}
                                                        onChange={(e) => setAno(e.target.value)}
                                                        className='poppins-bold bg-neutral-400 rounded p-2 focus:outline-2 focus:outline-violet-900 transition-all w-full'
                                                        required />

                                                    <label className='poppins-extralight text-xl' htmlFor="disponivel">Disponivel</label>
                                                    <select
                                                        name="disponivel"
                                                        id="disponivel"
                                                        value={disponivel}
                                                        onChange={(e) => setDisponivel(e.target.value)}
                                                        className='cursor-pointer bg-neutral-400 rounded p-2 focus:outline-2 focus:outline-violet-900'
                                                    >
                                                        <option value="default">Selecionar</option>
                                                        <option value="true">Disponivel</option>
                                                        <option value="false">Não disponivel</option>
                                                    </select>
                                                    <button
                                                        className='p-3 bg-violet-900 mt-5 text-white rounded cursor-pointer hover:bg-violet-950 transition-all duration-300 hover:scale-105'
                                                        onClick={(e) => handleEdit(livro.id, e)}>Atuzalizar Livro</button>
                                                </div>
                                            </main>
                                        </main>

                                    </section>
                                )}

                                <div className="flex items-center justify-center gap-4 h-25">

                                    <button
                                        className="bg-violet-900 text-white cursor-pointer hover:bg-violet-950 transition-colors duration-300 rounded poppins-extrabold p-2"
                                        onClick={() => setModalEdit(true)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="bg-red-500 text-white cursor-pointer hover:bg-red-900 transition-colors duration-300 rounded poppins-extrabold p-2"
                                        onClick={() => handleDelete(livro.id)}
                                    >
                                        Excluir
                                    </button>

                                </div>
                            </div>
                        </>
                    ))}

                </div >

            </div>

        </section>
    )
}

export default Biblioteca