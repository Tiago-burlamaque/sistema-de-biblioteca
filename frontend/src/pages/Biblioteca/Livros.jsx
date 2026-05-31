import axios from "axios"
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'

const Livro = (props) => {





    return (
        <>
            <div className="border-b-2">

                <h1 className="poppins-extrabold">{props.titulo}</h1>
                <h2 className="bold">{props.autor}</h2>
                <h2 className="bold">{props.genero}</h2>
                <h2 className="bold">{props.ano}</h2>

                <h2 className="poppins-bold">
                    {props.disponivel ? 'Disponível' : 'Indisponível'}
                </h2>

            </div>


        </>

    )
}

export default Livro