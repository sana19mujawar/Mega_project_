import logging
from functools import lru_cache
from typing import Optional, Any, Dict

import google.generativeai as genai
from google.api_core import exceptions as genai_exceptions

from app.core.config import settings

logger = logging.getLogger(__name__)


class GeminiResponse:
    """Lightweight response wrapper to match the helper interface."""

    def __init__(self, text: str, raw_response: Any):
        self.text = text
        self.raw_response = raw_response


@lru_cache(maxsize=1)
def _configure_gemini() -> None:
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured")
    genai.configure(api_key=api_key)


def _normalize_prompt(prompt: str, system_prompt: Optional[str]) -> str:
    base_prompt = prompt.strip()
    if system_prompt:
        return f"{system_prompt.strip()}\n\n{base_prompt}"
    return base_prompt


FALLBACK_MODELS = {
    "models/gemini-1.5-flash": "models/gemini-2.0-flash",
    "models/gemini-1.5-pro": "models/gemini-2.0-flash",
    "models/gemini-pro": "models/gemini-2.0-flash",
    "models/gemini-2.0-flash": "models/gemini-2.0-flash-lite",
}


class GeminiModel:
    """Simple wrapper that provides a generate_content method."""

    def __init__(
        self,
        model_name: Optional[str] = None,
        temperature: float = 0.2,
        max_tokens: int = 2048,
        top_p: float = 0.95,
        top_k: int = 40,
        safety_settings: Optional[Dict[str, str]] = None,
    ) -> None:
        _configure_gemini()
        self.model_name = model_name or settings.GEMINI_MODEL
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.top_p = top_p
        self.top_k = top_k
        self.safety_settings = safety_settings
        self._model = self._build_model(self.model_name)

    def _build_model(self, model_name: str):
        return genai.GenerativeModel(
            model_name=model_name,
            generation_config={
                "temperature": self.temperature,
                "max_output_tokens": self.max_tokens,
                "top_p": self.top_p,
                "top_k": self.top_k,
            },
            safety_settings=self.safety_settings,
        )

    def generate_content(self, prompt: str, system_prompt: Optional[str] = None) -> GeminiResponse:
        if not prompt or not prompt.strip():
            raise ValueError("Prompt must not be empty")

        try:
            response = self._model.generate_content(_normalize_prompt(prompt, system_prompt))
        except genai_exceptions.NotFound as exc:
            fallback_model = FALLBACK_MODELS.get(self.model_name)
            if not fallback_model:
                logger.error("Gemini model %s not available and no fallback configured.", self.model_name)
                raise RuntimeError(f"Gemini API error: {exc.message}") from exc

            logger.warning("Gemini model %s unavailable, falling back to %s", self.model_name, fallback_model)
            self.model_name = fallback_model
            self._model = self._build_model(fallback_model)
            response = self._model.generate_content(_normalize_prompt(prompt, system_prompt))
        except genai_exceptions.GoogleAPICallError as exc:
            logger.error("Gemini API call failed: %s", exc, exc_info=True)
            raise RuntimeError(f"Gemini API error: {exc.message}") from exc
        except Exception as exc:
            logger.error("Gemini API call failed: %s", exc, exc_info=True)
            raise

        text = (getattr(response, "text", None) or "").strip()
        if not text:
            raise RuntimeError("Empty response from Gemini API")

        return GeminiResponse(text=text, raw_response=response)

