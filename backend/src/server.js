import express from 'express'
import cors from 'cors'
import userRouter from './routes/usuario.route.js'
import bookRouter from './routes/livro.route.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/livro', bookRouter)

app.get("/test", (req, res) => {
    res.send("Teste")
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000.")
})