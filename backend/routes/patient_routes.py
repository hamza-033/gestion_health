from flask import Blueprint, request, jsonify
from models.patient_model import PatientModel
from neo_services.neo_patient import NeoPatient

patient_bp = Blueprint("patient", __name__, url_prefix="/patients")

@patient_bp.route("", methods=["POST"])
def create_patient():
    data = request.get_json()
    patient_id = PatientModel.create(data)

    # Création dans Neo4j
    NeoPatient.create_patient(
        patient_id=patient_id,
        name=data.get("name"),
        email=data.get("email")
    )

    return jsonify({"_id": patient_id}), 201

@patient_bp.route("", methods=["GET"])
def get_all_patients():
    # Option 1: Get from MongoDB only
    all_patients = PatientModel.find_all()
    for p in all_patients:
        p["_id"] = str(p["_id"])
    return jsonify(all_patients), 200

    # Option 2: Get from Neo4j with relationships
    # all_patients = NeoPatient.get_all_patients()
    # return jsonify(all_patients), 200

@patient_bp.route("/<patient_id>", methods=["PUT"])
def update_patient(patient_id):
    data = request.get_json()
    updated = PatientModel.update(patient_id, data)
    if updated:
        # Mise à jour Neo4j
        NeoPatient.update_patient(
            patient_id=patient_id,
            name=data.get("name"),
            email=data.get("email")
        )
        return jsonify({"msg": "Patient mis à jour"}), 200
    return jsonify({"error": "Non trouvé"}), 404

@patient_bp.route("/<patient_id>", methods=["DELETE"])
def delete_patient(patient_id):
    deleted = PatientModel.delete(patient_id)
    if deleted:
        NeoPatient.delete_patient(patient_id)
        return jsonify({"msg": "Patient supprimé"}), 200
    return jsonify({"error": "Non trouvé"}), 404