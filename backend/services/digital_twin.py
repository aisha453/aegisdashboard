import random

def generate_twin(incident):
    heart_rate = random.randint(80, 140)
    oxygen = random.randint(85, 100)

    risk = "HIGH" if oxygen < 90 or heart_rate > 120 else "LOW"

    return {
        "heart_rate": heart_rate,
        "oxygen_level": oxygen,
        "risk_level": risk
    }