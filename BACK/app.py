from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

def buscar_clima_api(cidade):
    API_KEY = 'b4b89c5a2cc4047d61faf55ba73e6845' #CHAVE
    url = f'https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid={API_KEY}&units=metric&lang=pt_br'

    try:
        response = requests.get(url)
        if response.status_code == 200:
            dados = response.json()
            return {
                'sucesso': True,
                'temperatura': dados['main']['temp'],
                'descricao': dados['weather'][0]['description'],
                'umidade': dados['main']['humidity'],
                'cidade': dados['name']
            }
        else:
            return {'sucesso': False, 'erro': 'Cidade não encontrada'}
    except Exception as e:
        return {'sucesso': False, 'erro': str(e)}
        
@app.route('/consultar', methods=['GET'])
def cosultar():

        cidade = request.args.get('cidade')
        
        if not cidade:
            return jsonify({'sucesso': False, 'erro': 'Nome da cidade não informado'}), 400
        
        resultado = buscar_clima_api(cidade)
        return jsonify(resultado)
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)