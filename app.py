from flask import Flask, render_template, jsonify, session, request, redirect, url_for
from datetime import datetime as dt
import pytz
import requests
from datetime import timedelta

app = Flask(__name__)
app.secret_key = "28wrifn43qwrpfo24wrefichl"
app.permanent_session_lifetime = timedelta(days=30)

display_data = {'actual': {'sensor': {'heat_index': 24.94215049377219, 'temperature': 21.0, 'humidity': 51.0,
                                      'datetime': '29-09-2020 10:22:37', 'id': 3018},
                           },
                'data_stat': {'temperature': {'count': {'data': 3018.0, 'arrow': 'up', '%': 0.57},
                                              'mean': {'data': 25.12, 'arrow': 'down', '%': 0.09},
                                              'std': {'data': 0.50, 'arrow': 'up', '%': 27.04},
                                              'min': {'data': 20.26, 'arrow': 'equal', '%': 0.0},
                                              'max': {'data': 26.0, 'arrow': 'equal', '%': 0.0}},
                              'humidity': {'count': {'data': 3018.0, 'arrow': 'up', '%': 0.57},
                                           'mean': {'data': 39.13, 'arrow': 'up', '%': 0.18},
                                           'std': {'data': 1.48, 'arrow': 'up', '%': 31.31},
                                           'min': {'data': 36.0, 'arrow': 'equal', '%': 0.0},
                                           'max': {'data': 53.0, 'arrow': 'up', '%': 26.19}},
                              'heat_index': {'count': {'data': 3018.0, 'arrow': 'up', '%': 0.57},
                                             'mean': {'data': 25.74, 'arrow': 'down', '%': 0.02},
                                             'std': {'data': 0.24, 'arrow': 'up', '%': 3.42},
                                             'min': {'data': 20.55, 'arrow': 'equal', '%': 0.0},
                                             'max': {'data': 26.27, 'arrow': 'equal', '%': 0.0}}},

                }


@app.route('/dashboard')
def dashboard():
    if 'url' in session:
        return render_template('index.html')
    else:
        return redirect(url_for('popup'))


@app.route('/')
def popup():
    return render_template('popup.html')


@app.route('/set_url', methods=['POST'])
def set_url():
    session['url'] = request.form['url'].strip().lower()
    return redirect(url_for('dashboard'))


@app.route("/get-data")
def get_data():
    def reply(info):
        london = pytz.timezone('Europe/London')
        result = {**info, 'datetime': "{:%d-%m-%Y %H:%M:%S}".format(dt.now().astimezone(london))}
        return jsonify(result), 200

    data = ''
    if 'url' in session:
        try:
            response = requests.get(session['url'])
            data = response.json()
        except Exception as e:
            print(e)
            print('Could not reach server')
    if data != '':
        return reply(data)
    else:
        return reply(display_data)


if __name__ == '__main__':
    app.run()
