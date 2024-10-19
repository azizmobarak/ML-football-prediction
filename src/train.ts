import { prepareData } from "./model";
import * as tf from '@tensorflow/tfjs';
import { MatchData } from "./types";

export const trainModel = async (model: tf.Sequential, dataLoaded: MatchData[]) => {
    console.log('train the model')
    const { xs, ys } = prepareData(dataLoaded);

    const xsTensor = tf.tensor2d(xs);
    const ysTensor = tf.tensor2d(ys, [ys.length, 1]);

    await model!.fit(xsTensor, ysTensor, {
        epochs: 100,
        shuffle: true,
        callbacks: tf.callbacks.earlyStopping({ monitor: 'loss' })
    });
    console.log('train the model finished ...')
}