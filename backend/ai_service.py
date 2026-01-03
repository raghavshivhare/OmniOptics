import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()


class AIService:
    def __init__(self):
        # Load key and initialize client
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("API Key missing! Check your .env file.")
        self.client = genai.Client(api_key=api_key)

    async def simplify_for_adhd(self, text: str, profile: dict):
        """
        Transforms text based on specific ADHD cognitive needs.
        """
        # Edge Case: Very short or empty text
        if len(text.strip()) < 10:
            return "Please select more text for me to help you focus on."

        # Building the specialized prompt
        system_instruction = (
            "You are a Cognitive Bridge for students with ADHD. "
            "Your goal is to reduce 'Visual Noise' and 'Executive Overwhelm'.\n"
            f"User Preferences: {profile.get('style', 'Bullet Points')}, "
            f"Level: {profile.get('level', 'Simple')}.\n"
        )

        rules = (
            "1. Rewrite the input into short, scannable blocks.\n"
            "2. Use bullet points for any lists.\n"
            "3. BOLD the most important 2-3 words in every sentence.\n"
            "4. Avoid long paragraphs; 2 sentences max per block."
        )

        try:
            print("Sending request to Gemini API...")
            print(f"System Instruction: {system_instruction}")
            print(f"RuleFs: {rules}")
            print(self.client.models.list_models(all=True, page_size=5))
            response = self.client.models.generate_content(
                model="gemini-flash-latest",
                contents=[system_instruction, rules, f"Text: {text}"],
            )

            if not response.text:
                return "The AI couldn't process this content. It might be blocked or empty."

            return response.text

        except Exception as e:
            # Handle API errors or timeouts

            return f"Brain Connection Error: {str(e)}"


# Create a single instance to be used by main.py
ai_brain = AIService()
