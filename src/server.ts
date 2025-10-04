import * as express from 'express';
import type {Request, Response} from 'express';
import authRouter from './routes/auth.js';

const app = express.default();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req:Request , res:Response) =>{
    res.send('Shelf api: serwer hula smiga');
});

app.use('/api/auth', authRouter);

app.listen(PORT, ()=>{
    console.log(`[server]: serwer dziala na porcie ${PORT}`);
})
