from flask import Flask, request, send_file, jsonify
import pandas as pd
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/mockdata', methods=['GET'])
def get_mock_data():
    df = pd.read_csv('mockdata.csv')
    return df.to_json(orient="records")

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})
    
    if file:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        return jsonify({"success": True, "filepath": filepath})

@app.route('/download', methods=['POST'])
def download_file():
    data = request.get_json()
    df = pd.DataFrame(data['tableData'])
    filepath = os.path.join(UPLOAD_FOLDER, 'edited_file.csv')
    df.to_csv(filepath, index=False)
    return send_file(filepath, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
