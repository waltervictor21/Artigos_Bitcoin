import json
from flask import Flask, render_template

app = Flask(__name__)

def carregar_artigos():
    with open('artigos.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/artigos')
def artigos():
    lista = carregar_artigos()
    return render_template('artigos.html', artigos=lista)

@app.route('/publique')
def publique():
    return render_template('publique.html')

@app.route('/contribua')
def contribua():
    return render_template('ajuda.html')

@app.route('/contato')
def contato():
    return render_template('contato.html')

if __name__ == '__main__':
    app.run(debug=True)
