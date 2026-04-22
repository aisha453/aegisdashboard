from fastapi import APIRouter
from uuid import uuid4
from datetime import datetime

from services.decision_engine import get_decision
from services.digital_twin import generate_twin

router = APIRouter()

incidents = []

@router.get("/incidents")
def get_incidents():
    return incidents


@router.post("/report")
def report_incident(data: dict):
    decision = get_decision(data)
    twin = generate_twin(data)

    incident = {
        "incident_id": str(uuid4()),
        "type": data["type"],
        "location": data["location"],
        "priority": decision["priority"],
        "confidence": data["confidence"],
        "status": "ACTIVE",
        "timestamp": str(datetime.now()),
        "decision": decision,
        "digital_twin": twin
    }

    incidents.insert(0, incident)
    return incident


@router.post("/resolve-incident")
def resolve_incident(data: dict):
    for i in incidents:
        if i["incident_id"] == data["incident_id"]:
            i["status"] = "RESOLVED"
    return {"message": "Resolved"}  