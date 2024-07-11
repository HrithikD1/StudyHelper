from flask import Flask, request, render_template
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

data = pd.read_csv("mockdata.csv")
print(data.to_string())

@app.route("/backend", methods=["GET", "POST"])
def backend():
    if request.method == "GET":
        return data.to_json()
    if request.method == "POST":
        data = request.data

@app.route("/")
def view():
    return render_template("view.html", data=data.to_html())

if __name__ == "__main__":
    app.run(debug=True)