from neo4j_config import get_driver

class NeoPatient:
    @staticmethod
    def create_patient(patient_id: str, name: str, email: str = None):
        driver = get_driver()
        if not driver:
            return
        with driver.session() as session:
            session.run(
                """
                CREATE (p:Patient {id: $id, name: $name, email: $email})
                """,
                id=patient_id,
                name=name,
                email=email
            )

    @staticmethod
    def update_patient(patient_id: str, name: str = None, email: str = None):
        driver = get_driver()
        if not driver:
            return
        with driver.session() as session:
            query = "MATCH (p:Patient {id: $id}) SET "
            params = {"id": patient_id}

            if name:
                query += "p.name = $name, "
                params["name"] = name
            if email:
                query += "p.email = $email, "
                params["email"] = email

            query = query.rstrip(", ")
            session.run(query, **params)

    @staticmethod
    def delete_patient(patient_id: str):
        driver = get_driver()
        if not driver:
            return
        with driver.session() as session:
            session.run(
                "MATCH (p:Patient {id: $id}) DETACH DELETE p",
                id=patient_id
            )

    @staticmethod
    def get_all_patients():
        driver = get_driver()
        if not driver:
            return []
        with driver.session() as session:
            result = session.run(
                "MATCH (p:Patient) RETURN p.id as id, p.name as name, p.email as email"
            )
            return [record.data() for record in result]