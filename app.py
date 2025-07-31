from flask import Flask, jsonify, request
from models import db, Product
import config

from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ← This is essential

app.config.from_object(config)
db.init_app(app)

@app.route("/api/products", methods=["GET"])
def get_all_products():
    try:
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))
        products = Product.query.paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            "page": page,
            "per_page": per_page,
            "total": products.total,
            "products": [p.to_dict() for p in products.items]
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/products/<int:id>", methods=["GET"])
def get_product_by_id(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product.to_dict()), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not Found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal Server Error"}), 500

if __name__ == "__main__":
    app.run(debug=True)
