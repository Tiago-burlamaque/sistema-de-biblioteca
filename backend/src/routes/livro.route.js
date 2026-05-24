import { Router } from 'express'
import { deleteBook, getAllBooks, getBookById, putBook, postBook } from '../controller/livro.controller.js';

const bookRouter = Router();

bookRouter.get('/listar', getAllBooks)
bookRouter.get('/listar/:id', getBookById)
bookRouter.post('/cadastrar', postBook)
bookRouter.put('/atualizar/:id', putBook)
bookRouter.delete('/deletar/:id', deleteBook)

export default bookRouter;