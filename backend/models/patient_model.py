from bson.objectid import ObjectId
from mongo_config import get_db

class PatientModel:
    @staticmethod
    def create(data: dict) -> str:
        db = get_db()
        result = db.patients.insert_one(data)
        return str(result.inserted_id)

    @staticmethod
    def find_all() -> list:
        db = get_db()
        return list(db.patients.find())

    @staticmethod
    def find(patient_id: str) -> dict:
        db = get_db()
        return db.patients.find_one({"_id": ObjectId(patient_id)})

    @staticmethod
    def update(patient_id: str, data: dict) -> int:
        db = get_db()
        result = db.patients.update_one(
            {"_id": ObjectId(patient_id)}, {"$set": data}
        )
        return result.modified_count

    @staticmethod
    def delete(patient_id: str) -> int:
        db = get_db()
        result = db.patients.delete_one({"_id": ObjectId(patient_id)})
        return result.deleted_count