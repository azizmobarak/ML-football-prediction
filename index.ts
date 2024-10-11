import { initializeModelAndData } from './src/model';
import { trainModel } from './src/train';
import { makePrediction, predictWinner } from './src/prediction';


// Initialize, train, and predict
(async () => {
    await initializeModelAndData().then(async result=>{
        console.log('get model and data...', result.dataLoaded.length);
        await trainModel(result.model, result.dataLoaded);
        const winner = predictWinner('Morocco', 'Qatar',result.model, result.dataLoaded);
        console.log('the winner is ::>> ', winner)
    });
})();
