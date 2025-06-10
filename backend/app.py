from flask import Flask
from flask_cors import CORS
from mongo_config import init_mongo
from neo4j_config import init_neo4j
from routes.patient_routes import patient_bp

# Import des blueprints
from routes.rendezvous_routes import rdv_bp
from routes.consultation_routes import cons_bp

def create_app():
    app = Flask(__name__)
    CORS(app)  # Autorise toutes les origines par défaut
    # Initialiser MongoDB et Neo4j
    init_mongo(app)
    init_neo4j()
    # Enregistrer les blueprints
    app.register_blueprint(rdv_bp)
    app.register_blueprint(cons_bp)
    app.register_blueprint(patient_bp)

return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
