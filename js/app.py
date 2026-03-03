import os
from flask import Flask, request

app = Flask(__name__)

@app.route('/click')
def log_data():
    with open("data.txt", "a") as f:
        f.write(f"IP: {request.remote_addr} | UA: {request.headers.get('User-Agent')}\n")
    return "OK", 200

if __name__ == "__main__":
    # Render передає порт через змінну оточення
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
