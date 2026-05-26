import axios from "axios"
import { toast } from 'react-toastify'

const Livro = ({ id, titulo, autor, genero, ano, disponivel }) => {

    const handleDelete = async () => {
        try {

            await axios.delete(`http://localhost:3000/deletar/${id}`)

            toast.success("Livro deletado com sucesso.")

        } catch (error) {

            toast.error("Erro ao excluir livro.")
            console.log(error)
        }
    }

    const handleEdit = async () => {
        try {

        } catch (error) {

        }
    }

    return (
        <div className="bg-neutral-400 w-50 h-60 p-5 rounded-2xl">

            <div className="border-b-2">

                <h1 className="poppins-extrabold">{titulo}</h1>
                <h2 className="poppins-bold">{autor}</h2>
                <h2 className="poppins-bold">{genero}</h2>
                <h2 className="poppins-bold">{ano}</h2>

                <h2 className="poppins-bold">
                    {disponivel ? 'Disponível' : 'Indisponível'}
                </h2>

            </div>

            <div className="flex items-center justify-center gap-4 h-25">

                <button
                    className="bg-violet-900 text-white cursor-pointer hover:bg-violet-950 transition-colors duration-300 rounded poppins-extrabold p-2"
                    onClick={handleEdit}
                >
                    Editar
                </button>

                <button
                    className="bg-red-500 text-white cursor-pointer hover:bg-red-900 transition-colors duration-300 rounded poppins-extrabold p-2"
                    onClick={handleDelete}
                >
                    Excluir
                </button>

            </div>

        </div>
    )
}

export default Livro