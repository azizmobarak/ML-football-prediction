# Football Match Prediction Model

This project is a machine learning model built using TensorFlow.js that predicts the outcome of football matches. The model is trained on historical match data and uses features like home team, away team, and previous scores to predict which team is more likely to win.

## Features

- **One-Hot Encoding**: Teams are one-hot encoded to allow the model to learn from categorical data.
- **TensorFlow.js**: The model is created and trained using TensorFlow.js, allowing for easy integration into web applications.
- **Prediction Output**: The model predicts whether the home team or the away team is more likely to win based on input data.

## Dataset

To train the model, you'll need a dataset of historical football results. The required dataset can be downloaded from [Kaggle: International Football Results from 1872 to 2017](https://www.kaggle.com/datasets/martj42/international-football-results-from-1872-to-2017?resource=download).

### Dataset Format

The CSV file (`results.csv`) should contain the following columns:

- `date`: Date of the match.
- `home_team`: Name of the home team.
- `away_team`: Name of the away team.
- `home_score`: Number of goals scored by the home team.
- `away_score`: Number of goals scored by the away team.
- `tournament`: The tournament or type of match (e.g., Friendly, World Cup).
- `city`: The city where the match took place.
- `country`: The country where the match took place.
- `neutral`: Whether the match was played at a neutral venue (`TRUE` or `FALSE`).

### Required File Path

Place the dataset inside the `src/data/` directory with the name `results.csv`:


## How to Run

1. **Install Dependencies**:
   
   First, install the necessary dependencies by running:
 
  ```bash
   npm install or yarn install
   run yarn start or npm run start


 
