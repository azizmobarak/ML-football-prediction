import { MatchData } from "./types";

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const filePath = path.resolve(__dirname, 'data/results.csv');

const processMatchData = (matchData: MatchData) => matchData;

export const getData = async (): Promise<MatchData[]> => {
    let data: MatchData[] = [];
 return new Promise((resolve,reject)=>{
    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row: MatchData) => {
       data.push(processMatchData({
        date: row.date,
        home_team: row.home_team,
        away_team: row.away_team,
        home_score: row.home_score,
        away_score: row.away_score,
        tournament: row.tournament,
        city: row.city,
        country: row.country,
        neutral: row.neutral === 'TRUE'
    }));
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
         resolve(data);
    })
    .on('error', (error: any) => {
        console.error('Error processing CSV file:', error);
        reject(error); 
    });
 }) 
}



export const oneHotEncodeTeam = (team: string, teams: string[]) => teams.map(t => (t === team ? 1 : 0));
