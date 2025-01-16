import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
from imblearn.over_sampling import RandomOverSampler

# Create flask app
flask_app = Flask(__name__)
# model = pickle.load(open("model_balanced_df.pkl", "rb"))

df = pd.read_csv("dataset-1.csv")
X = df[['ph', 'temperature', 'turbidity']]
y = df['fish']
oversampler = RandomOverSampler(sampling_strategy='auto', random_state=42)
X_resampled, y_resampled = oversampler.fit_resample(X, y)
balanced_df = pd.concat([X_resampled, y_resampled], axis=1)

X = balanced_df[['ph', 'temperature', 'turbidity']]
y = balanced_df['fish']
train_X, test_X, train_y, test_y = train_test_split(X, y, test_size=0.25, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(train_X, train_y)

@flask_app.route("/")
def Home():
    return render_template("index.html")

@flask_app.route("/predict", methods = ["POST"])
def predict():
    float_features = [float(x) for x in request.form.values()]
    print(float_features)
    ph_value = float_features[0]
    temp_value = float_features[1]
    turb_value = float_features[2]
    features = [np.array(float_features)]

    predicted_species = model.predict(features)

    possible_species1 = set(balanced_df[balanced_df['ph'] == ph_value]['fish'])
    possible_species2 = set(balanced_df[balanced_df['temperature'] == temp_value]['fish'])
    possible_species3 = set(balanced_df[balanced_df['turbidity'] == turb_value]['fish'])

    combined_species = list(possible_species1 | possible_species2 | possible_species3)

    response_data = {
        "single": predicted_species[0],
        "other": combined_species
    }

    return jsonify(response_data)

# -----------------
@flask_app.route("/get_min_max", methods = ["POST"])
def get_min_max():
    df = pd.read_csv("dataset-1.csv")
    ph_min=df['ph'].min()
    ph_max=df['ph'].max()
    temperature_min=df['temperature'].min()
    temperature_max=df['temperature'].max()
    turbidity_min=df['turbidity'].min()
    turbidity_max=df['turbidity'].max()

    data = str(ph_min)+"-"+str(ph_max)+"-"+str(temperature_min)+"-"+str(temperature_max)+"-"+str(turbidity_min)+"-"+str(turbidity_max)
    return data;

# -----------------

@flask_app.route("/get_fish_name", methods = ["POST"])
def get_fish_name():
    df = pd.read_csv("dataset-1.csv")
    distinct_fish_species = df['fish'].unique()
    data = "";
    for fish_species in distinct_fish_species:
        data += fish_species+"-"
    return data;

# -----------------

@flask_app.route("/get_value_for_a_fish", methods = ["POST"])
def get_value_for_a_fish():
    float_features = [str(x) for x in request.form.values()]
    fish_name = float_features[0];

    data = pd.read_csv("dataset-1.csv")

    # Step 3: Encode the target variable
    label_encoder = LabelEncoder()
    data['fish_encoded'] = label_encoder.fit_transform(data['fish'])

    # Get the encoded label for the given fish name
    fish_encoded = label_encoder.transform([fish_name])
    if len(fish_encoded) == 0:
        return "Fish name not found in the dataset."

    # Find the samples in the dataset with the same fish label
    suitable_data = data[data['fish_encoded'] == fish_encoded[0]]

    # Calculate the pH range for the selected fish
    min_ph = suitable_data['ph'].min()
    max_ph = suitable_data['ph'].max()

    # Calculate the temperature range for the selected fish
    min_temp = suitable_data['temperature'].min()
    max_temp = suitable_data['temperature'].max()

    # Calculate the turbidity range for the selected fish
    min_turb = suitable_data['turbidity'].min()
    max_turb = suitable_data['turbidity'].max()

    data2 = str(min_ph)+"-"+str(max_ph)+"|"+str(min_temp)+"-"+str(max_temp)+"|"+str(min_turb)+"-"+str(max_turb)
    return data2;

if __name__ == "__main__":
    flask_app.run(debug=True)