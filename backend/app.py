from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify

from generator import generate_sketch

import io
import base64
import traceback

app = Flask(
    __name__,
    template_folder="../frontend/templates",
    static_folder="../frontend/static"
)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():

    try:

        data = request.get_json()

        description = data.get("description", "")

        if description == "":
            return jsonify({
                "error": "Description missing"
            }), 400

        image = generate_sketch(description)

        buffer = io.BytesIO()

        image.save(buffer, format="PNG")

        img_str = base64.b64encode(
            buffer.getvalue()
        ).decode("utf-8")

        return jsonify({
            "image": img_str
        })

    except Exception as e:

        traceback.print_exc()

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)