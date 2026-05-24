import db from '../database/database.js'

export const getAllBooks = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT titulo, autor, genero, ano, disponivel FROM livro WHERE ativo = 1")

        return res.status(200).json({
            message: "Livros cadastrados: ",
            livros: rows
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: "Erro interno no servidor: ",
            erro: error
        })
    }
}

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query("SELECT titulo, autor, genero, ano, disponivel FROM livro WHERE id = ?", [id])

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Livro não encontrado."
            })
        }

        return res.status(200).json({
            message: "Livro encontrado.",
            livro: rows
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Erro interno no servidor",
            erro: error
        })
    }
}

export const postBook = async (req, res) => {
    try {
        const { titulo, autor, genero, ano, disponivel } = req.body;

        if (!titulo || !autor || !genero || !ano || !disponivel) {
            return res.status(400).json({
                message: "Preencha os campos."
            })
        }

        const [existeLivro] = await db.query(
            "SELECT titulo, autor, genero, ano FROM livro WHERE titulo = ? AND ativo = 1",
            [titulo]
        )

        if (existeLivro.length > 0) {

            return res.status(409).json({
                message: "Livro já cadastrado."
            })

        }

        const [rows] = await db.query("INSERT INTO livro (titulo, autor, genero, ano, disponivel, ativo) VALUES (?, ?, ?, ?, ?, 1)", [titulo, autor, genero, ano, disponivel])

        return res.status(201).json({
            message: "Livro cadastrado com sucesso.",
            rows
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Erro interno no servidor",
            erro: error
        })
    }
}


export const putBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, genero, ano, disponivel } = req.body;

        const [existeLivro] = await db.query("SELECT titulo, autor, genero, ano FROM livro")

        const [rows] = await db.query(
            "UPDATE livro SET titulo = ?, autor = ?, genero = ?, ano = ?, disponivel = ? WHERE id = ?", [titulo, autor, genero, ano, disponivel, id]
        )

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Livro não encontrado."
            })
        }

        return res.status(200).json({
            message: "Livro atualizado com sucesso.",
            livro: rows
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Erro interno no servidor.",
            erro: error
        })
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const [existeLivro] = await db.query("SELECT titulo, autor, genero, ano, disponivel FROM livro WHERE id = ?", [id])

        if (existeLivro.length === 0) {
            return res.status(404).json({
                message: "Livro não encontrado."
            })
        }

        const [rows] = await db.query(
            `DELETE FROM livro
            WHERE id = ?`, [id]
        )

        return res.status(200).json({
            message: "Livro deletado com sucesso."
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Erro interno no servidor: ",
            erro: error
        })
    }
}