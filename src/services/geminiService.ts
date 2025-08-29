import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_TEXT_MODEL, GEMINI_IMAGE_MODEL } from '../constants';
import { SignConfig, SignType } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This error should ideally be handled more gracefully in the UI,
  // preventing users from attempting AI actions if the key is missing.
  console.error("API_KEY environment variable is not set. AI features will not work.");
  // alert("AI services are currently unavailable. Please contact support."); 
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function generateSignTextSuggestion(
  userPrompt: string, // This is now the 'style/vibe' description
  storeType: string,
  storeName: string,
  signType: SignType
): Promise<string> {
  if (!API_KEY) {
    return Promise.reject(new Error("API Key for Gemini is not configured."));
  }
  
  const fullPrompt = `You are an expert sign copywriter.
A customer is designing a ${signType} for their ${storeType} called "${storeName}".
Their desired style/vibe is: "${userPrompt}".
Suggest a concise, catchy, and professional text for their sign.
The text should be suitable for a ${signType}.
Return only the suggested sign text, without any other commentary.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: fullPrompt,
    });
    
    const text = response.text;
    if (text) {
      return text.trim().replace(/^["']|["']$/g, ''); // Remove surrounding quotes if any
    } else {
      throw new Error('No text content received from AI for sign text suggestion.');
    }
  } catch (error) {
    console.error('Error calling Gemini API for text suggestion:', error);
    if (error instanceof Error) {
        throw new Error(`Gemini API error for text suggestion: ${error.message}`);
    }
    throw new Error('An unknown error occurred while fetching AI text suggestion.');
  }
}

export async function generateSignImage(
  aiStylePrompt: string, // This is the 'style/vibe' description
  storeType: string,
  storeName: string,
  signConfig: SignConfig
): Promise<string> {
  if (!API_KEY) {
    return Promise.reject(new Error("API Key for Gemini is not configured for image generation."));
  }

  const { text, textColor, backgroundColor, fontStyle, signType, width, height } = signConfig;

  const imageGenPrompt = `Create a photorealistic image mockup of a store sign.
  Sign Type: "${signType}"
  Business Name: "${storeName}"
  Business Type: "${storeType}"
  Sign Text: "${text}"
  Desired Overall Style/Vibe: "${aiStylePrompt}"
  
  Key Design Elements to Incorporate:
  - Text Color: ${textColor}
  - Background/Main Color of Sign Structure: ${backgroundColor} (interpret creatively for different sign types, e.g. neon tube color if background is dark, or backing panel color)
  - Font Style Preference: ${fontStyle} (e.g., use a sans-serif font if 'font-sans' is specified)
  - Approximate Aspect Ratio: The sign width is ${width} and height is ${height}. The image should respect a similar aspect ratio for the sign itself.

  Image Requirements:
  - Photorealistic and high quality, suitable for a design preview.
  - Show the sign clearly, as if it's mounted on a typical storefront, hanging professionally, or as a standalone product shot if appropriate for the sign type.
  - For "${signType}", ensure the visual characteristics are prominent (e.g., glowing tubes for Neon, illuminated panel for Lightbox, raised letters for 3D Metal).
  - The environment should be simple and not distract from the sign itself, or a subtle relevant background (e.g. a hint of a brick wall for a rustic sign).
  - Avoid any other text or logos in the image unless it's part of the sign's design as specified.
  Capture the essence of a real-world, professionally made ${signType}.`;

  try {
    const response = await ai.models.generateImages({
        model: GEMINI_IMAGE_MODEL,
        prompt: imageGenPrompt,
        config: {numberOfImages: 1, outputMimeType: 'image/jpeg'},
    });

    if (response.generatedImages && response.generatedImages[0] && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error('No image content received from AI or unexpected image format.');
    }
  } catch (error) {
    console.error('Error calling Gemini Image API:', error);
     if (error instanceof Error) {
        // Check for common API errors based on messages if possible
        if (error.message.includes("blocked")) {
             throw new Error(`Image generation failed: The prompt may have been blocked due to safety policies. Please revise the style description or sign text. (${error.message})`);
        }
        throw new Error(`Gemini Image API error: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating the AI image mockup.');
  }
}
