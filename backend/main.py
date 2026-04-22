from fastapi import FastAPI
from routes import incidents

app = FastAPI()

app.include_router(incidents.router)

@app.get("/")
def home():
    return {"message": "Aegis Backend Running"}