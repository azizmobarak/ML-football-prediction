import { oneHotEncodeTeam } from "./helper";
import * as tf from '@tensorflow/tfjs';
import { MatchData } from "./types";

export const makePrediction = async(homeTeam: string, awayTeam: string, model: tf.Sequential, dataLoaded: MatchData[]) => {
    console.log('start prediction calculation ...')
    const teams = Array.from(new Set(dataLoaded.map(match => match.home_team)));

    const testMatch = [
        ...oneHotEncodeTeam(homeTeam, teams),
        ...oneHotEncodeTeam(awayTeam, teams),
        0, 0
    ];

    const prediction = model!.predict(tf.tensor2d([testMatch])) as tf.Tensor;
    prediction.print(); 
}

export const predictWinner = (homeTeam: string, awayTeam: string,model: tf.Sequential, dataLoaded: MatchData[]): string => {
    const teams = Array.from(new Set(dataLoaded.map(match => match.home_team)));

    const testMatch = [
        ...oneHotEncodeTeam(homeTeam, teams),
        ...oneHotEncodeTeam(awayTeam, teams),
        0, 0 
    ];

    const prediction = model!.predict(tf.tensor2d([testMatch])) as tf.Tensor;
    const predictionValue = prediction.dataSync()[0];  // Get the predicted value

    return predictionValue > 0 ? homeTeam : awayTeam;
}