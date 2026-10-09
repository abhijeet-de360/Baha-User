'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FLOATING_ICONS = [
  { emoji: '👗', style: 'top-[8%] left-[6%] text-3xl animate-float' },
  { emoji: '🧸', style: 'top-[14%] right-[8%] text-2xl animate-float-delayed' },
  { emoji: '🎀', style: 'bottom-[20%] left-[5%] text-2xl animate-float' },
  { emoji: '🌟', style: 'bottom-[30%] right-[6%] text-3xl animate-float-delayed' },
  { emoji: '👟', style: 'top-[45%] left-[3%] text-xl animate-float' },
  { emoji: '🦋', style: 'top-[35%] right-[4%] text-2xl animate-float-delayed' },
];

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const router = useRouter();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/profile')
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden px-4 py-16">

      {/* Soft radial gradient blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #F0EEF8 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #FFF8E7 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #A8D8E8 0%, transparent 70%)' }}
        />
      </div>

      {/* Floating emoji decorations */}
      {FLOATING_ICONS.map((icon, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute select-none opacity-60 ${icon.style}`}
          aria-hidden="true"
        >
          {icon.emoji}
        </span>
      ))}

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md">

        {/* Brand header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <span className="font-heading text-4xl font-black text-brand-purple tracking-tight leading-none">
              Baha <span className="text-brand-yellow">Fashion</span>
            </span>
          </Link>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
            ))}
            <span className="text-xs text-text-muted font-semibold ml-1">Trusted by 50k+ Parents</span>
          </div>
        </div>

        {/* Card */}
        <div
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/70"
          style={{ boxShadow: '0 20px 60px -10px rgba(108,99,168,0.15), 0 4px 20px -2px rgba(41,41,54,0.05)' }}
        >
          {/* Welcome badge */}
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-brand-purple-light text-brand-purple text-xs font-bold px-4 py-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
              Welcome Back!
              <Sparkles className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
            </span>
          </div>

          <h1 className="font-heading text-2xl font-extrabold text-text-main text-center mb-1">
            Sign In to Your Account
          </h1>
          <p className="text-sm text-text-muted text-center mb-8">
            Access your VIP rewards, orders, and wishlist.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Email field */}
            <div>
              <label htmlFor="signin-email" className="block text-xs font-bold text-text-main mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                <input
                  id="signin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm text-text-main placeholder-text-light bg-background transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-brand-coral ring-brand-coral/20 focus:ring-brand-coral/30'
                      : 'border-[#E2DDD5] focus:ring-brand-purple/20 focus:border-brand-purple'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-brand-coral font-medium">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="signin-password" className="block text-xs font-bold text-text-main uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-brand-purple font-semibold hover:text-brand-purple-dark transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                <input
                  id="signin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-11 py-3 rounded-2xl border text-sm text-text-main placeholder-text-light bg-background transition-all focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-brand-coral ring-brand-coral/20 focus:ring-brand-coral/30'
                      : 'border-[#E2DDD5] focus:ring-brand-purple/20 focus:border-brand-purple'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-light hover:text-text-muted transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-brand-coral font-medium">{errors.password}</p>
              )}
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2.5 cursor-pointer group" htmlFor="signin-remember">
              <input
                id="signin-remember"
                type="checkbox"
                className="w-4 h-4 rounded accent-brand-purple cursor-pointer"
              />
              <span className="text-xs text-text-muted font-medium group-hover:text-text-main transition-colors">
                Remember me on this device
              </span>
            </label>

            {/* Submit button */}
            <button
              id="signin-submit"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: isLoading
                  ? '#9B99A9'
                  : 'linear-gradient(135deg, #6C63A8 0%, #554E87 100%)',
                boxShadow: isLoading ? 'none' : '0 8px 24px -4px rgba(108,99,168,0.45)',
              }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#EFECE6]" />
            <span className="text-xs text-text-light font-semibold">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-[#EFECE6]" />
          </div>

          {/* Social sign-in buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              id="signin-google"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-[#E2DDD5] bg-white hover:bg-background hover:border-brand-purple/30 transition-all text-sm font-semibold text-text-main"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              type="button"
              id="signin-facebook"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-[#E2DDD5] bg-white hover:bg-background hover:border-brand-purple/30 transition-all text-sm font-semibold text-text-main"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-text-muted">
            New to Baha Fashion?{' '}
            <Link
              href="/sign-up"
              className="text-brand-purple font-bold hover:text-brand-purple-dark transition-colors"
            >
              Create an Account
            </Link>
          </p>
        </div>

        {/* VIP perks strip */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-text-muted font-medium flex-wrap">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-brand-coral fill-brand-coral" /> Exclusive Wishlist
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" /> VIP Rewards
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-brand-purple fill-brand-purple" /> Priority Support
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
