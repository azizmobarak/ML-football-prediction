import * as tf from '@tensorflow/tfjs';
import { getData, oneHotEncodeTeam } from './helper';
import { MatchData } from './types';

let dataLoaded: MatchData[] = [];
let model: tf.Sequential | null = null;

// Prediction Model
export const createPredictionModel = (inputSize: number) => {
    const newModel = tf.sequential();
    newModel.add(tf.layers.dense({ units: 10, inputShape: [inputSize], activation: 'relu' }));
    newModel.add(tf.layers.dense({ units: 1, activation: 'tanh' }));

    newModel.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError',
        metrics: ['accuracy']
    });

    return newModel;
}


export const prepareData = (data: MatchData[]) => {
    const teams = Array.from(new Set(data.map(match => match.home_team)));

    const xs = data.map((match: MatchData) => [
        ...oneHotEncodeTeam(match.home_team, teams),
        ...oneHotEncodeTeam(match.away_team, teams),
        match.home_score,
        match.away_score
    ]);

    const ys = data.map(match => match.home_score > match.away_score ? 1 : -1);  // Encode result: 1 for home win, -1 for away win

    return { xs, ys };
};


export const initializeModelAndData = async (): Promise<{model: tf.Sequential,dataLoaded: MatchData[] }> => {
    if (dataLoaded.length === 0) {
        dataLoaded = await getData();
    }

    if (!model) {
        const { xs } = prepareData(dataLoaded);
        model = createPredictionModel(xs[0].length); 
    }
    return {model, dataLoaded};
}