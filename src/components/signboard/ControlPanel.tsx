import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Enhanced Control Card Component
const ControlCard = ({ title, children, icon }: { title: string; children: React.ReactNode; icon?: string }) => (
  <motion.div 
    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10"
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ duration: 0.2 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#57DCDA]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className="text-xl">{icon}</span>}
        <h3 className="font-semibold text-white text-lg">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  </motion.div>
);

// Enhanced Form Components
const FormLabel = ({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300 mb-2">
    {children}
  </label>
);

const FormInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <motion.input
      ref={ref}
      className={`w-full px-4 py-3 bg-white/[0.05] backdrop-blur-sm border border-white/[0.12] rounded-xl text-white placeholder-gray-400 
      focus:outline-none focus:ring-2 focus:ring-[#57DCDA]/50 focus:border-[#57DCDA]/50 transition-all duration-300 ${className || ''}`}
      whileFocus={{ scale: 1.02 }}
      {...props}
    />
  )
);

const FormSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <motion.select
      ref={ref}
      className={`w-full px-4 py-3 bg-white/[0.05] backdrop-blur-sm border border-white/[0.12] rounded-xl text-white 
      focus:outline-none focus:ring-2 focus:ring-[#57DCDA]/50 focus:border-[#57DCDA]/50 transition-all duration-300 ${className || ''}`}
      whileFocus={{ scale: 1.02 }}
      {...props}
    >
      {children}
    </motion.select>
  )
);

const ColorPicker = ({ value, onChange, colors }: { value: string; onChange: (color: string) => void; colors: string[] }) => (
  <div className="grid grid-cols-6 gap-2">
    {colors.map((color) => (
      <motion.button
        key={color}
        className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
          value === color ? 'border-white scale-110' : 'border-white/20'
        }`}
        style={{ backgroundColor: color }}
        onClick={() => onChange(color)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      />
    ))}
  </div>
);

const SliderInput = ({ label, value, onChange, min, max, step = 1 }: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <FormLabel>{label}</FormLabel>
      <span className="text-sm text-[#57DCDA] font-medium">{value}</span>
    </div>
    <div className="relative">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer slider"
      />
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #57DCDA, #3AADAB);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(87, 220, 218, 0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #57DCDA, #3AADAB);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(87, 220, 218, 0.3);
        }
      `}</style>
    </div>
  </div>
);

const ControlPanel: React.FC<ControlPanelProps> = ({ config, onChange }) => {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'اصلی', icon: '📝' },
    { id: 'design', label: 'طراحی', icon: '🎨' },
    { id: 'effects', label: 'جلوه‌ها', icon: '✨' },
    { id: 'advanced', label: 'پیشرفته', icon: '⚙️' }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-2 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.08]">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {activeTab === 'basic' && (
            <>
              <ControlCard title="محتوای تابلو" icon="📝">
                <div>
                  <FormLabel htmlFor="text">متن اصلی</FormLabel>
                  <FormInput
                    id="text"
                    type="text"
                    value={config.text}
                    onChange={(e) => onChange({ ...config, text: e.target.value })}
                    placeholder="متن تابلو را وارد کنید..."
                  />
                </div>
                
                <div>
                  <FormLabel htmlFor="subtitle">زیرنویس</FormLabel>
                  <FormInput
                    id="subtitle"
                    type="text"
                    value={config.subtitle || ''}
                    onChange={(e) => onChange({ ...config, subtitle: e.target.value })}
                    placeholder="زیرنویس (اختیاری)"
                  />
                </div>

                <div>
                  <FormLabel htmlFor="businessType">نوع کسب‌وکار</FormLabel>
                  <FormSelect
                    id="businessType"
                    value={config.businessType || ''}
                    onChange={(e) => onChange({ ...config, businessType: e.target.value })}
                  >
                    <option value="">انتخاب کنید...</option>
                    {BUSINESS_TYPE_SUGGESTIONS.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </FormSelect>
                </div>
              </ControlCard>

              <ControlCard title="ابعاد و نوع" icon="📏">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormLabel htmlFor="width">عرض (سانتی‌متر)</FormLabel>
                    <FormInput
                      id="width"
                      type="number"
                      value={config.width}
                      onChange={(e) => onChange({ ...config, width: Number(e.target.value) })}
                      min="10"
                      max="500"
                    />
                  </div>
                  <div>
                    <FormLabel htmlFor="height">ارتفاع (سانتی‌متر)</FormLabel>
                    <FormInput
                      id="height"
                      type="number"
                      value={config.height}
                      onChange={(e) => onChange({ ...config, height: Number(e.target.value) })}
                      min="10"
                      max="300"
                    />
                  </div>
                </div>

                <div>
                  <FormLabel htmlFor="signType">نوع تابلو</FormLabel>
                  <FormSelect
                    id="signType"
                    value={config.signType}
                    onChange={(e) => onChange({ ...config, signType: e.target.value as any })}
                  >
                    {SIGN_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </FormSelect>
                </div>
              </ControlCard>
            </>
          )}

          {activeTab === 'design' && (
            <>
              <ControlCard title="فونت و متن" icon="🔤">
                <div>
                  <FormLabel htmlFor="fontFamily">فونت</FormLabel>
                  <FormSelect
                    id="fontFamily"
                    value={config.fontFamily}
                    onChange={(e) => onChange({ ...config, fontFamily: e.target.value })}
                  >
                    {FONT_FAMILIES.map((font) => (
                      <option key={font.value} value={font.value}>{font.label}</option>
                    ))}
                  </FormSelect>
                </div>

                <SliderInput
                  label="اندازه فونت"
                  value={config.fontSize}
                  onChange={(value) => onChange({ ...config, fontSize: value })}
                  min={12}
                  max={72}
                />

                <div>
                  <FormLabel htmlFor="fontWeight">ضخامت فونت</FormLabel>
                  <FormSelect
                    id="fontWeight"
                    value={config.fontWeight}
                    onChange={(e) => onChange({ ...config, fontWeight: e.target.value as any })}
                  >
                    {FONT_WEIGHTS.map((weight) => (
                      <option key={weight.value} value={weight.value}>{weight.label}</option>
                    ))}
                  </FormSelect>
                </div>
              </ControlCard>

              <ControlCard title="رنگ‌ها" icon="🎨">
                <div>
                  <FormLabel>رنگ متن</FormLabel>
                  <ColorPicker
                    value={config.textColor}
                    onChange={(color) => onChange({ ...config, textColor: color })}
                    colors={COLOR_PRESETS}
                  />
                </div>

                <div>
                  <FormLabel>رنگ پس‌زمینه</FormLabel>
                  <ColorPicker
                    value={config.backgroundColor}
                    onChange={(color) => onChange({ ...config, backgroundColor: color })}
                    colors={COLOR_PRESETS}
                  />
                </div>

                <div>
                  <FormLabel>رنگ حاشیه</FormLabel>
                  <ColorPicker
                    value={config.borderColor || '#000000'}
                    onChange={(color) => onChange({ ...config, borderColor: color })}
                    colors={COLOR_PRESETS}
                  />
                </div>
              </ControlCard>
            </>
          )}

          {activeTab === 'effects' && (
            <ControlCard title="جلوه‌های ویژه" icon="✨">
              <div>
                <FormLabel htmlFor="effectType">نوع جلوه</FormLabel>
                <FormSelect
                  id="effectType"
                  value={config.effectType || 'none'}
                  onChange={(e) => onChange({ ...config, effectType: e.target.value as any })}
                >
                  {EFFECT_TYPES.map((effect) => (
                    <option key={effect.value} value={effect.value}>{effect.label}</option>
                  ))}
                </FormSelect>
              </div>

              <SliderInput
                label="شدت جلوه"
                value={config.effectIntensity || 50}
                onChange={(value) => onChange({ ...config, effectIntensity: value })}
                min={0}
                max={100}
              />

              <SliderInput
                label="ضخامت حاشیه"
                value={config.borderWidth || 2}
                onChange={(value) => onChange({ ...config, borderWidth: value })}
                min={0}
                max={10}
              />

              <SliderInput
                label="شعاع گوشه‌ها"
                value={config.borderRadius || 0}
                onChange={(value) => onChange({ ...config, borderRadius: value })}
                min={0}
                max={50}
              />
            </ControlCard>
          )}

          {activeTab === 'advanced' && (
            <ControlCard title="تنظیمات پیشرفته" icon="⚙️">
              <div>
                <FormLabel htmlFor="designStyle">سبک طراحی</FormLabel>
                <FormSelect
                  id="designStyle"
                  value={config.designStyle || ''}
                  onChange={(e) => onChange({ ...config, designStyle: e.target.value })}
                >
                  <option value="">انتخاب کنید...</option>
                  {DESIGN_STYLE_SUGGESTIONS.map((style) => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </FormSelect>
              </div>

              <SliderInput
                label="شفافیت پس‌زمینه"
                value={config.backgroundOpacity || 100}
                onChange={(value) => onChange({ ...config, backgroundOpacity: value })}
                min={0}
                max={100}
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="hasLighting"
                  checked={config.hasLighting || false}
                  onChange={(e) => onChange({ ...config, hasLighting: e.target.checked })}
                  className="w-5 h-5 text-[#57DCDA] bg-white/[0.05] border-white/[0.12] rounded focus:ring-[#57DCDA]/50"
                />
                <FormLabel htmlFor="hasLighting">نورپردازی LED</FormLabel>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isWeatherproof"
                  checked={config.isWeatherproof || false}
                  onChange={(e) => onChange({ ...config, isWeatherproof: e.target.checked })}
                  className="w-5 h-5 text-[#57DCDA] bg-white/[0.05] border-white/[0.12] rounded focus:ring-[#57DCDA]/50"
                />
                <FormLabel htmlFor="isWeatherproof">ضد آب و هوا</FormLabel>
              </div>
            </ControlCard>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export { ControlPanel };
