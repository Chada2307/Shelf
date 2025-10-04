import * as express from 'express';
import type {Request, Response} from 'express';

const app = express.default();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req:Request , res:Response) =>{
    res.send('Shelf api: konfiguracja ESM/TS zakonczona');
});

app.listen(PORT, ()=>{
    console.log(`[server]: serwer dziala na porcie ${PORT}`);

})
