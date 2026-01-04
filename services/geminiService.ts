
import { GoogleGenAI, Type } from "@google/genai";
import { VideoMetadata } from "../types";

export const analyzeVideoUrl = async (url: string): Promise<VideoMetadata> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Analyze this video URL and extract its metadata. If you don't have real-time access to the specific video, generate highly realistic metadata based on the URL structure (platform, identifiers, etc.). URL: ${url}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          author: { type: Type.STRING },
          platform: { type: Type.STRING },
          duration: { type: Type.STRING },
          thumbnailUrl: { type: Type.STRING },
          availableQualities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                size: { type: Type.STRING },
                format: { type: Type.STRING }
              },
              required: ["label", "size", "format"]
            }
          }
        },
        required: ["title", "author", "platform", "duration", "thumbnailUrl", "availableQualities"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as VideoMetadata;
};
