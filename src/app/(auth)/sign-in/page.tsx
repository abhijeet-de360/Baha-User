'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'facebook' | null>(null);

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      try {
        localStorage.setItem('isAuthenticated', 'true');
      } catch (err) {
        console.error('Failed to set localStorage', err);
      }
      setIsLoading(false);
      router.push('/profile');
    }, 800);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    setLoadingProvider(provider);

    setTimeout(() => {
      try {
        localStorage.setItem('isAuthenticated', 'true');
      } catch (err) {
        console.error('Failed to set localStorage', err);
      }
      setLoadingProvider(null);
      router.push('/profile');
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans select-none">
      
      {/* 1. Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/baha-kids-bg.jpg"
          alt="Baha Kids Fashion Brand Background"
          fill
          priority
          className="object-cover object-center scale-100"
        />
        {/* Soft subtle warm gradient for flawless text contrast */}
        <div className="absolute inset-0 bg-[#2D2620]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D2620]/40 via-[#2D2620]/15 to-transparent" />
      </div>

      {/* 2. Top Bar Navigation */}
      <header className="absolute top-6 left-6 sm:top-10 sm:left-12 right-6 sm:right-12 z-20 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-white transition-all hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
          <span>Back to Store</span>
        </Link>
      </header>

      {/* 3. Main Content Grid across the screen */}
      <div className="relative z-10 w-full max-w-7xl px-6 sm:px-12 lg:px-16 pt-24 pb-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16">
        
        {/* Left Side Content Overlay */}
        <div className="lg:col-span-7 text-left max-w-xl">
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] drop-shadow-xs mb-4">
            Every big thing <br />
            starts small
          </h1>
          <p className="text-zinc-200 text-base sm:text-xl font-semibold leading-relaxed">
            Log in and continue growing.
          </p>
        </div>

        {/* Right Side Floating Login Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
          <div className="w-full max-w-[430px] bg-[#FAF4ED]/95 backdrop-blur-xl rounded-[32px] sm:rounded-[36px] p-7 sm:p-9 shadow-2xl border border-white/80 text-[#3C332B]">
            
            {/* Card Heading */}
            <div className="text-center mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#3C332B] tracking-tight">
                Log in to your account
              </h2>
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email Address Field */}
              <div>
                <label className="block text-xs font-bold text-text-main mb-1.5 uppercase tracking-wider">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#E2DDD5] text-sm text-text-main placeholder-text-light focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold text-text-main mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3 rounded-2xl bg-white border border-[#E2DDD5] text-sm text-text-main placeholder-text-light focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text-main transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right mt-1.5">
                  <button
                    type="button"
                    className="text-xs font-semibold text-brand-purple hover:text-brand-purple-dark transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              {/* Log in Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-brand-purple hover:bg-brand-purple-dark text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Log in</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#EAE3D9]" />
              <span className="text-xs text-[#A09384] font-bold">or</span>
              <div className="flex-1 h-px bg-[#EAE3D9]" />
            </div>

            {/* Social Buttons Container (Side by Side) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google Social Login Button */}
              <button
                type="button"
                disabled={loadingProvider !== null}
                onClick={() => handleSocialLogin('google')}
                className="py-3 px-3.5 rounded-2xl bg-white hover:bg-[#F5EFE7] text-[#3C332B] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs hover:shadow-md transition-all border border-[#EAE3D9] cursor-pointer group active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingProvider === 'google' ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-brand-purple" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google</span>
                  </>
                )}
              </button>

              {/* Facebook Social Login Button */}
              <button
                type="button"
                disabled={loadingProvider !== null}
                onClick={() => handleSocialLogin('facebook')}
                className="py-3 px-3.5 rounded-2xl bg-[#1877F2] hover:bg-[#166FE5] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs hover:shadow-md transition-all cursor-pointer group active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingProvider === 'facebook' ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Facebook...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
