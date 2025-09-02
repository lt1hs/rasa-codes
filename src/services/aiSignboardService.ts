import { StoreInfo, AIDesignRequest, GeneratedDesign } from '../types/signboard';

const API_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_TOKEN;
const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

// Log API token status for debugging
console.log('API Token configured:', !!API_TOKEN);

export class AISignboardService {
  static async generateDesigns(request: AIDesignRequest): Promise<string[]> {
    const { storeInfo, aiPrompt } = request;
    
    try {
      // Try real API first if token exists
      if (API_TOKEN) {
        const prompts = this.createVariedPrompts(storeInfo, aiPrompt);
        const imagePromises = prompts.map(prompt => this.generateSingleImage(prompt));
        const images = await Promise.all(imagePromises);
        return images;
      }
    } catch (error) {
      console.warn('API generation failed, using mock images:', error);
    }
    
    // Fallback to mock images for testing
    return this.generateMockImages(storeInfo);
  }

  private static generateMockImages(storeInfo: StoreInfo): string[] {
    const colors = ['#57DCDA', '#3AADAB', '#4ABEBC', '#2A9D9A'];
    const backgrounds = ['#333', '#222', '#111', '#444'];
    
    return colors.map((color, index) => {
      const bg = backgrounds[index];
      const svg = `
        <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${bg};stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad${index})"/>
          <rect x="20" y="20" width="360" height="160" fill="none" stroke="${color}" stroke-width="2" rx="10"/>
          <text x="50%" y="45%" font-family="Arial" font-size="24" fill="${color}" text-anchor="middle" font-weight="bold">
            ${storeInfo.storeName}
          </text>
          <text x="50%" y="65%" font-family="Arial" font-size="16" fill="${color}" text-anchor="middle" opacity="0.8">
            ${storeInfo.businessType}
          </text>
          <circle cx="350" cy="50" r="15" fill="${color}" opacity="0.6"/>
          <text x="50%" y="85%" font-family="Arial" font-size="12" fill="${color}" text-anchor="middle" opacity="0.6">
            طرح ${index + 1} - نمونه آزمایشی
          </text>
        </svg>
      `;
      
      return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
    });
  }

  private static createVariedPrompts(storeInfo: StoreInfo, aiPrompt: string): string[] {
    const basePrompt = `Professional signboard for "${storeInfo.storeName}", a ${storeInfo.businessType} business. ${aiPrompt}`;
    
    return [
      `${basePrompt} Modern minimalist style, clean typography, high contrast`,
      `${basePrompt} Bold and eye-catching design, vibrant colors, professional lighting`,
      `${basePrompt} Elegant and sophisticated look, premium materials, subtle effects`,
      `${basePrompt} Contemporary design with creative elements, balanced composition`
    ];
  }

  private static async generateSingleImage(prompt: string): Promise<string> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          negative_prompt: "blurry, low quality, distorted text, unrealistic, pixelated, watermark, signature, text artifacts, cropped, low resolution, amateur",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          width: 1024,
          height: 768
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const imageBlob = await response.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageBlob);
    });
  }

  static async connectWithTeam(designId: string, userEmail: string): Promise<{ success: boolean; message: string }> {
    // Simulate team connection - in real app, this would create a support ticket or notification
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Our team has been notified and will contact you within 24 hours to finalize your design and complete the order process."
        });
      }, 1000);
    });
  }
}
