import React, { useState } from 'react';
import { ControlPanelProps } from '../../types/signboard';
import { 
  SIGN_TYPES, 
  EFFECT_TYPES, 
  FONT_FAMILIES, 
  FONT_WEIGHTS, 
  COLOR_PRESETS,
  BUSINESS_TYPE_SUGGESTIONS,
  DESIGN_STYLE_SUGGESTIONS
} from './constants';

// Control card component for each section
const ControlCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
    <div className="bg-gray-50 dark:bg-slate-700 px-4 py-2 border-b border-gray-200 dark:border-slate-600">
      <h3 className="font-medium text-gray-800 dark:text-white">{title}</h3>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

// Form components
const FormLabel = ({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    {children}
  </label>
);

const FormInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
      bg-white dark:bg-slate-700 text-gray-900 dark:text-white ${className || ''}`}
      {...props}
    />
  )
);

const FormSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={`w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
      bg-white dark:bg-slate-700 text-gray-900 dark:text-white ${className || ''}`}
      {...props}
    />
  )
);

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  onConfigChange,
  onGeneratePreview,
  onOrder,
  isGenerating,
  onUploadLogo
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'design' | 'dimensions'>('details');
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setLogoFile(file);
      onUploadLogo(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      onConfigChange({ [name]: Number(value) });
    } else {
      onConfigChange({ [name]: value });
    }
  };

  const handleColorChange = (name: string, value: string) => {
    onConfigChange({ [name]: value });
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-700 mb-4">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'details'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('details')}
        >
          Business Details
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'design'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('design')}
        >
          Design
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'dimensions'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('dimensions')}
        >
          Dimensions
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'details' && (
          <>
            <ControlCard title="Business Information">
              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="businessName">Business Name</FormLabel>
                  <FormInput
                    id="businessName"
                    name="businessName"
                    value={config.businessName}
                    onChange={handleChange}
                    placeholder="Enter your business name"
                  />
                </div>

                <div>
                  <FormLabel htmlFor="businessType">Business Type</FormLabel>
                  <div className="relative">
                    <FormInput
                      id="businessType"
                      name="businessType"
                      value={config.businessType}
                      onChange={handleChange}
                      placeholder="e.g., Restaurant, Retail Store, Salon"
                      list="businessTypes"
                    />
                    <datalist id="businessTypes">
                      {BUSINESS_TYPE_SUGGESTIONS.map((type) => (
                        <option key={type} value={type} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div>
                  <FormLabel htmlFor="signText">Sign Text</FormLabel>
                  <FormInput
                    id="signText"
                    name="signText"
                    value={config.signText}
                    onChange={handleChange}
                    placeholder="Text to display on your sign"
                  />
                </div>

                <div>
                  <FormLabel htmlFor="logo">Logo (Optional)</FormLabel>
                  <div className="flex items-center space-x-2">
                    <label className="flex-1">
                      <div className="px-4 py-2 bg-gray-100 dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded-md text-center cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-500 transition-colors">
                        {logoFile ? logoFile.name : 'Choose file'}
                      </div>
                      <input
                        type="file"
                        id="logo"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </label>
                    {logoFile && (
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setLogoFile(null);
                          onConfigChange({ logo: null, logoUrl: undefined });
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {config.logoUrl && (
                    <div className="mt-2">
                      <img
                        src={config.logoUrl}
                        alt="Uploaded logo"
                        className="h-16 object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            </ControlCard>

            <ControlCard title="Sign Type">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SIGN_TYPES.map((type) => (
                  <div
                    key={type.value}
                    className={`border rounded-md p-3 cursor-pointer transition-colors ${
                      config.signType === type.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                    onClick={() => onConfigChange({ signType: type.value })}
                  >
                    <div className="font-medium text-gray-800 dark:text-white">{type.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{type.description}</div>
                  </div>
                ))}
              </div>
            </ControlCard>
          </>
        )}

        {activeTab === 'design' && (
          <>
            <ControlCard title="Typography">
              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="fontFamily">Font Family</FormLabel>
                  <FormSelect
                    id="fontFamily"
                    name="fontFamily"
                    value={config.fontFamily}
                    onChange={handleChange}
                  >
                    {FONT_FAMILIES.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </FormSelect>
                </div>

                <div>
                  <FormLabel htmlFor="fontWeight">Font Weight</FormLabel>
                  <FormSelect
                    id="fontWeight"
                    name="fontWeight"
                    value={config.fontWeight}
                    onChange={handleChange}
                  >
                    {FONT_WEIGHTS.map((weight) => (
                      <option key={weight.value} value={weight.value}>
                        {weight.name}
                      </option>
                    ))}
                  </FormSelect>
                </div>

                <div>
                  <div className="flex justify-between">
                    <FormLabel htmlFor="fontSize">Font Size</FormLabel>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{config.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    id="fontSize"
                    name="fontSize"
                    min="12"
                    max="200"
                    value={config.fontSize}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </ControlCard>

            <ControlCard title="Colors">
              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="textColor">Text Color</FormLabel>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="textColor"
                      name="textColor"
                      value={config.textColor}
                      onChange={handleChange}
                      className="w-10 h-10 rounded border border-gray-300 dark:border-slate-600 cursor-pointer"
                    />
                    <div className="flex-1">
                      <FormInput
                        type="text"
                        value={config.textColor}
                        onChange={handleChange}
                        name="textColor"
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {COLOR_PRESETS.slice(0, 8).map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        className="w-6 h-6 rounded-full border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                        onClick={() => handleColorChange('textColor', color.value)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <FormLabel htmlFor="backgroundColor">Background Color</FormLabel>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="backgroundColor"
                      name="backgroundColor"
                      value={config.backgroundColor}
                      onChange={handleChange}
                      className="w-10 h-10 rounded border border-gray-300 dark:border-slate-600 cursor-pointer"
                    />
                    <div className="flex-1">
                      <FormInput
                        type="text"
                        value={config.backgroundColor}
                        onChange={handleChange}
                        name="backgroundColor"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {COLOR_PRESETS.slice(0, 8).map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        className="w-6 h-6 rounded-full border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                        onClick={() => handleColorChange('backgroundColor', color.value)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ControlCard>

            <ControlCard title="Effects">
              <div className="space-y-4">
                <div>
                  <FormLabel htmlFor="effectType">Effect Type</FormLabel>
                  <FormSelect
                    id="effectType"
                    name="effectType"
                    value={config.effectType}
                    onChange={handleChange}
                  >
                    {EFFECT_TYPES.map((effect) => (
                      <option key={effect.value} value={effect.value}>
                        {effect.name}
                      </option>
                    ))}
                  </FormSelect>
                </div>

                <div>
                  <FormLabel htmlFor="designStyle">Design Style</FormLabel>
                  <div className="relative">
                    <FormInput
                      id="designStyle"
                      name="designStyle"
                      value={config.designStyle}
                      onChange={handleChange}
                      placeholder="e.g., Modern, Vintage, Bold"
                      list="designStyles"
                    />
                    <datalist id="designStyles">
                      {DESIGN_STYLE_SUGGESTIONS.map((style) => (
                        <option key={style} value={style} />
                      ))}
                    </datalist>
                  </div>
                </div>
              </div>
            </ControlCard>
          </>
        )}

        {activeTab === 'dimensions' && (
          <ControlCard title="Size & Dimensions">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <FormLabel htmlFor="width">Width</FormLabel>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{config.width} mm</span>
                </div>
                <input
                  type="range"
                  id="width"
                  name="width"
                  min="200"
                  max="2000"
                  step="10"
                  value={config.width}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <FormLabel htmlFor="height">Height</FormLabel>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{config.height} mm</span>
                </div>
                <input
                  type="range"
                  id="height"
                  name="height"
                  min="100"
                  max="1000"
                  step="10"
                  value={config.height}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Aspect Ratio</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {(config.width / config.height).toFixed(2)}:1
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {/* Common size presets */}
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  onClick={() => onConfigChange({ width: 800, height: 400 })}
                >
                  800×400
                </button>
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  onClick={() => onConfigChange({ width: 1000, height: 500 })}
                >
                  1000×500
                </button>
                <button
                  type="button"
                  className="px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  onClick={() => onConfigChange({ width: 1200, height: 600 })}
                >
                  1200×600
                </button>
              </div>
            </div>
          </ControlCard>
        )}

        {/* Action buttons (always visible) */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onGeneratePreview}
            disabled={isGenerating || !config.businessName || !config.signText}
          >
            {isGenerating ? 'Generating...' : 'Generate AI Preview'}
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onOrder}
            disabled={!config.businessName || !config.signText}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}; 