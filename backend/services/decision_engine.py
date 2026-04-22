def get_decision(incident):
    if incident["type"] == "fire":
        return {
            "priority": "HIGH",
            "actions": ["Dispatch Fire Unit", "Evacuate Area"],
            "responders": ["Fire Dept", "Police"]
        }

    if incident["type"] == "medical":
        return {
            "priority": "MEDIUM",
            "actions": ["Send Ambulance"],
            "responders": ["Medical Team"]
        }

    return {
        "priority": "LOW",
        "actions": ["Monitor"],
        "responders": []
    }