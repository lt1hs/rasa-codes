import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';

const PricingPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [annualBilling, setAnnualBilling] = useState(true);
  
  // Pricing plans
  const plans = [
    {
      name: 'أساسي',
      description: 'للأفراد والشركات الناشئة',
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        'تحليل البيانات الأساسي',
        'دعم الذكاء الاصطناعي',
        'تحديثات شهرية',
        'دعم فني عبر البريد الإلكتروني',
        'تخزين 10 جيجابايت',
      ],
      color: '#FF8301',
      popular: false,
    },
    {
      name: 'احترافي',
      description: 'للشركات المتوسطة',
      monthlyPrice: 199,
      annualPrice: 159,
      features: [
        'تحليل البيانات المتقدم',
        'معالجة اللغة الطبيعية',
        'تحديثات أسبوعية',
        'دعم فني متقدم على مدار الساعة',
        'تخزين 50 جيجابايت',
        'تكامل مع الأنظمة الأخرى',
        'تدريب مخصص',
      ],
      color: '#57DCDA',
      popular: true,
    },
    {
      name: 'مؤسسات',
      description: 'للشركات الكبيرة',
      monthlyPrice: 399,
      annualPrice: 319,
      features: [
        'تحليل بيانات متقدم بلا حدود',
        'تطوير نماذج مخصصة',
        'تحديثات فورية',
        'دعم فني احترافي 24/7',
        'تخزين غير محدود',
        'تدريب وتأهيل الفريق',
        'حلول مخصصة',
        'مدير حساب متخصص',
      ],
      color: '#FF8301',
      popular: false,
    }
  ];

  // Card animation variants
  const getCardTransform = (index: number) => {
    if (hoveredCard === index) {
      return {
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 },
      };
    }
    return {};
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] opacity-50" />
        </div>
        
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              خطط <span className="gradient-text">الأسعار</span> المرنة
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              اختر الخطة المناسبة لاحتياجاتك واستفد من أحدث تقنيات الذكاء الاصطناعي لتطوير أعمالك
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 relative">
        <div className="container">
          {/* Billing Toggle */}
          <motion.div 
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-secondary-light/50 backdrop-blur-sm p-1 rounded-full flex items-center">
              <button 
                className={`px-6 py-3 rounded-full font-medium transition ${!annualBilling ? 'bg-primary text-white' : 'hover:text-primary'}`}
                onClick={() => setAnnualBilling(false)}
              >
                فوترة شهرية
              </button>
              <button 
                className={`px-6 py-3 rounded-full font-medium transition flex items-center gap-2 ${annualBilling ? 'bg-primary text-white' : 'hover:text-primary'}`}
                onClick={() => setAnnualBilling(true)}
              >
                <span>فوترة سنوية</span>
                <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">خصم 20%</span>
              </button>
            </div>
          </motion.div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`glass-card relative p-8 rounded-2xl h-full perspective-1000 border-2 ${plan.popular ? 'border-primary/40' : 'border-white/10'}`}
                style={{
                  background: `linear-gradient(135deg, ${plan.color}15, transparent)`,
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                animate={getCardTransform(index)}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <div className="bg-gradient-to-l from-primary to-accent px-4 py-1 rounded-full text-white text-sm font-medium">
                      الأكثر شيوعًا
                    </div>
                  </div>
                )}
                
                {/* Glowing effect on hover */}
                <motion.div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${plan.color}40, transparent)`,
                    filter: 'blur(8px)',
                    zIndex: -1
                  }}
                  animate={{ opacity: hoveredCard === index ? 0.6 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Card Content */}
                <div className="relative z-10">
                  {/* Plan header */}
                  <div className="mb-6 text-center">
                    <h3 className="text-2xl font-display font-semibold mb-2">{plan.name}</h3>
                    <p className="text-gray-400">{plan.description}</p>
                  </div>
                  
                  {/* Price */}
                  <div className="flex justify-center mb-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-1">ابتداءً من</p>
                      <div className="flex items-end justify-center">
                        <span className="text-4xl font-display font-bold gradient-text">
                          {annualBilling ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-xl text-gray-300 mb-1">$</span>
                        <span className="text-gray-400 mr-2">/{annualBilling ? 'شهرياً' : 'شهرياً'}</span>
                      </div>
                      {annualBilling && (
                        <p className="text-sm text-accent mt-1">
                          يدفع سنوياً (توفير ${(plan.monthlyPrice - plan.annualPrice) * 12}$)
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + (i * 0.05) }}
                      >
                        <div style={{ color: plan.color }} className="mt-1 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a 
                      href="/signup" 
                      className={`w-full py-3 px-8 rounded-lg font-medium transition-all flex justify-center items-center ${plan.popular ? 'bg-gradient-to-l from-primary to-accent text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                      اختر الخطة
                    </a>
                  </motion.div>
                </div>
                
                {/* 3D floating elements */}
                <motion.div 
                  className="absolute -top-3 -left-3 w-6 h-6 rounded-full"
                  style={{ background: plan.color }}
                  animate={{ 
                    y: hoveredCard === index ? [-5, 5] : 0,
                    x: hoveredCard === index ? [5, -5] : 0,
                    scale: hoveredCard === index ? [1, 1.3, 1] : 1,
                    opacity: hoveredCard === index ? 1 : 0.3,
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* FAQ Section */}
          <div className="mt-24 max-w-3xl mx-auto">
            <motion.h2 
              className="text-3xl font-display font-bold mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              الأسئلة <span className="gradient-text">الشائعة</span>
            </motion.h2>
            
            <div className="space-y-6">
              {[
                {
                  q: 'هل يمكنني تغيير خطتي لاحقاً؟',
                  a: 'نعم، يمكنك الترقية أو تخفيض خطتك في أي وقت. ستتم محاسبة التغييرات بشكل تناسبي على الفترة المتبقية.'
                },
                {
                  q: 'هل هناك فترة تجريبية مجانية؟',
                  a: 'نعم، نقدم فترة تجريبية مجانية لمدة 14 يومًا لجميع الخطط دون الحاجة إلى بطاقة ائتمان.'
                },
                {
                  q: 'ما وسائل الدفع المقبولة؟',
                  a: 'نقبل بطاقات الائتمان الرئيسية (فيزا، ماستركارد، أمريكان إكسبريس) وكذلك باي بال. للمؤسسات، نقدم أيضًا خيارات الدفع عن طريق التحويل المصرفي.'
                },
                {
                  q: 'هل هناك دعم فني متاح؟',
                  a: 'نعم، جميع الخطط تتضمن دعم فني. تتمتع الخطط المتقدمة بدعم ذي أولوية وخدمة مدار الساعة طوال أيام الأسبوع.'
                },
              ].map((faq, i) => (
                <motion.div 
                  key={i}
                  className="glass-card p-6 rounded-xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-3">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Enterprise CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary to-secondary-dark -z-10" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto glass-card p-10 rounded-2xl border border-primary/30">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-2/3">
                <motion.h2 
                  className="text-3xl font-display font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  تحتاج حلولاً <span className="gradient-text">مخصصة</span>؟
                </motion.h2>
                
                <motion.p 
                  className="text-gray-300 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  نقدم حلولًا مخصصة للشركات الكبيرة والمؤسسات التي تحتاج إلى مزايا وإمكانيات خاصة. تواصل مع فريقنا للحصول على عرض مخصص يلبي احتياجاتك.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <a href="/contact" className="btn btn-primary px-8">تواصل معنا</a>
                </motion.div>
              </div>
              
              <div className="w-full md:w-1/3">
                <motion.div 
                  className="relative w-40 h-40 mx-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PricingPage; 