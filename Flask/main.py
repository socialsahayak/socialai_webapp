from fastapi import FastAPI
import requests

app = FastAPI()

HF_API_URL = "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"  # Replace with your Hugging Face API URL

@app.post("/chatbot")
async def chatbot(input_data: dict):
    response = requests.post(HF_API_URL, json=input_data)
    return response.json()
