from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

data = pd.read_csv("mockdata.csv")
print(data.to_json())

@app.route("/", methods=["GET", "POST"])
def backend():
    if request.method == "GET":
        return data.to_json(orient="records")
    if request.method == "POST":
        received_data = request.get_json()
        # Process the received data if needed
        return jsonify(received_data)

@app.route("/backend")
def view():
    return render_template("view.html", data=data.to_html())

if __name__ == "__main__":
    app.run(debug=True)
