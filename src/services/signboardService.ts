import { SignBoardConfig } from "../types/signboard";

const API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

if (!API_TOKEN) {
  console.error("VITE_HUGGINGFACE_API_TOKEN environment variable is not set. Image generation will not work.");
}

/**
 * Generate a sign board preview image using Hugging Face's SDXL model
 */
export async function generateSignBoardPreview(config: SignBoardConfig): Promise<string> {
  if (!API_TOKEN) {
    return Promise.reject(new Error("Hugging Face API Token is not configured."));
  }

  const { 
    businessName, 
    businessType, 
    signText, 
    fontFamily, 
    fontSize, 
    fontWeight,
    textColor, 
    backgroundColor, 
    signType, 
    effectType,
    width, 
    height,
    designStyle
  } = config;

  // Build a detailed prompt for the image generation
  const imageGenPrompt = `Create a professional, photorealistic mockup of a ${signType} sign for a ${businessType} business.
  Business Name: "${businessName}"
  Sign Text: "${signText}"
  Style: ${designStyle}
  Sign Type: ${signType}
  Effect: ${effectType}
  Text Color: ${textColor}
  Background Color: ${backgroundColor}
  Font: ${fontWeight} ${fontFamily}, ${fontSize}px
  Dimensions: ${width}x${height}mm
  Make it photorealistic, high-quality, and professional looking. The text should be perfectly legible.`;

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
          negative_prompt: "blurry, low quality, distorted text, unrealistic, pixelated, watermark, signature, text artifacts, cropped, low resolution",
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
    const base64Data = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageBlob);
    });

    return base64Data;
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    if (error instanceof Error) {
      throw new Error(`Hugging Face API error: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating the image.');
  }
}

/**
 * Upload a logo file and get a URL for it
 */
export async function uploadLogo(file: File): Promise<string> {
  // In a real app, you would upload to a server or cloud storage
  // For demo purposes, we'll just create a local object URL
  return URL.createObjectURL(file);
}

/**
 * Submit an order for a sign board
 */
export async function submitOrder(
  orderDetails: {
    customerName: string;
    email: string;
    phone: string;
    address: string;
    comments: string;
    quantity: number;
    deliveryDate: string;
    config: SignBoardConfig;
    previewImage: string;
  }
): Promise<{ orderId: string; estimatedDelivery: string }> {
  // In a real app, you would submit to a server
  // For demo purposes, we'll simulate a successful order
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        estimatedDelivery: orderDetails.deliveryDate
      });
    }, 1500);
  });
}

/**
 * Get sign board design suggestions
 */
export async function getDesignSuggestions(businessType: string): Promise<string[]> {
  // In a real app, you would get from a server or AI API
  // For demo purposes, we'll return some hardcoded suggestions
  const suggestions = {
    restaurant: [
      "Modern minimalist design with clean typography",
      "Vintage rustic style with warm colors",
      "Bold and bright with high contrast colors",
      "Elegant script fonts with gold accents",
      "Industrial style with metallic finish"
    ],
    retail: [
      "Contemporary design with brand-focused elements",
      "Sleek and modern with geometric shapes",
      "Colorful and playful with custom typography",
      "Luxury finish with premium materials",
      "Minimalist design with focus on the logo"
    ],
    cafe: [
      "Cozy and inviting with warm tones",
      "Artisanal look with handcrafted feel",
      "Modern coffee shop aesthetic with clean lines",
      "Vintage coffee house style with retro elements",
      "Bright and cheerful with bold typography"
    ],
    default: [
      "Professional and modern design",
      "Classic and timeless appearance",
      "Bold and eye-catching style",
      "Elegant and sophisticated look",
      "Clean and minimalist design"
    ]
  };

  // Return suggestions based on business type or default if not found
  const type = businessType.toLowerCase();
  const result = Object.keys(suggestions).includes(type) 
    ? suggestions[type as keyof typeof suggestions] 
    : suggestions.default;
    
  return Promise.resolve(result);
} 