import { initializeModelAndData } from './src/model';
import { trainModel } from './src/train';
import { makePrediction, predictWinner } from './src/prediction';
import express, { Request, Response } from 'express';
import { RequestResult, Result } from './src/types';
import { ResponseErrors } from './src/constants';
import cors from 'cors';

const app = express();

app.use(cors({
    origin:"*"
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const PORT = process.env.PORT || 3000;

let dataResult: Result;

app.listen(PORT,async()=>{
  console.log(`start server at ${PORT}`)
  await initializeModelAndData().then(async (result: Result)=>{
    dataResult = result;
    console.log('get model and data...', result.dataLoaded.length);
    await trainModel(result.model, result.dataLoaded);
});
});


app.post('/', async (req:Request<{}, {}, RequestResult>, res: Response)=>{
    try{
    console.log(req.body)
    const { home_team, away_team }  = req.body;
    if(!home_team || !away_team) {
        res.status(404).send({ok: false, error: ResponseErrors.invalid_request})
    }
    const winner = await predictWinner(home_team, away_team,dataResult.model, dataResult.dataLoaded);
    console.log('the winner is ::>> ', winner)
    res.status(200).send({ok:true, data: winner});
    } catch(error) {
        console.log(error)
        res.status(500).send({ok: false, error: ResponseErrors.server_error})
    }
})


// Initialize, train, and predict
// (async () => {
//     await initializeModelAndData().then(async result=>{
//         console.log('get model and data...', result.dataLoaded.length);
//         await trainModel(result.model, result.dataLoaded);
//         // makePrediction : use this instead for prediction caculation result in float
        
//     });
// })();
