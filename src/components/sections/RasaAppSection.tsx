import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const RasaAppSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const features = [
    {
      id: 1,
      title: "رابط کاربری هوشمند",
      description: "تجربه کاربری روان با رابط تعاملی هوشمند که با نیازهای شما سازگار می‌شود",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "گفتگوی طبیعی",
      description: "گفتگوی روان و طبیعی با پشتیبانی کامل از زبان فارسی",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "شخصی‌سازی هوشمند",
      description: "شخصی‌سازی تجربه شما با استفاده از هوش مصنوعی پیشرفته",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const phoneScreens = [
    "/app/screen-1.svg",
    "/app/screen-2.svg",
    "/app/screen-3.svg"
  ];

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#57DCDA]/20 via-transparent to-[#3AADAB]/20 opacity-30" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(87, 220, 218, 0.15), transparent 70%)"
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle at center, rgba(58, 173, 171, 0.15), transparent 70%)"
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>

        {/* Animated grid */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(87, 220, 218, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(87, 220, 218, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#57DCDA]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block relative">
            <motion.div
              className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[#57DCDA]/20 to-[#3AADAB]/20 blur-lg"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <h2 className="relative text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-[#57DCDA] to-[#3AADAB] bg-clip-text text-transparent">
                اپلیکیشن رسا
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-300/90 max-w-2xl mx-auto">
            تجربه گفتگوی هوشمند در دستان شما
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Phone Preview */}
          <motion.div 
            className="relative"
            style={{ opacity, scale }}
          >
            {/* Phone Frame */}
            <div className="relative mx-auto w-[300px] h-[600px]" ref={phoneRef}>
              {/* Phone Border */}
              <motion.div
                className="absolute inset-0 rounded-[3rem] border-[8px] border-gray-800 bg-gray-900 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {/* Screen Content */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#0c1525] to-[#0f1f38]"
                  animate={{
                    background: [
                      "linear-gradient(to bottom right, #0c1525, #0f1f38)",
                      "linear-gradient(to bottom right, #0f1f38, #0c1525)",
                      "linear-gradient(to bottom right, #0c1525, #0f1f38)"
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {/* Dynamic Screen Content */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <img
                      src={phoneScreens[activeFeature]}
                      alt="App Screen"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Screen Glare Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
                    animate={{
                      opacity: [0, 0.1, 0],
                      x: ['-100%', '100%', '-100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl" />
              </motion.div>

              {/* Glow Effects */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#57DCDA]/20 to-[#3AADAB]/20 rounded-[4rem] blur-xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-1/4 -left-8 w-16 h-16 bg-[#57DCDA]/10 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-8 w-20 h-20 bg-[#3AADAB]/10 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>

          {/* Right Column - Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className={`
                  relative p-6 rounded-2xl cursor-pointer
                  ${activeFeature === index ? 'bg-white/5' : 'hover:bg-white/5'}
                  transition-colors duration-300
                `}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveFeature(index)}
              >
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className={`
                      p-3 rounded-xl
                      ${activeFeature === index ? 'bg-[#57DCDA] text-white' : 'bg-white/10 text-[#57DCDA]'}
                      transition-colors duration-300
                    `}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature Card Glow Effect */}
                {activeFeature === index && (
                  <motion.div
                    className="absolute inset-0 -z-10 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#57DCDA]/10 to-[#3AADAB]/10 rounded-2xl" />
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-[#57DCDA]/20"
                      animate={{
                        opacity: [0.2, 0.5, 0.2]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download Buttons */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.a
            href="#"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.21 2.33-.912 3.57-.84 1.47.1 2.577.638 3.307 1.637-3.262 2.198-2.747 6.613.564 7.473-.448 1.27-.947 2.5-2.531 3.91zM12.03 7.25c-.15-2.23 1.66-4.07 3.77-4.25.347 2.677-2.05 4.47-3.77 4.25z" />
            </svg>
            <div className="text-right">
              <div className="text-xs">دانلود از</div>
              <div className="text-lg font-semibold">اپ استور</div>
            </div>
          </motion.a>

          <motion.a
            href="#"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#57DCDA]/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 15.34l2.437-1.405-2.437-1.405m-3.182-3.172l-3.182-3.172v12.828l3.182-3.172 3.182 3.172V4.187l-3.182 3.172z" />
            </svg>
            <div className="text-right">
              <div className="text-xs">دانلود از</div>
              <div className="text-lg font-semibold">گوگل پلی</div>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default RasaAppSection; 