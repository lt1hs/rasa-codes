import React from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary/50 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#57DCDA] via-transparent to-[#3AADAB]" />
        
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #57DCDA 1px, transparent 1px),
              linear-gradient(to bottom, #57DCDA 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="w-full max-w-md">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">خوش آمدید</h1>
          <p className="text-gray-300">برای دسترسی به طراح هوشمند تابلو وارد شوید</p>
        </motion.div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
