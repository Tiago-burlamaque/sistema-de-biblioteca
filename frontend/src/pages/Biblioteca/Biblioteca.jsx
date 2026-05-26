import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Livro from './Livros'

function Biblioteca() {

    const [livros, setLivros] = useState([])

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

    return (
        <section className='h-screen flex items-center justify-center'>

            <div className='w-[1200px] h-[560px] rounded-2xl shadow-2xl bg-neutral-300 fixed top-40'>

                <header className='h-20 w-full flex items-center justify-center'>
                    <h1 className='poppins-extrabold text-neutral-700 text-4xl'>
                        Biblioteca
                    </h1>
                </header>

                <div className='w-full h-full border-t-2 border-neutral-700 px-5 py-3'>

                    {livros.map((livro) => (
                        <Livro
                            key={livro.id}
                            id={livro.id}
                            titulo={livro.titulo}
                            autor={livro.autor}
                            genero={livro.genero}
                            ano={livro.ano}
                            disponivel={livro.disponivel}
                        />
                    ))}

                </div>

            </div>

        </section>
    )
}

export default Biblioteca