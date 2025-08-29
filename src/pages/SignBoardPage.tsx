import React, { useState } from 'react';
import { SignBoardDesigner } from '../components/signboard/SignBoardDesigner';
import { SignBoardConfig } from '../types/signboard';

const SignBoardPage: React.FC = () => {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const handleSaveDesign = (config: SignBoardConfig, imageUrl: string) => {
    // In a real app, you might save this to local storage or a database
    console.log('Design saved:', { config, imageUrl });
  };
  
  const handlePlaceOrder = async (config: SignBoardConfig, imageUrl: string) => {
    // In a real app, this would connect to your backend API
    console.log('Order placed:', { config, imageUrl });
    
    // Simulate a successful order
    setOrderSuccess(true);
    setOrderId(`ORD-${Math.floor(Math.random() * 10000)}`);
    
    // Return a mock order result
    return {
      orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
      estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Sign Board Designer
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Design your perfect sign with AI assistance
            </p>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main>
        {orderSuccess ? (
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">Order Successful!</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Your order #{orderId} has been placed successfully. Our team will contact you shortly.
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setOrderSuccess(false)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Design Another Sign
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SignBoardDesigner 
            onSave={handleSaveDesign}
            onOrder={handlePlaceOrder}
          />
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Sign Board Manufacturer. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignBoardPage; 