import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { StoreInfo } from '../../types/signboard';
import { AISignboardService } from '../../services/aiSignboardService';

export const AISignboardDesigner: React.FC = () => {
  const { user, canGenerateDesign, incrementGenerationCount, saveDesign } = useAuth();
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({ storeName: '', businessType: '' });
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleGenerate = async () => {
    if (!canGenerateDesign()) {
      alert('شما به حد روزانه ۲ تولید طراحی رسیده‌اید. لطفاً فردا دوباره تلاش کنید.');
      return;
    }

    if (!storeInfo.storeName || !storeInfo.businessType || !aiPrompt) {
      alert('لطفاً تمام فیلدهای الزامی را پر کنید.');
      return;
    }

    setIsGenerating(true);
    try {
      const images = await AISignboardService.generateDesigns({
        storeInfo,
        aiPrompt,
        userId: user!.id
      });
      
      setGeneratedImages(images);
      incrementGenerationCount();
      
      // Save design to user profile
      saveDesign({
        storeName: storeInfo.storeName,
        businessType: storeInfo.businessType,
        aiPrompt,
        generatedImages: images,
        ordered: false
      });
    } catch (error) {
      console.error('Generation error:', error);
      alert('تولید طرح‌ها با خطا مواجه شد. از طرح‌های آزمایشی استفاده می‌شود.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOrder = async () => {
    if (!selectedImage) return;
    
    try {
      await AISignboardService.connectWithTeam('design-id', user!.email);
      setShowOrderModal(true);
    } catch (error) {
      alert('ارتباط با تیم با خطا مواجه شد. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Store Information Form */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-white">اطلاعات فروشگاه</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              نام فروشگاه *
            </label>
            <input
              type="text"
              value={storeInfo.storeName}
              onChange={(e) => setStoreInfo(prev => ({ ...prev, storeName: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57DCDA]"
              placeholder="نام فروشگاه خود را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              نوع کسب و کار *
            </label>
            <input
              type="text"
              value={storeInfo.businessType}
              onChange={(e) => setStoreInfo(prev => ({ ...prev, businessType: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57DCDA]"
              placeholder="مثال: رستوران، فروشگاه، کافه"
            />
          </div>
        </div>
      </motion.div>

      {/* AI Prompt Input */}
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-white">مشخصات طراحی</h2>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            تابلوی ایده‌آل خود را توصیف کنید *
          </label>
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#57DCDA] resize-none"
            placeholder="رنگ‌ها، سبک، جلوه‌های نوری، مواد یا هر نیاز خاصی را توضیح دهید..."
          />
        </div>
        
        {/* Generation Limit Info */}
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-sm text-blue-300">
            تولید روزانه: {user?.dailyGenerationsUsed || 0} / {user?.maxDailyGenerations || 2}
          </p>
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !canGenerateDesign()}
          className="px-12 py-4 bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#57DCDA]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'در حال تولید طرح‌ها...' : 'تولید ۴ پیش‌نمایش طراحی'}
        </button>
      </motion.div>

      {/* Generated Images */}
      {generatedImages.length > 0 && (
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">طرح‌های تولید شده</h2>
            {!import.meta.env.VITE_HUGGINGFACE_API_TOKEN && (
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full">
                حالت آزمایشی
              </span>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {generatedImages.map((image, index) => (
              <motion.div
                key={index}
                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedImage === image ? 'border-[#57DCDA]' : 'border-white/20'
                }`}
                onClick={() => setSelectedImage(image)}
                whileHover={{ scale: 1.02 }}
              >
                <img src={image} alt={`طرح ${index + 1}`} className="w-full h-64 object-cover" />
                {selectedImage === image && (
                  <div className="absolute inset-0 bg-[#57DCDA]/20 flex items-center justify-center">
                    <div className="bg-[#57DCDA] text-white px-4 py-2 rounded-lg font-semibold">
                      انتخاب شده
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {selectedImage && (
            <div className="mt-8 text-center">
              <button
                onClick={handleOrder}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300"
              >
                ثبت سفارش و ارتباط با تیم
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Order Success Modal */}
      {showOrderModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">سفارش آغاز شد!</h3>
              <p className="text-gray-300 mb-6">
                تیم ما ظرف ۲۴ ساعت با شما تماس خواهد گرفت تا طراحی را نهایی کرده و فرآیند سفارش را تکمیل کند.
              </p>
              <button
                onClick={() => setShowOrderModal(false)}
                className="px-6 py-2 bg-[#57DCDA] text-white rounded-lg hover:bg-[#4ABEBC] transition-colors"
              >
                بستن
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
