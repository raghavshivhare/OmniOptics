from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from services.ai_service import ai_brain

app = FastAPI(title="FocusFlow ADHD API")

# Enable CORS so the browser extension can communicate with this local server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define the structure of the incoming request from your extension
class FocusRequest(BaseModel):
    text: str = Field(..., min_length=1, description="The text to be simplified")
    profile: dict = Field(default={"style": "bullets", "level": "easy"})


@app.get("/health")
def health():
    return {"status": "The Bridge is active"}


@app.post("/process")
async def process_text(request: FocusRequest):
    """
    The main doorway for the extension to request a text transformation.
    """
    try:
        # Pass the request to our AI logic
        result = await ai_brain.simplify_for_adhd(request.text, request.profile)
        return {"status": "success", "data": result}
    except Exception as e:
        # General edge case catch
        raise HTTPException(status_code=500, detail="An internal error occurred.")


if __name__ == "__main__":
    import uvicorn

    # Run the server on port 8000
    uvicorn.run(app, host="127.0.0.1", port=8000)
