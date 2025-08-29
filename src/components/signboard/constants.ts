import { SignType, EffectType, FontFamily, FontWeight, SignBoardPreset } from "../../types/signboard";

export const SIGN_TYPES: { value: SignType; name: string; description: string }[] = [
  { value: 'neon', name: 'Neon Sign', description: 'Glowing tubes filled with neon gas, creating a vibrant, colorful effect' },
  { value: 'led', name: 'LED Display', description: 'Energy-efficient light-emitting diodes with bright, consistent illumination' },
  { value: 'backlit', name: 'Backlit Sign', description: 'Illuminated from behind, creating a halo effect around text or graphics' },
  { value: 'channel', name: 'Channel Letters', description: 'Individual 3D letters, typically illuminated from within or behind' },
  { value: '3d', name: '3D Letters', description: 'Dimensional letters that stand out from the mounting surface' },
  { value: 'lightbox', name: 'Light Box', description: 'Enclosed box with translucent front panel and internal lighting' },
  { value: 'acrylic', name: 'Acrylic Sign', description: 'Modern, sleek signs made from acrylic material' },
  { value: 'metal', name: 'Metal Sign', description: 'Durable signs made from aluminum, steel, or other metals' }
];

export const EFFECT_TYPES: { value: EffectType; name: string }[] = [
  { value: 'glow', name: 'Glow Effect' },
  { value: 'shadow', name: 'Drop Shadow' },
  { value: 'outline', name: 'Outlined Text' },
  { value: 'reflection', name: 'Reflection' },
  { value: 'metallic', name: 'Metallic Finish' },
  { value: 'glass', name: 'Glass Effect' },
  { value: 'none', name: 'No Effect' }
];

export const FONT_FAMILIES: { value: FontFamily; name: string }[] = [
  { value: 'sans', name: 'Sans-Serif' },
  { value: 'serif', name: 'Serif' },
  { value: 'mono', name: 'Monospace' },
  { value: 'display', name: 'Display' },
  { value: 'handwritten', name: 'Handwritten' },
  { value: 'decorative', name: 'Decorative' }
];

export const FONT_WEIGHTS: { value: FontWeight; name: string }[] = [
  { value: 'light', name: 'Light' },
  { value: 'regular', name: 'Regular' },
  { value: 'medium', name: 'Medium' },
  { value: 'semibold', name: 'Semibold' },
  { value: 'bold', name: 'Bold' }
];

export const COLOR_PRESETS = [
  { value: '#FFFFFF', name: 'White' },
  { value: '#000000', name: 'Black' },
  { value: '#FF0000', name: 'Red' },
  { value: '#00FF00', name: 'Green' },
  { value: '#0000FF', name: 'Blue' },
  { value: '#FFFF00', name: 'Yellow' },
  { value: '#FF00FF', name: 'Magenta' },
  { value: '#00FFFF', name: 'Cyan' },
  { value: '#FFA500', name: 'Orange' },
  { value: '#800080', name: 'Purple' },
  { value: '#008080', name: 'Teal' },
  { value: '#FFC0CB', name: 'Pink' },
  { value: '#A52A2A', name: 'Brown' },
  { value: '#808080', name: 'Gray' },
  { value: '#FFD700', name: 'Gold' },
  { value: '#C0C0C0', name: 'Silver' }
];

export const BUSINESS_TYPE_SUGGESTIONS = [
  'Restaurant',
  'Café',
  'Retail Store',
  'Boutique',
  'Salon',
  'Barbershop',
  'Spa',
  'Gym',
  'Fitness Studio',
  'Bakery',
  'Bar',
  'Pub',
  'Nightclub',
  'Hotel',
  'Motel',
  'Office',
  'Dental Clinic',
  'Medical Practice',
  'Pharmacy',
  'Law Firm',
  'Accounting Firm',
  'Real Estate Agency',
  'Art Gallery',
  'Studio',
  'Workshop',
  'Auto Shop',
  'Repair Shop',
  'Bookstore',
  'Electronics Store',
  'Grocery Store',
  'Convenience Store'
];

export const DESIGN_STYLE_SUGGESTIONS = [
  'Modern and minimalist',
  'Vintage and retro',
  'Bold and vibrant',
  'Elegant and sophisticated',
  'Industrial and rugged',
  'Playful and fun',
  'Luxurious and premium',
  'Clean and professional',
  'Artistic and creative',
  'Classic and timeless',
  'Futuristic and high-tech',
  'Rustic and handcrafted',
  'Sleek and contemporary',
  'Organic and natural',
  'Urban and street style'
];

export const SIGN_BOARD_PRESETS: SignBoardPreset[] = [
  {
    id: 'modern-neon',
    name: 'Modern Neon',
    previewImage: '/presets/modern-neon.jpg',
    config: {
      signType: 'neon',
      effectType: 'glow',
      fontFamily: 'sans',
      fontWeight: 'bold',
      backgroundColor: '#000000',
      textColor: '#00FFFF'
    }
  },
  {
    id: 'vintage-lightbox',
    name: 'Vintage Lightbox',
    previewImage: '/presets/vintage-lightbox.jpg',
    config: {
      signType: 'lightbox',
      effectType: 'none',
      fontFamily: 'serif',
      fontWeight: 'regular',
      backgroundColor: '#A52A2A',
      textColor: '#FFD700'
    }
  },
  {
    id: 'premium-metal',
    name: 'Premium Metal',
    previewImage: '/presets/premium-metal.jpg',
    config: {
      signType: 'metal',
      effectType: 'metallic',
      fontFamily: 'sans',
      fontWeight: 'light',
      backgroundColor: '#C0C0C0',
      textColor: '#000000'
    }
  },
  {
    id: 'minimal-acrylic',
    name: 'Minimal Acrylic',
    previewImage: '/presets/minimal-acrylic.jpg',
    config: {
      signType: 'acrylic',
      effectType: 'glass',
      fontFamily: 'sans',
      fontWeight: 'medium',
      backgroundColor: '#FFFFFF',
      textColor: '#000000'
    }
  },
  {
    id: 'bold-3d',
    name: 'Bold 3D',
    previewImage: '/presets/bold-3d.jpg',
    config: {
      signType: '3d',
      effectType: 'shadow',
      fontFamily: 'display',
      fontWeight: 'bold',
      backgroundColor: '#FFFFFF',
      textColor: '#FF0000'
    }
  },
  {
    id: 'elegant-channel',
    name: 'Elegant Channel',
    previewImage: '/presets/elegant-channel.jpg',
    config: {
      signType: 'channel',
      effectType: 'reflection',
      fontFamily: 'serif',
      fontWeight: 'semibold',
      backgroundColor: '#000000',
      textColor: '#FFD700'
    }
  }
]; 