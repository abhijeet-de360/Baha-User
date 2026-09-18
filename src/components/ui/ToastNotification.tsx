import React, { useEffect } from 'react';
import { CheckCircle, ShoppingBag, Heart, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'promo';
  title: string;
  message: string;
  image?: string;
}

interface ToastNotificationProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-subtle">
      <div className="bg-white rounded-2xl p-4 shadow-soft-hover border border-brand-purple/20 flex items-start gap-3">
        {toast.image ? (
          <img
            src={toast.image}
            alt={toast.title}
            className="w-12 h-12 rounded-xl object-cover shrink-0 bg-background"
          />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center shrink-0 text-text-main shadow-xs">
            {toast.type === 'cart' && <ShoppingBag className="w-5 h-5" />}
            {toast.type === 'wishlist' && <Heart className="w-5 h-5 text-brand-coral fill-brand-coral" />}
            {toast.type === 'promo' && <Sparkles className="w-5 h-5" />}
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h5 className="font-heading text-sm font-bold text-text-main flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{toast.title}</span>
            </h5>
            <Button
              type="button"
              variant="ghost"
              size="iconSm"
              onClick={onClose}
              className="size-6 rounded-md text-text-muted hover:text-text-main"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
          <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{toast.message}</p>
        </div>
      </div>
    </div>
  );
};
