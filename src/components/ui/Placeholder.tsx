import { motion } from 'framer-motion';

interface PlaceholderProps {
  width?: number;
  height?: number;
  text?: string;
  bgColor?: string;
  textColor?: string;
}

const Placeholder = ({
  width = 600,
  height = 400,
  text = 'صورة توضيحية',
  bgColor = 'var(--secondary-light)',
  textColor = 'var(--text-light)'
}: PlaceholderProps) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: textColor,
        fontFamily: 'var(--font-sans)',
        maxWidth: '100%'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 opacity-10"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.3) 0%, transparent 70%)'
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-0 w-64 h-64 -m-20 rounded-full bg-primary/10" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-accent/20" />
      </div>
      
      <div className="z-10 text-center max-w-[80%]">
        <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="font-medium text-lg">{text}</p>
        <p className="text-sm opacity-60 mt-2">{width} × {height}</p>
      </div>
    </motion.div>
  );
};

export default Placeholder; 