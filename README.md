# Predicting Aquatic Environment for Fish Species Survival

## Overview
This project focuses on developing a machine learning model using the Random Forest (RF) algorithm to predict fish species survival in specific aquatic environments. The model considers environmental parameters such as pH, temperature, and turbidity to recommend suitable fish species for aquaculture.

## Features
- **Machine Learning Model**: Implements Random Forest for robust classification.
- **Web Application**: Provides two key functionalities:
  1. Predict fish species based on pH, temperature, and turbidity.
  2. Predict aquatic environment parameters based on a selected fish species.
- **Performance**: Achieved 98.31% accuracy on balanced datasets.

## Technologies
- **Python**: Backend development.
- **Flask**: Web application framework.
- **HTML, SCSS, JavaScript**: Frontend development.
- **WEKA**: Used for data analysis and model comparison.

## Dataset
Collected from the Faculty of Fisheries, University of Dhaka, Bangladesh. Includes:
- **Instances**: 191
- **Attributes**: pH, temperature, turbidity, and 11 fish species.

## Results
- The Random Forest model outperforms other classifiers (e.g., Decision Tree, k-NN) in terms of accuracy and kappa statistics.
- Comprehensive analysis via precision, recall, and confusion matrix.

