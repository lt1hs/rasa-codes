import React from 'react';
import { motion } from 'framer-motion';
import { AuthGuard } from '../components/ui/AuthGuard';
import { UserDashboard } from '../components/user/UserDashboard';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary/50">
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

      <section className="pt-32 pb-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <AuthGuard>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <UserDashboard />
            </motion.div>
          </AuthGuard>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
