from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbsparta

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/order', methods=['POST'])
def post_order():
    name_receive = request.form['name_give']
    count_receive = request.form['count_give']
    addr_receive = request.form['addr_give']
    tel_receive = request.form['tel_give']

    orders = {
        'name': name_receive,
        'count': count_receive,
        'addr': addr_receive,
        'tel': tel_receive
    }
    db.orders.insert_one(orders)

    return jsonify({'result': 'success', 'msg': '주문이 완료 되었습니다!'})


@app.route('/order', methods=['GET'])
def read_order():
    orders = list(db.orders.find({}, {'_id': 0}))
    print(orders)
    return jsonify({'result': 'success', 'orders': orders})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
