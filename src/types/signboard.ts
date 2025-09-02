export type SignBoardConfig = {
  businessName: string;
  businessType: string;
  signText: string;
  logo?: File | null;
  logoUrl?: string;
  width: number;
  height: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  textColor: string;
  backgroundColor: string;
  signType: SignType;
  effectType: EffectType;
  designStyle: string;
};

export interface StoreInfo {
  storeName: string;
  businessType: string;
  description?: string;
}

export interface AIDesignRequest {
  storeInfo: StoreInfo;
  aiPrompt: string;
  userId: string;
}

export interface GeneratedDesign {
  id: string;
  storeInfo: StoreInfo;
  aiPrompt: string;
  images: string[];
  createdAt: string;
  userId: string;
}

export type SignType = 
  | 'neon'
  | 'led'
  | 'backlit'
  | 'channel'
  | '3d'
  | 'lightbox'
  | 'acrylic'
  | 'metal';

export type EffectType =
  | 'glow'
  | 'shadow'
  | 'outline'
  | 'reflection'
  | 'metallic'
  | 'glass'
  | 'none';

export type FontFamily =
  | 'sans'
  | 'serif'
  | 'mono'
  | 'display'
  | 'handwritten'
  | 'decorative';

export type FontWeight =
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold';

export type SignBoardPreset = {
  id: string;
  name: string;
  config: Partial<SignBoardConfig>;
  previewImage: string;
};

export interface SignBoardDesignerProps {
  initialConfig?: Partial<SignBoardConfig>;
  onSave?: (config: SignBoardConfig, imageUrl: string) => void;
  onOrder?: (config: SignBoardConfig, imageUrl: string) => Promise<{ orderId: string; estimatedDelivery: string }>;
}

export interface PreviewPanelProps {
  config: SignBoardConfig;
  generatedImage: string | null;
  isGenerating: boolean;
  error: string | null;
}

export interface ControlPanelProps {
  config: SignBoardConfig;
  onConfigChange: (updates: Partial<SignBoardConfig>) => void;
  onGeneratePreview: () => void;
  onOrder: () => void;
  isGenerating: boolean;
  onUploadLogo: (file: File) => void;
}

export interface OrderDetails {
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