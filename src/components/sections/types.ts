export type SignConfig = {
  text: string;
  fontStyle: FontStyle;
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  width: number;
  height: number;
  signType: SignType;
};

export type FontStyle = string;

export type SignType = string;

export type DesignSuggestion = {
  text: string;
  // Add other properties if needed
};

export type OrderRequest = {
  signConfig: SignConfig;
  storeName: string;
  storeType: string;
  stylePrompt: string;
};

export type ContactDetails = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export interface ControlPanelProps {
  config: SignConfig;
  onConfigChange: (updates: Partial<SignConfig>) => void;
  onAISuggestion: (prompt: string, storeType: string, storeName: string) => void;
  isLoadingAISuggestion: boolean;
  aiSuggestionError?: string;
  onAIGenerateImage: (stylePrompt: string, storeType: string, storeName: string) => void;
  isGeneratingImage: boolean;
  imageGenerationError?: string;
  onOpenOrderModal: (storeName: string, storeType: string, stylePrompt: string) => void;
}