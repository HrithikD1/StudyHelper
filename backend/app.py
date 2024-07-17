from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Read data from CSV file
data = pd.read_csv("mockdata.csv")

@app.route("/", methods=["GET", "POST"])
def backend():
    global data  # Declare the data variable as global to modify it
    if request.method == "GET":
        return data.to_json(orient="records")
    if request.method == "POST":
        received_data = request.get_json()
        # Convert received data to DataFrame
        updated_data = pd.DataFrame(received_data)
        # Save updated DataFrame to CSV
        updated_data.to_csv("mockdata.csv", index=False)
        # Update the global data variable
        data = updated_data
        return jsonify({"message": "Changes saved successfully"})

@app.route("/backend")
def view():
    return render_template("view.html", data=data.to_html())

if __name__ == "__main__":
    app.run(debug=True)
