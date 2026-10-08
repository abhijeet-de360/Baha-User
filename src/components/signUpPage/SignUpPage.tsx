'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Sparkles, ArrowRight, Heart, Star, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FLOATING_ICONS = [
  { emoji: '🧸', style: 'top-[6%] left-[5%] text-3xl animate-float' },
  { emoji: '🎀', style: 'top-[12%] right-[7%] text-2xl animate-float-delayed' },
  { emoji: '👶', style: 'bottom-[22%] left-[4%] text-2xl animate-float' },
  { emoji: '⭐', style: 'bottom-[28%] right-[5%] text-3xl animate-float-delayed' },
  { emoji: '🌸', style: 'top-[48%] left-[2%] text-xl animate-float' },
  { emoji: '🦄', style: 'top-[38%] right-[3%] text-2xl animate-float-delayed' },
];

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
];

const SignUpPage = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const set = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    if (!form.email) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    if (!agreed) e.agreed = 'Please accept the terms to continue.';
    setErrors(e);
    return Object.keys(e).length === 0;
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

  const passwordStrength = PASSWORD_RULES.filter(r => r.test(form.password)).length;
  const strengthColors = ['bg-brand-coral', 'bg-brand-yellow-dark', 'bg-brand-mint'];
  const strengthLabels = ['Weak', 'Fair', 'Strong'];

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden px-4 py-12">

      {/* Gradient blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #F0EEF8 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #FFF8E7 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #A9D8B8 0%, transparent 70%)' }} />
      </div>

      {/* Floating emoji */}
      {FLOATING_ICONS.map((icon, i) => (
        <span key={i} className={`pointer-events-none absolute select-none opacity-60 ${icon.style}`} aria-hidden="true">
          {icon.emoji}
        </span>
      ))}

      <div className="relative z-10 w-full max-w-lg">

        {/* Brand header */}
        <div className="text-center mb-7">
          <Link href="/" className="inline-block">
            <span className="font-heading text-4xl font-black text-brand-purple tracking-tight leading-none">
              Baha <span className="text-brand-yellow">Fashion</span>
            </span>
          </Link>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
            ))}
            <span className="text-xs text-text-muted font-semibold ml-1">Join 50k+ Happy Parents</span>
          </div>
        </div>

        {/* Card */}
        <div
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 sm:p-10 border border-white/70"
          style={{ boxShadow: '0 20px 60px -10px rgba(108,99,168,0.15), 0 4px 20px -2px rgba(41,41,54,0.05)' }}
        >
          {/* Badge */}
          <div className="flex items-center justify-center mb-5">
            <span className="inline-flex items-center gap-2 bg-brand-yellow-light text-brand-yellow-dark text-xs font-bold px-4 py-2 rounded-full border border-brand-yellow/30">
              <Sparkles className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
              Create Your Free Account
              <Sparkles className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
            </span>
          </div>

          <h1 className="font-heading text-2xl font-extrabold text-text-main text-center mb-1">
            Join the Baha Family
          </h1>
          <p className="text-sm text-text-muted text-center mb-7">
            Get exclusive VIP deals, track orders, and save your wishlist.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              {(['firstName', 'lastName'] as const).map((field, i) => (
                <div key={field}>
                  <label htmlFor={`signup-${field}`} className="block text-xs font-bold text-text-main mb-1.5 uppercase tracking-wider">
                    {i === 0 ? 'First Name' : 'Last Name'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                    <input
                      id={`signup-${field}`}
                      type="text"
                      value={form[field]}
                      onChange={e => set(field, e.target.value)}
                      placeholder={i === 0 ? 'Priya' : 'Sharma'}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-2xl border text-sm text-text-main placeholder-text-light bg-background transition-all focus:outline-none focus:ring-2 ${
                        errors[field] ? 'border-brand-coral focus:ring-brand-coral/30' : 'border-[#E2DDD5] focus:ring-brand-purple/20 focus:border-brand-purple'
                      }`}
                    />
                  </div>
                  {errors[field] && <p className="mt-1 text-xs text-brand-coral font-medium">{errors[field]}</p>}
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="block text-xs font-bold text-text-main mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm text-text-main placeholder-text-light bg-background transition-all focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-brand-coral focus:ring-brand-coral/30' : 'border-[#E2DDD5] focus:ring-brand-purple/20 focus:border-brand-purple'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-brand-coral font-medium">{errors.email}</p>}
            </div>

            {/* Phone (optional) */}
            <div>
              <label htmlFor="signup-phone" className="block text-xs font-bold text-text-main mb-1.5 uppercase tracking-wider">
                Phone <span className="text-text-light font-normal normal-case">(optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                <input
                  id="signup-phone"
                  type="tel"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#E2DDD5] text-sm text-text-main placeholder-text-light bg-background transition-all focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="block text-xs font-bold text-text-main mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="Create a strong password"
                  className={`w-full pl-10 pr-11 py-3 rounded-2xl border text-sm text-text-main placeholder-text-light bg-background transition-all focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-brand-coral focus:ring-brand-coral/30' : 'border-[#E2DDD5] focus:ring-brand-purple/20 focus:border-brand-purple'
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-light hover:text-text-muted transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-brand-coral font-medium">{errors.password}</p>}

              {/* Strength meter */}
              {form.password && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-[#EFECE6]'}`} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">
                      {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : 'Too weak'}
                    </span>
                    <div className="flex gap-3">
                      {PASSWORD_RULES.map((rule, i) => (
                        <span key={i} className={`flex items-center gap-1 text-[10px] font-medium transition-colors ${rule.test(form.password) ? 'text-brand-mint' : 'text-text-light'}`}>
                          <CheckCircle2 className={`w-3 h-3 ${rule.test(form.password) ? 'text-brand-mint' : 'text-[#DDD8CE]'}`} />
                          {rule.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="signup-confirm" className="block text-xs font-bold text-text-main mb-1.5 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light pointer-events-none" />
                <input
                  id="signup-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={e => set('confirmPassword', e.target.value)}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-11 py-3 rounded-2xl border text-sm text-text-main placeholder-text-light bg-background transition-all focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? 'border-brand-coral focus:ring-brand-coral/30' : 'border-[#E2DDD5] focus:ring-brand-purple/20 focus:border-brand-purple'
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-light hover:text-text-muted transition-colors"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1.5 text-xs text-brand-coral font-medium">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer group" htmlFor="signup-terms">
                <input
                  id="signup-terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={e => { setAgreed(e.target.checked); setErrors(prev => ({ ...prev, agreed: '' })); }}
                  className="w-4 h-4 mt-0.5 rounded accent-brand-purple cursor-pointer shrink-0"
                />
                <span className="text-xs text-text-muted font-medium leading-relaxed group-hover:text-text-main transition-colors">
                  I agree to the{' '}
                  <Link href="#" className="text-brand-purple font-semibold hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="#" className="text-brand-purple font-semibold hover:underline">Privacy Policy</Link>
                  . I also agree to receive exclusive offers & updates from Baha Fashion.
                </span>
              </label>
              {errors.agreed && <p className="mt-1.5 text-xs text-brand-coral font-medium">{errors.agreed}</p>}
            </div>

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              style={{
                background: isLoading ? '#9B99A9' : 'linear-gradient(135deg, #6C63A8 0%, #554E87 100%)',
                boxShadow: isLoading ? 'none' : '0 8px 24px -4px rgba(108,99,168,0.45)',
              }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  Create My Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#EFECE6]" />
            <span className="text-xs text-text-light font-semibold">OR SIGN UP WITH</span>
            <div className="flex-1 h-px bg-[#EFECE6]" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button type="button" id="signup-google"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-[#E2DDD5] bg-white hover:bg-background hover:border-brand-purple/30 transition-all text-sm font-semibold text-text-main">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button type="button" id="signup-facebook"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border border-[#E2DDD5] bg-white hover:bg-background hover:border-brand-purple/30 transition-all text-sm font-semibold text-text-main">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-text-muted">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-brand-purple font-bold hover:text-brand-purple-dark transition-colors">
              Sign In
            </Link>
          </p>
        </div>

        {/* Perks strip */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-text-muted font-medium flex-wrap">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-brand-coral fill-brand-coral" /> Free Returns
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" /> 200 Welcome Points
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-brand-purple fill-brand-purple" /> Early Access Sales
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
