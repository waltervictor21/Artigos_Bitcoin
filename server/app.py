import json
import os
from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/templates/pages/articles.html')
def articles_pages();
  json_path = os.path.join('server', 'data', 'articles.json')
  with open('articles.json', 'r', encoding='utf-8') as f:
        return json.load(f)
  return render_template('pages/articles.html', artigos=artigos)

if __name__ == '__main__':
    app.run(debug=True)  
