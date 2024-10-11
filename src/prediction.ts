import { oneHotEncodeTeam } from "./helper";
import * as tf from '@tensorflow/tfjs';
import { MatchData } from "./types";

// Function to make predictions
export const makePrediction = async(homeTeam: string, awayTeam: string, model: tf.Sequential, dataLoaded: MatchData[]) => {
    console.log('start prediction calculation ...')
    const teams = Array.from(new Set(dataLoaded.map(match => match.home_team)));

    const testMatch = [
        ...oneHotEncodeTeam(homeTeam, teams),
        ...oneHotEncodeTeam(awayTeam, teams),
        0, 0  // Placeholder scores
    ];

    const prediction = model!.predict(tf.tensor2d([testMatch])) as tf.Tensor;
    prediction.print();  // Output the prediction
}

export const predictWinner = (homeTeam: string, awayTeam: string,model: tf.Sequential, dataLoaded: MatchData[]): string => {
    const teams = Array.from(new Set(dataLoaded.map(match => match.home_team)));

    const testMatch = [
        ...oneHotEncodeTeam(homeTeam, teams),
        ...oneHotEncodeTeam(awayTeam, teams),
        0, 0  // Placeholder for scores
    ];

    const prediction = model!.predict(tf.tensor2d([testMatch])) as tf.Tensor;
    const predictionValue = prediction.dataSync()[0];  // Get the predicted value

    // Interpretation: If prediction is closer to 1, home team wins. If closer to -1, away team wins.
    return predictionValue > 0 ? homeTeam : awayTeam;
}