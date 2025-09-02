import { SignConfig, SignType } from "../types";

const API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

if (!API_TOKEN) {
  console.error("HUGGINGFACE_API_TOKEN environment variable is not set. Image generation will not work.");
}

export async function generateSignImage(
  aiStylePrompt: string,
  storeType: string,
  storeName: string,
  signConfig: SignConfig
): Promise<string> {
  if (!API_TOKEN) {
    return Promise.reject(new Error("Hugging Face API Token is not configured."));
  }

  const { text, textColor, backgroundColor, fontStyle, signType, width, height } = signConfig;

  const imageGenPrompt = `Create a photorealistic image mockup of a store sign.
  Sign Type: "${signType}"
  Business Name: "${storeName}"
  Business Type: "${storeType}"
  Sign Text: "${text}"
  Style: "${aiStylePrompt}"
  Text Color: ${textColor}
  Background Color: ${backgroundColor}
  Font Style: ${fontStyle}
  Dimensions: ${width}x${height}
  Make it photorealistic and professional looking.`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: imageGenPrompt,
        parameters: {
          negative_prompt: "blurry, low quality, distorted text, unrealistic",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          width: 1024,
          height: 768
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const imageBlob = await response.blob();
    const base64Data = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(imageBlob);
    });

    return base64Data as string;
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    if (error instanceof Error) {
      throw new Error(`Hugging Face API error: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating the image.');
  }
}