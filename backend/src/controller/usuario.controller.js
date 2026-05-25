import db from '../database/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotnenv from 'dotenv'

dotnenv.config()

export const createUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.json({ message: "Preencha os campos." })
        }

        const [usuarios] = await db.query("SELECT nome, email, senha FROM usuario WHERE email = ?", [email])

        if (usuarios.length > 0) {
            return res.status(409).json({
                message: "Usuário já cadastrado."
            })
        }

        const salts = 10
        const hashPassword = await bcrypt.hash(senha, salts)

        const [rows] = await db.query('INSERT INTO usuario (nome, email, senha, ativo) VALUES (?, ?, ?, 1)', [nome, email, hashPassword])

        return res.status(201).json({ message: "Usuário criado com sucesso." })
    } catch (error) {

        console.log(error)
        return res.status(500).json({ message: "Erro interno no servidor.", erro: error })
    }
}

export const loginUser = async (req, res) => {

    try {

        const { email, senha } = req.body;

        if (!email || !senha) {

            return res.status(400).json({
                message: "Preencha os campos."
            })

        }

        // Busca usuário SOMENTE pelo email
        const [usuarios] = await db.query(
            "SELECT id, nome, email, senha FROM usuario WHERE email = ? AND ativo = 1",
            [email]
        )

        // Verifica se encontrou
        if (usuarios.length === 0) {

            return res.status(401).json({
                message: "Email ou senha inválidos."
            })

        }

        const usuario = usuarios[0]

        // Compara senha digitada com hash do banco

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        )

        if (!senhaCorreta) {

            return res.status(401).json({
                message: "Email ou senha inválidos."
            })

        }

        // Gera token

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(200).json({
            message: "Usuário logado com sucesso.",
            token,
            nome: usuario.nome,
            email: usuario.email
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            message: "Erro interno no servidor."
        })

    }

}