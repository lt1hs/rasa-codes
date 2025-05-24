import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName) {
      newErrors.fullName = 'نام و نام خانوادگی الزامی است';
    }

    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ایمیل نامعتبر است';
    }

    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 8) {
      newErrors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تکرار رمز عبور الزامی است';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور و تکرار آن یکسان نیستند';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'پذیرش قوانین و مقررات الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Add your signup logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      console.log('Signup successful', formData);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="ثبت‌نام در رسا"
      subtitle="برای ایجاد حساب کاربری جدید فرم زیر را تکمیل کنید"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Full Name Input */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
            نام و نام خانوادگی
          </label>
          <div className="mt-1">
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="علی محمدی"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            ایمیل
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="example@domain.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            رمز عبور
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
        </div>

        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
            تکرار رمز عبور
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              className="h-4 w-4 rounded border-white/10 bg-white/5 focus:ring-primary"
            />
          </div>
          <div className="mr-3 text-sm">
            <label htmlFor="acceptTerms" className="text-gray-300">
              با <Link to="/terms" className="text-primary hover:text-primary/80">قوانین و مقررات</Link> موافقم
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-sm text-red-500">{errors.acceptTerms}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full flex justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
        >
          <span className="relative z-10">
            {isSubmitting ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.button>

        {/* Login Link */}
        <div className="text-center mt-4">
          <span className="text-gray-300">قبلاً ثبت‌نام کرده‌اید؟ </span>
          <Link to="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
            وارد شوید
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUpPage; 