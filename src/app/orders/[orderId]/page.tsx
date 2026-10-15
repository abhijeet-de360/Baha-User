'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import mockData from '@/data/mockData.json';
import { useShopState } from '@/hooks/useShopState';
import type { Product } from '@/types';
import { ToastNotification } from '@/components/ui/ToastNotification';
import { ArrowLeft, Package, Truck, CheckCircle2, Clock, Copy, Check, Download, Printer, ShoppingBag, ExternalLink, MapPin, CreditCard, ShieldCheck, Sparkles, HelpCircle, MessageCircle, FileText, AlertCircle, ChevronRight, RotateCcw, Star, X, Phone, Mail, } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  featuredImage: string;
  selectedColor?: string;
  selectedSize?: string;
  quantity?: number;
  status?: 'Active' | 'Cancelled';
  cancelledAt?: string;
  cancelReason?: string;
}

interface OrderAddress {
  name?: string;
  label?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
}

interface OrderRecord {
  orderId: string;
  date: string;
  status: 'In Transit' | 'Delivered' | 'Processing' | 'Cancelled';
  total: number;
  items: string[];
  cartItemsSnapshot?: OrderItem[];
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  paymentMethod?: string;
  address?: OrderAddress;
}

interface ItemReview {
  orderId: string;
  itemId: string;
  itemSize?: string;
  rating: number; // 1 to 5
  title?: string;
  comment: string;
  tags?: string[];
  recommend?: boolean;
  createdAt: string;
}

interface ItemReturnRequest {
  orderId: string;
  itemId: string;
  itemSize?: string;
  reason: string;
  comments?: string;
  refundMode: 'original' | 'wallet';
  requestedAt: string;
  status: 'Pending Pickup' | 'In Inspection' | 'Refund Completed';
}

const STATUS_CONFIG: Record<
  string,
  { color: string; bg: string; border: string; dot: string; label: string; icon: any }
> = {
  Delivered: {
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200/90',
    dot: 'bg-emerald-500',
    label: 'Delivered',
    icon: CheckCircle2,
  },
  'In Transit': {
    color: 'text-brand-purple',
    bg: 'bg-brand-purple-light/80',
    border: 'border-brand-purple/30',
    dot: 'bg-brand-purple animate-ping',
    label: 'In Transit',
    icon: Truck,
  },
  Processing: {
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200/90',
    dot: 'bg-amber-500',
    label: 'Processing',
    icon: Clock,
  },
  Cancelled: {
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200/90',
    dot: 'bg-rose-500',
    label: 'Cancelled',
    icon: X,
  },
};

// Convert number to Indian Rupees words
function numberToWords(num: number): string {
  const a = [
    '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ',
    'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen ',
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const n = ('000000000' + Math.floor(num)).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return 'Zero Rupees Only';

  let str = '';
  str += Number(n[1]) !== 0 ? (a[Number(n[1])] || b[Number(n[1][0])] + ' ' + a[Number(n[1][1])]) + 'Crore ' : '';
  str += Number(n[2]) !== 0 ? (a[Number(n[2])] || b[Number(n[2][0])] + ' ' + a[Number(n[2][1])]) + 'Lakh ' : '';
  str += Number(n[3]) !== 0 ? (a[Number(n[3])] || b[Number(n[3][0])] + ' ' + a[Number(n[3][1])]) + 'Thousand ' : '';
  str += Number(n[4]) !== 0 ? (a[Number(n[4])] || b[Number(n[4][0])] + ' ' + a[Number(n[4][1])]) + 'Hundred ' : '';
  str += Number(n[5]) !== 0 ? ((str !== '' ? 'and ' : '') + (a[Number(n[5])] || b[Number(n[5][0])] + ' ' + a[Number(n[5][1])])) : '';

  const paise = Math.round((num - Math.floor(num)) * 100);
  const paiseStr = paise > 0 ? ` and ${paise}/100 Paise` : '';

  return str.trim() ? `${str.trim()} Rupees${paiseStr} Only` : 'Zero Rupees Only';
}

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const rawOrderId = params?.orderId as string;
  const decodedOrderId = rawOrderId ? decodeURIComponent(rawOrderId) : '';

  const { handleAddToCart, toast, setToast } = useShopState();

  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedAWB, setCopiedAWB] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [targetItemToCancel, setTargetItemToCancel] = useState<OrderItem | null>(null);
  const [cancelReason, setCancelReason] = useState('Ordered by mistake / wrong item');
  const [otherReasonText, setOtherReasonText] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  // Rate & Review States
  const [reviews, setReviews] = useState<Record<string, ItemReview>>({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [targetItemToReview, setTargetItemToReview] = useState<OrderItem | null>(null);
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Return Request States
  const [returnRequests, setReturnRequests] = useState<Record<string, ItemReturnRequest>>({});
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [targetItemToReturn, setTargetItemToReturn] = useState<OrderItem | null>(null);
  const [selectedReturnKeys, setSelectedReturnKeys] = useState<string[]>([]);
  const [returnReason, setReturnReason] = useState('Size didn’t fit / too small');
  const [returnComments, setReturnComments] = useState('');
  const [refundMode, setRefundMode] = useState<'original' | 'wallet'>('original');
  const [isSubmittingReturn, setIsSubmittingReturn] = useState(false);

  const allProducts = useMemo(() => mockData.products as Product[], []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getReviewKey = (orderId: string, itemId: string, size?: string) =>
    `${orderId}_${itemId}_${size || 'default'}`;

  const getReturnKey = (orderId: string, itemId: string, size?: string) =>
    `${orderId}_${itemId}_${size || 'default'}`;

  // Load saved reviews & returns from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedReviews = localStorage.getItem('baha_order_reviews');
        if (storedReviews) {
          setReviews(JSON.parse(storedReviews));
        }
        const storedReturns = localStorage.getItem('baha_order_returns');
        if (storedReturns) {
          setReturnRequests(JSON.parse(storedReturns));
        }
      } catch (err) {
        console.error('Failed to load reviews or returns from localStorage:', err);
      }
    }
  }, []);

  // Lock body scroll when cancel, review, or return sheet is open
  useEffect(() => {
    if (showCancelModal || showReviewModal || showReturnModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCancelModal, showReviewModal, showReturnModal]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowCancelModal(false);
        setTargetItemToCancel(null);
        setShowInvoiceModal(false);
        setShowReviewModal(false);
        setTargetItemToReview(null);
        setShowReturnModal(false);
        setTargetItemToReturn(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 1-Click Copy
  const handleCopyText = (text: string, type: 'awb' | 'orderId') => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    if (type === 'awb') {
      setCopiedAWB(true);
      showToast('AWB Tracking Number copied! 📋');
      setTimeout(() => setCopiedAWB(false), 2000);
    } else {
      setCopiedOrderId(true);
      showToast('Order ID copied! 📋');
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  // Find order on mount
  useEffect(() => {
    if (!decodedOrderId) return;

    let foundOrder: OrderRecord | null = null;

    // 1. Try local storage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('baha_placed_orders');
        if (stored) {
          const parsed = JSON.parse(stored) as OrderRecord[];
          const match = parsed.find((o) => o.orderId === decodedOrderId);
          if (match) {
            foundOrder = match;
          }
        }
      } catch (err) {
        console.error('Error reading localStorage:', err);
      }
    }

    // 2. Try mockData recentOrders
    if (!foundOrder) {
      const mockOrders = (mockData.userProfile.recentOrders as any[]).map((o) => ({
        orderId: o.orderId,
        date: o.date,
        status: o.status,
        total: o.total,
        items: o.items,
        paymentMethod: 'upi',
        carrier: o.status === 'Processing' ? 'Assigned upon dispatch' : o.status === 'In Transit' ? 'Blue Dart Express' : 'Delhivery Air',
        trackingNumber: o.status === 'Processing' ? 'Pending' : o.status === 'In Transit' ? 'BD-88492019' : 'DL-77291048',
        estimatedDelivery:
          o.status === 'Processing'
            ? 'Expected in 3–5 business days'
            : o.status === 'In Transit'
            ? 'Thursday, 16 Oct'
            : new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        address: {
          name: 'Priya Sharma',
          label: 'Home',
          line1: '42, Rose Garden Apartments',
          line2: 'Sector 18, Noida',
          city: 'Noida',
          state: 'Uttar Pradesh',
          pincode: '201301',
          phone: '+91 98765 43210',
        },
      }));

      const match = mockOrders.find((o) => o.orderId === decodedOrderId);
      if (match) {
        foundOrder = match as OrderRecord;
      }
    }

    // 3. Fallback mock if completely arbitrary ID
    if (!foundOrder) {
      foundOrder = {
        orderId: decodedOrderId,
        date: new Date().toISOString().split('T')[0],
        status: 'In Transit',
        total: 112.0,
        items: ['prod-9', 'prod-12', 'prod-15'],
        paymentMethod: 'upi',
        carrier: 'Blue Dart Express',
        trackingNumber: 'BD-88492019',
        estimatedDelivery: 'Thursday, 16 Oct by 8:00 PM',
        address: {
          name: 'Priya Sharma',
          label: 'Home',
          line1: '42, Rose Garden Apartments',
          line2: 'Sector 18, Noida',
          city: 'Noida',
          state: 'Uttar Pradesh',
          pincode: '201301',
          phone: '+91 98765 43210',
        },
      };
    }

    if (foundOrder && foundOrder.orderId === 'BF-20240910-003') {
      foundOrder.status = 'Delivered';
      foundOrder.carrier = 'Delhivery Air';
      foundOrder.trackingNumber = 'DL-77291048';
      foundOrder.estimatedDelivery = 'Delivered on 14 Sep 2024';
    }

    setOrder(foundOrder);
    setLoading(false);
  }, [decodedOrderId]);

  // Resolve items in order
  const orderItems = useMemo((): OrderItem[] => {
    if (!order) return [];
    if (order.cartItemsSnapshot && order.cartItemsSnapshot.length > 0) {
      return order.cartItemsSnapshot.map((item) => ({
        ...item,
        status: (item.status || (order.status === 'Cancelled' ? 'Cancelled' : 'Active')) as 'Active' | 'Cancelled',
      }));
    }
    return order.items
      .map((id) => allProducts.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p))
      .map((prod) => ({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        featuredImage: prod.featuredImage,
        selectedColor: prod.colors?.[0]?.name || 'Standard',
        selectedSize: prod.sizes?.[0] || '3-4Y',
        quantity: 1,
        status: (order.status === 'Cancelled' ? 'Cancelled' : 'Active') as 'Active' | 'Cancelled',
      }));
  }, [order, allProducts]);

  const activeItems = useMemo(
    () => orderItems.filter((i) => i.status !== 'Cancelled'),
    [orderItems]
  );
  const cancelledItems = useMemo(
    () => orderItems.filter((i) => i.status === 'Cancelled'),
    [orderItems]
  );

  const activeReturnRequests = useMemo(() => {
    if (!order) return [];
    return Object.values(returnRequests).filter((r) => r.orderId === order.orderId);
  }, [returnRequests, order]);

  const activeReturnableItems = useMemo(() => {
    if (!order) return [];
    return orderItems.filter(
      (item) =>
        item.status !== 'Cancelled' &&
        !returnRequests[getReturnKey(order.orderId, item.id, item.selectedSize)]
    );
  }, [order, orderItems, returnRequests]);

  // Buy item again
  const handleBuyItemAgain = (item: OrderItem) => {
    const fullProd = allProducts.find((p) => p.id === item.id) || {
      id: item.id,
      name: item.name,
      category: 'Baby',
      ageGroup: 'baby' as const,
      gender: 'unisex' as const,
      price: item.price,
      rating: 4.9,
      reviewsCount: 38,
      colors: [{ name: item.selectedColor || 'Standard', hex: '#6C63A8', image: item.featuredImage }],
      sizes: [item.selectedSize || '3-4Y'],
      description: 'Pure Organic Cotton garment for delicate skin.',
      fabric: '100% GOTS Organic Cotton',
      inStock: true,
      featuredImage: item.featuredImage,
      tags: ['Organic', 'Eco-friendly'],
    };

    handleAddToCart(fullProd as Product, item.selectedColor || 'Standard', item.selectedSize || '3-4Y', 1);
    showToast(`Added "${item.name}" to your cart! 🛍️`);
  };

  // Reorder all items in order
  const handleReorderAll = () => {
    activeItems.forEach((item) => {
      const fullProd = allProducts.find((p) => p.id === item.id);
      if (fullProd) {
        handleAddToCart(fullProd, item.selectedColor || 'Standard', item.selectedSize || '3-4Y', item.quantity || 1);
      }
    });
    showToast(`Added items from Order #${order?.orderId} to your bag! 🛒`);
  };

  // Cancel Order / Item function (only available when order.status === 'Processing')
  const handleCancelOrder = () => {
    if (!order) return;
    setIsCancelling(true);

    const chosenReason =
      cancelReason === 'Other reason' && otherReasonText.trim()
        ? otherReasonText.trim()
        : cancelReason;

    if (targetItemToCancel) {
      // ── Cancel Specific Individual Item ──
      const updatedSnapshot = orderItems.map((item) => {
        if (item.id === targetItemToCancel.id && item.selectedSize === targetItemToCancel.selectedSize) {
          return {
            ...item,
            status: 'Cancelled' as const,
            cancelledAt: new Date().toISOString(),
            cancelReason: chosenReason,
          };
        }
        return item;
      });

      const remainingActive = updatedSnapshot.filter((i) => i.status !== 'Cancelled');
      const isAllCancelled = remainingActive.length === 0;

      // Recalculate remaining total
      const remainingTotal = isAllCancelled
        ? order.total
        : remainingActive.reduce((acc, it) => acc + (it.price || 0) * (it.quantity || 1), 0);

      const updatedOrder: OrderRecord = {
        ...order,
        status: isAllCancelled ? 'Cancelled' : 'Processing',
        total: Number(remainingTotal.toFixed(2)),
        cartItemsSnapshot: updatedSnapshot,
      };

      setOrder(updatedOrder);

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('baha_placed_orders');
          const parsed = stored ? (JSON.parse(stored) as OrderRecord[]) : [];
          const existingIdx = parsed.findIndex((o) => o.orderId === order.orderId);
          let updatedList: OrderRecord[];
          if (existingIdx >= 0) {
            updatedList = parsed.map((o) => (o.orderId === order.orderId ? updatedOrder : o));
          } else {
            updatedList = [updatedOrder, ...parsed];
          }
          localStorage.setItem('baha_placed_orders', JSON.stringify(updatedList));
        } catch (err) {
          console.error('Failed to update order in localStorage:', err);
        }
      }

      showToast(
        isAllCancelled
          ? `All items cancelled. Order #${order.orderId} is now cancelled.`
          : `"${targetItemToCancel.name}" was cancelled from your order.`
      );
    } else {
      // ── Cancel Entire Order ──
      const updatedSnapshot = orderItems.map((item) => ({
        ...item,
        status: 'Cancelled' as const,
        cancelledAt: new Date().toISOString(),
        cancelReason: chosenReason,
      }));

      const updatedOrder: OrderRecord = {
        ...order,
        status: 'Cancelled',
        cartItemsSnapshot: updatedSnapshot,
      };

      setOrder(updatedOrder);

      // Persist cancellation to localStorage
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('baha_placed_orders');
          const parsed = stored ? (JSON.parse(stored) as OrderRecord[]) : [];
          const existingIdx = parsed.findIndex((o) => o.orderId === order.orderId);
          let updatedList: OrderRecord[];
          if (existingIdx >= 0) {
            updatedList = parsed.map((o) => (o.orderId === order.orderId ? updatedOrder : o));
          } else {
            updatedList = [updatedOrder, ...parsed];
          }
          localStorage.setItem('baha_placed_orders', JSON.stringify(updatedList));
        } catch (err) {
          console.error('Failed to update cancelled order in localStorage:', err);
        }
      }

      showToast(`Order #${order.orderId} has been cancelled successfully.`);
    }

    setIsCancelling(false);
    setShowCancelModal(false);
  };

  // Open Rate & Review sheet
  const handleOpenReviewModal = (item: OrderItem) => {
    if (!order) return;
    setTargetItemToReview(item);
    const key = getReviewKey(order.orderId, item.id, item.selectedSize);
    const existing = reviews[key];
    if (existing) {
      setRatingInput(existing.rating);
      setReviewComment(existing.comment || '');
    } else {
      setRatingInput(5);
      setReviewComment('');
    }
    setHoverRating(0);
    setShowReviewModal(true);
  };

  // Submit Rate & Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || !targetItemToReview) return;
    if (!ratingInput) {
      showToast('Please select a star rating ⭐');
      return;
    }
    if (!reviewComment.trim()) {
      showToast('Please share your review in the box ✍️');
      return;
    }

    setIsSubmittingReview(true);

    const key = getReviewKey(order.orderId, targetItemToReview.id, targetItemToReview.selectedSize);
    const newReview: ItemReview = {
      orderId: order.orderId,
      itemId: targetItemToReview.id,
      itemSize: targetItemToReview.selectedSize,
      rating: ratingInput,
      comment: reviewComment.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedReviews = { ...reviews, [key]: newReview };
    setReviews(updatedReviews);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('baha_order_reviews', JSON.stringify(updatedReviews));
      } catch (err) {
        console.error('Failed to save review in localStorage:', err);
      }
    }

    setIsSubmittingReview(false);
    setShowReviewModal(false);
    setTargetItemToReview(null);
    showToast(`Thank you! Review for "${targetItemToReview.name}" was submitted ⭐`);
  };

  // Open Return Request sheet
  const handleOpenReturnModal = (item: OrderItem | null) => {
    if (!order) return;
    setTargetItemToReturn(item);
    if (item) {
      setSelectedReturnKeys([getReturnKey(order.orderId, item.id, item.selectedSize)]);
    } else {
      setSelectedReturnKeys(
        activeReturnableItems.map((i) => getReturnKey(order.orderId, i.id, i.selectedSize))
      );
    }
    setReturnReason('Size didn’t fit / too small');
    setReturnComments('');
    setRefundMode('original');
    setShowReturnModal(true);
  };

  // Submit Return Request
  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    if (selectedReturnKeys.length === 0) {
      showToast('Please select at least one item to return');
      return;
    }

    setIsSubmittingReturn(true);

    const now = new Date().toISOString();
    const updatedReturns = { ...returnRequests };

    orderItems.forEach((item) => {
      const key = getReturnKey(order.orderId, item.id, item.selectedSize);
      if (selectedReturnKeys.includes(key)) {
        updatedReturns[key] = {
          orderId: order.orderId,
          itemId: item.id,
          itemSize: item.selectedSize,
          reason: returnReason,
          comments: returnComments.trim(),
          refundMode,
          requestedAt: now,
          status: 'Pending Pickup',
        };
      }
    });

    setReturnRequests(updatedReturns);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('baha_order_returns', JSON.stringify(updatedReturns));
      } catch (err) {
        console.error('Failed to save return request in localStorage:', err);
      }
    }

    setTimeout(() => {
      setIsSubmittingReturn(false);
      setShowReturnModal(false);
      setTargetItemToReturn(null);
      showToast('Return request submitted! Doorstep reverse pickup scheduled in 24–48 hours 📦');
    }, 500);
  };

  // Professional Invoice Download via pure vector jsPDF (no html2canvas / CSS color parser issues)
  const handleDownloadInvoicePdf = async () => {
    if (!order) return;
    setIsDownloadingPdf(true);
    showToast('Generating official Tax Invoice PDF... ⏳');

    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
      const margin = 14;
      const contentWidth = pageWidth - margin * 2; // 182mm

      // Brand Color Palette
      const primaryColor: [number, number, number] = [108, 99, 168]; // #6C63A8 (Brand Purple)
      const darkColor: [number, number, number] = [31, 41, 55]; // #1F2937
      const grayColor: [number, number, number] = [107, 114, 128]; // #6B7280
      const lightBg: [number, number, number] = [250, 248, 245]; // #FAF8F5
      const borderColor: [number, number, number] = [229, 224, 216]; // #E5E0D8

      // ── Header Band ──
      doc.setFillColor(...primaryColor);
      doc.rect(margin, margin, contentWidth, 22, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text('BAHA ORGANIC KIDSWEAR', margin + 6, margin + 9);

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(240, 238, 248);
      doc.text('Baha Retail Lifestyle Private Limited • GSTIN: 06AAACB1234F1Z8', margin + 6, margin + 15);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text('TAX INVOICE', pageWidth - margin - 6, margin + 10, { align: 'right' });
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.text('(Original for Recipient)', pageWidth - margin - 6, margin + 15, { align: 'right' });

      // ── Invoice Meta Strip ──
      let y = margin + 27;
      doc.setFillColor(...lightBg);
      doc.setDrawColor(...borderColor);
      doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

      doc.setFontSize(8);
      doc.setTextColor(...grayColor);
      doc.text('Invoice No:', margin + 6, y + 6);
      doc.text('Invoice Date:', margin + 6, y + 12);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkColor);
      doc.text(invoiceNumber, margin + 26, y + 6);
      doc.text(new Date(order.date).toLocaleDateString('en-IN'), margin + 26, y + 12);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...grayColor);
      doc.text('Order ID:', margin + 66, y + 6);
      doc.text('Payment Mode:', margin + 66, y + 12);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkColor);
      doc.text(`#${order.orderId}`, margin + 88, y + 6);
      doc.text(order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid (UPI)', margin + 88, y + 12);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...grayColor);
      doc.text('Place of Supply:', margin + 126, y + 6);
      doc.text('Carrier / AWB:', margin + 126, y + 12);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkColor);
      doc.text('Uttar Pradesh (09)', margin + 152, y + 6);
      doc.text(order.trackingNumber || 'BD-88492019', margin + 152, y + 12);

      // ── Billed To & Shipped To Section ──
      y += 24;
      const colW = (contentWidth - 6) / 2;

      // Box 1: Sold By
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, y, colW, 28, 2, 2, 'D');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...primaryColor);
      doc.text('SOLD BY (SELLER)', margin + 5, y + 6);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...darkColor);
      doc.text('Baha Retail Lifestyle Pvt. Ltd.', margin + 5, y + 11);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...grayColor);
      doc.text('Plot No. 44, Udyog Vihar Phase 4, Gurugram, Haryana - 122016', margin + 5, y + 16);
      doc.text('CIN: U18101HR2023PTC109823 • GSTIN: 06AAACB1234F1Z8', margin + 5, y + 20);
      doc.text('support@bahafashion.com • +91 98765 43210', margin + 5, y + 24);

      // Box 2: Billed & Shipped To
      const x2 = margin + colW + 6;
      doc.roundedRect(x2, y, colW, 28, 2, 2, 'D');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...primaryColor);
      doc.text('BILLED & SHIPPED TO (CUSTOMER)', x2 + 5, y + 6);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...darkColor);
      doc.text(order.address?.name || 'Priya Sharma', x2 + 5, y + 11);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...grayColor);
      doc.text(`${order.address?.line1 || '42, Rose Garden Apartments'}, ${order.address?.city || 'Noida'}`, x2 + 5, y + 16);
      doc.text(`${order.address?.state || 'Uttar Pradesh'} - ${order.address?.pincode || '201301'}`, x2 + 5, y + 20);
      doc.text(`Contact: ${order.address?.phone || '+91 98765 43210'}`, x2 + 5, y + 24);

      // ── Goods Table ──
      y += 33;
      doc.setFillColor(...primaryColor);
      doc.rect(margin, y, contentWidth, 7, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text('#', margin + 3, y + 5);
      doc.text('Description of Garment', margin + 12, y + 5);
      doc.text('HSN', margin + 85, y + 5);
      doc.text('Qty', margin + 100, y + 5);
      doc.text('Unit Rate', margin + 115, y + 5);
      doc.text('Taxable', margin + 135, y + 5);
      doc.text('GST (5%)', margin + 155, y + 5);
      doc.text('Total (INR)', margin + contentWidth - 3, y + 5, { align: 'right' });

      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);

      orderItems.forEach((item, idx) => {
        const itemTotal = (item.price || 0) * (item.quantity || 1);
        const taxable = itemTotal * 0.95238;
        const gst = itemTotal * 0.04762;

        if (idx % 2 === 1) {
          doc.setFillColor(...lightBg);
          doc.rect(margin, y, contentWidth, 8, 'F');
        }

        doc.setDrawColor(...borderColor);
        doc.line(margin, y + 8, margin + contentWidth, y + 8);

        doc.setTextColor(...darkColor);
        doc.text(String(idx + 1), margin + 3, y + 5.5);

        const itemName = item.name.length > 38 ? item.name.substring(0, 36) + '...' : item.name;
        doc.text(itemName, margin + 12, y + 5.5);

        doc.setTextColor(...grayColor);
        doc.text('6209', margin + 85, y + 5.5);
        doc.text(String(item.quantity || 1), margin + 100, y + 5.5);

        doc.text(`INR ${(item.price || 0).toFixed(2)}`, margin + 115, y + 5.5);
        doc.text(`INR ${taxable.toFixed(2)}`, margin + 135, y + 5.5);
        doc.text(`INR ${gst.toFixed(2)}`, margin + 155, y + 5.5);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...darkColor);
        doc.text(`INR ${itemTotal.toFixed(2)}`, margin + contentWidth - 3, y + 5.5, { align: 'right' });
        doc.setFont('helvetica', 'normal');

        y += 8;
      });

      // ── Total Summary Section ──
      y += 4;
      const summaryW = 76;
      const summaryX = margin + contentWidth - summaryW;

      doc.setFillColor(...lightBg);
      doc.setDrawColor(...borderColor);
      doc.roundedRect(summaryX, y, summaryW, 28, 2, 2, 'FD');

      doc.setFontSize(7.5);
      doc.setTextColor(...grayColor);
      doc.text('Subtotal (Taxable):', summaryX + 5, y + 5.5);
      doc.text('CGST (2.5%):', summaryX + 5, y + 10.5);
      doc.text('SGST (2.5%):', summaryX + 5, y + 15.5);
      doc.text('Shipping:', summaryX + 5, y + 20.5);

      doc.setTextColor(...darkColor);
      doc.text(`INR ${(order.total - totalTaxIncluded).toFixed(2)}`, summaryX + summaryW - 5, y + 5.5, { align: 'right' });
      doc.text(`INR ${cgst.toFixed(2)}`, summaryX + summaryW - 5, y + 10.5, { align: 'right' });
      doc.text(`INR ${sgst.toFixed(2)}`, summaryX + summaryW - 5, y + 15.5, { align: 'right' });
      doc.setTextColor(16, 185, 129);
      doc.text('FREE', summaryX + summaryW - 5, y + 20.5, { align: 'right' });

      doc.setDrawColor(...borderColor);
      doc.line(summaryX + 5, y + 22, summaryX + summaryW - 5, y + 22);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...primaryColor);
      doc.text('Grand Total:', summaryX + 5, y + 26);
      doc.text(`INR ${order.total.toFixed(2)}`, summaryX + summaryW - 5, y + 26, { align: 'right' });

      // Amount in Words & Notes on left
      const noteW = contentWidth - summaryW - 6;
      doc.setFontSize(7.5);
      doc.setTextColor(...grayColor);
      doc.text('Total Amount in Words:', margin, y + 5.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkColor);
      doc.text(numberToWords(order.total), margin, y + 10.5, { maxWidth: noteW });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...grayColor);
      doc.text('Terms & Declarations:', margin, y + 17);
      doc.text('1. Certified that all particulars and GST calculations are true and correct.', margin, y + 21);
      doc.text('2. 100% GOTS Certified Organic Cotton. 7 days exchange policy applies.', margin, y + 25);

      // Signatory
      y += 34;
      doc.setFontSize(7.5);
      doc.setTextColor(...grayColor);
      doc.text('Computer-generated tax invoice under IT Act, 2000. Requires no physical signature.', margin, y + 4);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text('Authorized Signatory: Baha Retail Lifestyle Private Limited', margin + contentWidth, y + 4, { align: 'right' });

      doc.save(`Baha-Tax-Invoice-${order.orderId}.pdf`);
      showToast(`Tax Invoice #${order.orderId} downloaded successfully! 📄`);
    } catch (err) {
      console.error('PDF error:', err);
      if (typeof window !== 'undefined') window.print();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Trigger browser print
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-purple/20 border-t-brand-purple rounded-full animate-spin" />
          <p className="text-sm font-semibold text-text-muted">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-16 px-4">
        <div className="max-w-md mx-auto text-center bg-white rounded-3xl p-8 border border-[#EFECE6] shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-black text-xl text-text-main">Order Not Found</h2>
          <p className="text-xs text-text-muted mt-2">
            We couldn&apos;t find an order matching #{decodedOrderId}. Please check your order ID or browse your orders list.
          </p>
          <div className="mt-6">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0F2438] text-white text-xs font-bold hover:bg-brand-purple transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Orders</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG['Processing'];
  const StatusIcon = statusConfig.icon;

  // Breakdown Calculations
  const activeSubtotal = activeItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const refundedAmount = cancelledItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const subtotal = activeItems.length > 0 ? activeSubtotal : (orderItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0) || order.total);
  const shippingFee = 0.0;
  const packagingFee = 0.0;
  const totalTaxIncluded = Number((order.total * 0.05).toFixed(2));
  const cgst = Number((totalTaxIncluded / 2).toFixed(2));
  const sgst = Number((totalTaxIncluded / 2).toFixed(2));
  const invoiceNumber = `INV-2026-BH-${order.orderId.replace(/\D/g, '') || '9821'}`;

  // Formatted order and delivery dates
  const orderPlacedDate = new Date(order.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const deliveredDateFormatted =
    order.deliveredDate ||
    (order.status === 'Delivered'
      ? `${new Date(order.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}, 02:45 PM`
      : null);

  // Tracking Timeline steps (Clean & Minimal)
  const trackingSteps = [
    {
      title: 'Order Placed',
      time: `${new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, 10:30 AM`,
      status: 'done',
    },
    {
      title: 'Processing',
      time: order.status === 'Processing' ? 'In Progress' : `${new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, 04:15 PM`,
      status: order.status === 'Processing' ? 'current' : order.status === 'Cancelled' ? 'upcoming' : 'done',
    },
    {
      title: 'In Transit',
      time: order.status === 'In Transit' || order.status === 'Delivered' ? 'Oct 9, 08:45 AM' : 'Pending',
      status: order.status === 'In Transit' ? 'current' : order.status === 'Delivered' ? 'done' : 'upcoming',
    },
    {
      title: 'Out for Delivery',
      time: order.status === 'Delivered' ? 'Oct 10, 09:30 AM' : 'Expected soon',
      status: order.status === 'Delivered' ? 'done' : 'upcoming',
    },
    {
      title: 'Delivered',
      time: order.status === 'Delivered' ? 'Oct 10, 02:45 PM' : order.estimatedDelivery || 'Thursday, 16 Oct',
      status: order.status === 'Delivered' ? 'done' : 'upcoming',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-body text-text-main pb-20 pt-6">
      {/* Toast Notifications */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F2438] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in border border-white/10">
          <Sparkles className="w-4 h-4 text-brand-yellow shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
      {toast && <ToastNotification toast={toast} onClose={() => setToast(null)} />}

      {/* Main Container - Aligned with Baha logo grid */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Top Navigation Bar / Breadcrumb ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#DDD8CE] bg-white text-xs font-semibold text-text-main hover:border-brand-purple hover:text-brand-purple hover:bg-brand-purple-light/20 transition-all shadow-2xs group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Orders</span>
            </Link>
          </div>

          {/* Quick Header Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Download PDF button: ONLY shown when order.status === 'Delivered' */}
            {order.status === 'Delivered' && (
              <button
                type="button"
                onClick={handleDownloadInvoicePdf}
                disabled={isDownloadingPdf}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-purple text-white hover:bg-[#584F93] shadow-xs shadow-brand-purple/20 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isDownloadingPdf ? 'Generating PDF...' : 'Download Invoice (PDF)'}</span>
              </button>
            )}

            {/* Need Help? Quick Action */}
            <Link
              href="/profile?tab=support"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#DDD8CE] bg-white text-xs font-semibold text-text-muted hover:text-brand-purple hover:border-brand-purple hover:bg-brand-purple-light/20 transition-all shadow-2xs cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-brand-purple" />
              <span>Need Help?</span>
            </Link>
          </div>
        </div>

        {/* ── Order Header Banner (Simple & Clean) ── */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-black text-xl sm:text-2xl text-text-main">
                Order #{order.orderId}
              </h1>
              <button
                type="button"
                onClick={() => handleCopyText(order.orderId, 'orderId')}
                title="Copy Order ID"
                className="p-1 rounded-md text-text-muted hover:text-brand-purple hover:bg-brand-purple-light/40 transition-colors cursor-pointer"
              >
                {copiedOrderId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-xs text-text-muted mt-1">
              <span>
                Placed on{' '}
                <span className="text-text-main font-semibold">
                  {orderPlacedDate}
                </span>
              </span>
              {order.status === 'Delivered' && deliveredDateFormatted && (
                <>
                  <span className="text-[#DDD8CE]">•</span>
                  <span className="text-emerald-700 font-semibold inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
                    Delivered on {deliveredDateFormatted}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {order.status === 'Delivered' && activeReturnableItems.length > 0 && (
              <button
                type="button"
                onClick={() => handleOpenReturnModal(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-text-muted hover:text-brand-purple bg-white border border-[#DDD8CE] hover:border-brand-purple hover:bg-brand-purple-light/20 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Request Return</span>
              </button>
            )}

            <span
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}
            >
              <span>{statusConfig.label}</span>
            </span>
          </div>
        </div>

        {/* Active Return Notice */}
        {order.status === 'Delivered' && activeReturnRequests.length > 0 && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-950">
                  Return Request Underway ({activeReturnRequests.length} {activeReturnRequests.length === 1 ? 'item' : 'items'})
                </p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Reverse doorstep pickup is scheduled at your delivery address. Refund will be initiated once verified.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-900 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200 self-start sm:self-center shrink-0">
              Pickup within 24–48 hrs
            </span>
          </div>
        )}

        {/* Processing Order Alert & Cancel Action */}
        {order.status === 'Processing' && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-start sm:items-center gap-3">

              <div>
                <p className="text-xs font-bold text-amber-950">
                  {cancelledItems.length > 0
                    ? `Order in processing (${cancelledItems.length} ${cancelledItems.length === 1 ? 'item' : 'items'} cancelled)`
                    : 'This order is currently being processed'}
                </p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  {cancelledItems.length > 0
                    ? `Your remaining ${activeItems.length} item(s) are being prepared. Refund of ₹${refundedAmount.toFixed(2)} is being processed.`
                    : 'Items are being prepared and packed. You can cancel individual items or the entire order before dispatch.'}
                </p>
              </div>
            </div>
            {activeItems.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setTargetItemToCancel(null);
                  setShowCancelModal(true);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-red-500 hover:bg-red-400 text-white transition-all shadow-2xs shrink-0 cursor-pointer active:scale-98"
              >
                <span>Cancel Order</span>
              </button>
            )}
          </div>
        )}

        {/* Cancelled Order Notice */}
        {order.status === 'Cancelled' && (
          <div className="mt-4 p-4 rounded-2xl bg-rose-50/90 border border-rose-200 flex items-center gap-3 shadow-2xs animate-fade-in">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <X className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-rose-950">
                Order Cancelled
              </p>
              <p className="text-[11px] text-rose-800 mt-0.5">
                This order was cancelled. Any prepaid payment of ₹{order.total.toFixed(2)} will be refunded back to your original payment method within 3–5 business days.
              </p>
            </div>
          </div>
        )}

        {/* ── Tracking Bar (Clean & Simple) - Shown only for active shipments (Hidden when Delivered or Cancelled) ── */}
        {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
          <div className="mt-8 bg-white rounded-2xl border border-[#EFECE6] p-5 sm:p-6 shadow-2xs">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#F2EFE9]">
              <h2 className="font-heading font-black text-base sm:text-lg text-text-main">
                Shipment Tracking
              </h2>
              <p className="text-xs text-text-muted flex items-center gap-2">
                <span>Carrier: <strong className="text-text-main font-semibold">{order.carrier || 'Blue Dart Express'}</strong></span>
                <span>•</span>
                <span>AWB: <strong className="text-brand-purple font-bold">{order.trackingNumber || 'BD-88492019'}</strong></span>
                <button
                  type="button"
                  onClick={() => handleCopyText(order.trackingNumber || 'BD-88492019', 'awb')}
                  className="p-1 rounded text-text-muted hover:text-brand-purple transition-colors cursor-pointer"
                  title="Copy AWB Number"
                >
                  {copiedAWB ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </p>
            </div>

            {/* Stepper */}
            <div className="pt-6 sm:pt-8">
              {/* Desktop Horizontal Stepper */}
              <div className="hidden lg:grid grid-cols-5 gap-2 relative">
                {/* Connecting progress line */}
                <div className="absolute top-5 left-[10%] right-[10%] h-1 bg-[#F0ECE6] -z-0">
                  <div
                    className="h-full bg-linear-to-r from-emerald-500 to-brand-purple transition-all duration-700"
                    style={{
                      width:
                        order.status === 'In Transit'
                          ? '55%'
                          : '25%',
                    }}
                  />
                </div>

                {trackingSteps.map((step, idx) => {
                  const isDone = step.status === 'done';
                  const isCurrent = step.status === 'current';

                  return (
                    <div key={idx} className="flex flex-col items-center text-center relative z-10 px-2">
                      {/* Circle Node */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isDone
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-brand-purple text-white ring-4 ring-brand-purple/20 shadow-xs'
                            : 'bg-white text-text-muted border border-[#E5E0D8]'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                        ) : isCurrent ? (
                          <Truck className="w-5 h-5 stroke-[2]" />
                        ) : (
                          <Clock className="w-4 h-4 text-text-muted/60" />
                        )}
                      </div>

                      {/* Step Title & Timestamp */}
                      <h4
                        className={`font-heading font-bold text-xs sm:text-sm mt-3 ${
                          isCurrent ? 'text-brand-purple font-black' : isDone ? 'text-text-main' : 'text-text-muted'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[11px] text-text-muted mt-1 font-medium">
                        {step.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Mobile / Tablet Vertical Stepper */}
              <div className="lg:hidden space-y-5 relative pl-1">
                {trackingSteps.map((step, idx, arr) => {
                  const isDone = step.status === 'done';
                  const isCurrent = step.status === 'current';

                  return (
                    <div key={idx} className="flex items-center gap-3.5 relative">
                      {/* Connecting line */}
                      {idx < arr.length - 1 && (
                        <div
                          className={`absolute left-[17px] top-8 bottom-[-20px] w-0.5 ${
                            isDone ? 'bg-emerald-500' : 'bg-[#EAE6DF]'
                          }`}
                        />
                      )}

                      {/* Node */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          isDone
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-brand-purple text-white ring-4 ring-brand-purple/20'
                            : 'bg-[#FAF8F5] text-text-muted border border-[#E5E0D8]'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 stroke-[2]" />
                        ) : isCurrent ? (
                          <Truck className="w-4 h-4 stroke-[2]" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-text-muted" />
                        )}
                      </div>

                      {/* Title and Time */}
                      <div className="flex-1 flex items-center justify-between gap-2">
                        <h4
                          className={`font-heading font-bold text-xs sm:text-sm ${
                            isCurrent ? 'text-brand-purple font-black' : isDone ? 'text-text-main' : 'text-text-muted'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[11px] text-text-muted font-medium">
                          {step.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Main Layout: Products (Left) + Breakdown & Address (Right) ── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: ORDER PRODUCT DETAILS (Col 7 / 12)
             ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Products Card */}
            <div className="bg-white rounded-3xl border border-[#EFECE6] p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-5 border-b border-[#F2EFE9]">
                <div>
                  <h2 className="font-heading font-black text-xl text-text-main">
                    Order Items ({orderItems.length})
                  </h2>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#F2EFE9]">
                {orderItems.map((item, idx) => {
                  const isItemCancelled = item.status === 'Cancelled' || order.status === 'Cancelled';
                  const canCancelItem = order.status === 'Processing' && !isItemCancelled;
                  const itemTotal = (item.price || 0) * (item.quantity || 1);
                  const itemReviewKey = getReviewKey(order.orderId, item.id, item.selectedSize);
                  const itemReview = reviews[itemReviewKey];
                  const itemReturnKey = getReturnKey(order.orderId, item.id, item.selectedSize);
                  const itemReturn = returnRequests[itemReturnKey];

                  return (
                    <div key={`${item.id}-${idx}`} className="py-5 sm:py-6 flex flex-col sm:flex-row items-start gap-4">
                      {/* Product Image */}
                      <Link
                        href={`/product/${item.id}`}
                        className={`group/img block rounded-2xl overflow-hidden shrink-0 border border-[#EFECE6] bg-[#FAF8F5] shadow-2xs relative ${
                          isItemCancelled ? 'opacity-60' : ''
                        }`}
                      >
                        <img
                          src={item.featuredImage}
                          alt={item.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover group-hover/img:scale-105 transition-transform duration-300"
                        />
                        {isItemCancelled && (
                          <div className="absolute inset-0 bg-white/40 flex items-center justify-center pointer-events-none">
                            <span className="bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                              Cancelled
                            </span>
                          </div>
                        )}
                      </Link>

                      {/* Product Specs */}
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Link
                                href={`/product/${item.id}`}
                                className={`font-heading font-bold text-sm sm:text-base hover:text-brand-purple transition-colors line-clamp-1 ${
                                  isItemCancelled ? 'text-text-muted line-through' : 'text-text-main'
                                }`}
                              >
                                {item.name}
                              </Link>
                              {isItemCancelled && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                  <span>Cancelled</span>
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] font-semibold text-brand-purple mt-0.5">
                              100% GOTS Organic Cotton • Hypoallergenic
                            </p>
                          </div>

                          {/* Price */}
                          <div className="text-right shrink-0">
                            <span
                              className={`font-heading font-black text-sm sm:text-base block ${
                                isItemCancelled ? 'line-through text-text-muted' : 'text-text-main'
                              }`}
                            >
                              ₹{itemTotal.toFixed(2)}
                            </span>
                            {item.quantity && item.quantity > 1 && (
                              <span className="text-[10px] text-text-muted block">
                                (₹{item.price.toFixed(2)} × {item.quantity})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Variant Badges & Actions */}
                        <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF8F5] border border-[#EAE6DE] text-[11px] font-bold text-text-muted">
                              Size: <strong className="text-text-main">{item.selectedSize || '3-4Y'}</strong>
                            </span>
                            <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF8F5] border border-[#EAE6DE] text-[11px] font-bold text-text-muted">
                              Color: <strong className="text-text-main">{item.selectedColor || 'Standard'}</strong>
                            </span>
                            <span className="px-2.5 py-0.5 rounded-lg bg-[#FAF8F5] border border-[#EAE6DE] text-[11px] font-bold text-text-muted">
                              Qty: <strong className="text-text-main">{item.quantity || 1}</strong>
                            </span>
                          </div>

                          {/* Cancel Item Button for this individual product */}
                          {canCancelItem && (
                            <button
                              type="button"
                              onClick={() => {
                                setTargetItemToCancel(item);
                                setShowCancelModal(true);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-red-500 border border-rose-400 hover:bg-red-400 hover:border-rose-400 transition-all cursor-pointer shadow-2xs active:scale-95"
                            >
                              <span>Cancel Item</span>
                            </button>
                          )}

                          {/* Delivered Actions: Rate & Review and Return Item grouped together */}
                          {order.status === 'Delivered' && !isItemCancelled && (
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleOpenReviewModal(item)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0 ${
                                  itemReview
                                    ? 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                                    : 'bg-brand-purple text-white hover:bg-[#584F93] shadow-xs'
                                }`}
                              >
                                <span>{itemReview ? 'Edit Review' : 'Rate & Review'}</span>
                              </button>

                              {itemReturn ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 shrink-0">
                                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                                  <span>Return: {itemReturn.status}</span>
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleOpenReturnModal(item)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-text-muted hover:text-brand-purple bg-white border border-[#DDD8CE] hover:border-brand-purple hover:bg-brand-purple-light/20 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                  <span>Return Item</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Customer Review display if already submitted */}
                        {itemReview && !isItemCancelled && (
                          <div className="mt-3 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DE] space-y-1.5 animate-fade-in">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center text-amber-400">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-3.5 h-3.5 ${star <= itemReview.rating ? 'fill-amber-400 text-amber-400' : 'text-[#DDD8CE]'}`}
                                    />
                                  ))}
                                </div>
                                {itemReview.title && (
                                  <span className="font-bold text-xs text-text-main">{itemReview.title}</span>
                                )}
                              </div>
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200 shrink-0">
                                Verified Purchase
                              </span>
                            </div>
                            <p className="text-[11px] text-text-muted leading-relaxed italic">
                              &ldquo;{itemReview.comment}&rdquo;
                            </p>
                            {itemReview.tags && itemReview.tags.length > 0 && (
                              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                                {itemReview.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-md bg-white border border-[#EAE6DE] text-[10px] font-semibold text-text-muted"
                                  >
                                    ✓ {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Cancelled notice on item */}
                        {isItemCancelled && (
                          <div className="mt-2.5 p-2 rounded-xl bg-rose-50/70 border border-rose-200/60 text-[11px] text-rose-800 flex items-center justify-between gap-2">
                            <span>This item was cancelled. Refund of <strong>₹{itemTotal.toFixed(2)}</strong> is being processed.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: VALUE BREAKDOWN & SHIPPING ADDRESS (Col 5 / 12)
             ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Total Value Breakdown Card */}
            <div className="bg-white rounded-3xl border border-[#EFECE6] p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2EFE9]">
                <h3 className="font-heading font-black text-lg text-text-main">Order Summary</h3>
              </div>

              <div className="py-4 space-y-3 text-xs border-b border-[#F2EFE9]">
                <div className="flex justify-between items-center text-text-muted">
                  <span>Items Subtotal ({activeItems.length > 0 ? activeItems.length : orderItems.length} {activeItems.length === 1 ? 'item' : 'items'})</span>
                  <span className="font-bold text-text-main">₹{subtotal.toFixed(2)}</span>
                </div>

                {refundedAmount > 0 && (
                  <div className="flex justify-between items-center text-rose-600 bg-rose-50/70 border border-rose-200/60 p-2 rounded-xl">
                    <span className="font-semibold">Refund Initiated ({cancelledItems.length} {cancelledItems.length === 1 ? 'item' : 'items'})</span>
                    <span className="font-bold">-₹{refundedAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-text-muted">
                  <span className="flex items-center gap-1">
                    <span>Standard Shipping</span>
                  </span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>

                <div className="flex justify-between items-center text-text-muted">
                  <span>Eco-Packaging &amp; Garment Bag</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>

                {/* GST Tax Breakdown */}
                <div className="pt-2 border-t border-[#F2EFE9]/60">
                  <div className="flex justify-between items-center text-text-muted">
                    <span>CGST (2.5% Included)</span>
                    <span>₹{cgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-text-muted mt-1">
                    <span>SGST (2.5% Included)</span>
                    <span>₹{sgst.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-text-muted tracking-wider block">
                    Total Amount Paid
                  </span>
                  <span className="text-[11px] text-text-muted">Inclusive of all taxes &amp; duties</span>
                </div>
                <div className="text-right">
                  <span className="font-heading font-black text-2xl text-brand-purple">
                    ₹{order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Address Card */}
            <div className="bg-white rounded-3xl border border-[#EFECE6] p-6 shadow-xs">
              <div className="flex items-center pb-4 border-b border-[#F2EFE9]">
                <h3 className="font-heading font-bold text-base text-text-main">Delivery Address</h3>
              </div>

              <div className="pt-4 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-text-main text-sm">
                    {order.address?.name || 'Priya Sharma'}
                  </p>
                  <span className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#EAE6DE] text-[10px] font-bold text-text-muted">
                    {order.address?.label || 'Home'}
                  </span>
                </div>

                <p className="text-text-muted leading-relaxed">
                  {order.address?.line1 || '42, Rose Garden Apartments'},<br />
                  {order.address?.line2 || 'Sector 18, Noida'}<br />
                  {order.address?.city || 'Noida'}, {order.address?.state || 'Uttar Pradesh'} -{' '}
                  <strong className="text-text-main">{order.address?.pincode || '201301'}</strong>
                </p>

                <div className="pt-2 text-[11px] text-text-muted flex items-center gap-1 font-mono">
                  <Phone className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span>{order.address?.phone || '+91 98765 43210'}</span>
                </div>
              </div>
            </div>

            {/* Modern Order Assistance Card */}
            <div className="bg-white rounded-3xl border border-[#EFECE6] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F2EFE9]">
                <HelpCircle className="w-4 h-4 text-brand-purple" />
                <h3 className="font-heading font-bold text-base text-text-main">
                  Order Assistance
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                {order.status === 'Processing' && activeItems.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-between gap-3 hover:border-brand-purple/30 transition-colors">
                    <div>
                      <p className="font-bold text-text-main">Need to cancel this order?</p>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        Free cancellation is available before your package is dispatched.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setTargetItemToCancel(null);
                        setShowCancelModal(true);
                      }}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 bg-white hover:bg-rose-50 hover:border-rose-300 text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0 active:scale-95 whitespace-nowrap"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-between gap-3 hover:border-brand-purple/30 transition-colors">
                  <div>
                    <p className="font-bold text-text-main">Need to update shipping address?</p>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      Need help or changes? Our customer support team is here to assist.
                    </p>
                  </div>
                  <Link
                    href="/profile?tab=support"
                    className="px-3 py-1.5 rounded-xl border border-[#DDD8CE] text-text-main bg-white hover:border-brand-purple hover:text-brand-purple text-xs font-bold transition-all shadow-2xs shrink-0 inline-flex items-center gap-1 active:scale-95 whitespace-nowrap"
                  >
                    <span>Help Desk</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* ─────────────────────────────────────────────────────────────
          POPUP MODAL: TAX INVOICE VIEWER
         ───────────────────────────────────────────────────────────── */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-2xl max-w-2xl w-full p-6 sm:p-8 animate-scale-up max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#EFECE6]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-purple bg-brand-purple-light px-2.5 py-0.5 rounded-full">
                  Official GST Tax Invoice
                </span>
                <h3 className="font-heading font-black text-xl text-text-main mt-1">
                  Invoice #{invoiceNumber}
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Order #{order.orderId} • Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="p-1.5 rounded-xl text-text-muted hover:text-text-main hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice preview body */}
            <div className="py-4 space-y-4 text-xs">
              {/* Seller / Buyer snapshot */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DE]">
                <div>
                  <span className="text-[10px] font-bold uppercase text-text-muted block">Sold By</span>
                  <p className="font-bold text-text-main">Baha Retail Lifestyle Pvt Ltd</p>
                  <p className="text-[11px] text-text-muted">GSTIN: 06AAACB1234F1Z8</p>
                  <p className="text-[11px] text-text-muted">Gurugram, Haryana - 122016</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-text-muted block">Billed To</span>
                  <p className="font-bold text-text-main">{order.address?.name || 'Priya Sharma'}</p>
                  <p className="text-[11px] text-text-muted">{order.address?.city}, {order.address?.state}</p>
                  <p className="text-[11px] text-text-muted">Place of Supply: Uttar Pradesh (09)</p>
                </div>
              </div>

              {/* Items summary */}
              <div>
                <span className="text-[11px] font-bold uppercase text-text-muted block mb-2">Itemized Breakdown</span>
                <div className="divide-y divide-[#F2EFE9] border-y border-[#F2EFE9]">
                  {orderItems.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.featuredImage}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#EFECE6]"
                        />
                        <div>
                          <p className="font-bold text-text-main">{item.name}</p>
                          <p className="text-[10px] text-text-muted">HSN: 6209 • Qty: {item.quantity || 1} • Size: {item.selectedSize}</p>
                        </div>
                      </div>
                      <span className="font-bold font-mono text-text-main">
                        ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-[#F2EFE9]">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>CGST (2.5%)</span>
                  <span>₹{cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>SGST (2.5%)</span>
                  <span>₹{sgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Shipping Fee</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between font-heading font-black text-base text-text-main pt-2 border-t border-[#EFECE6]">
                  <span>Total Amount</span>
                  <span className="text-brand-purple">₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#EFECE6] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl border border-[#DDD8CE] text-xs font-bold text-text-main hover:border-brand-purple hover:text-brand-purple transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadInvoicePdf}
                  disabled={isDownloadingPdf}
                  className="px-5 py-2.5 rounded-full bg-brand-purple hover:bg-[#584F93] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloadingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          RIGHT SIDE SHEET: CANCEL ORDER DRAWER
         ───────────────────────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          showCancelModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setShowCancelModal(false);
          setTargetItemToCancel(null);
        }}
        aria-hidden={!showCancelModal}
      />

      {/* Right Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[51] w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          showCancelModal ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Cancel Drawer"
        aria-hidden={!showCancelModal}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFECE6] bg-[#FAF8F5]/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg text-text-main leading-tight">
                {targetItemToCancel
                  ? 'Cancel Item'
                  : activeItems.length > 1
                  ? 'Cancel Entire Order'
                  : 'Cancel Order'}
              </h3>
              <p className="text-[11px] text-text-muted mt-0.5">
                Order #{order.orderId} • {targetItemToCancel ? '1 item selected' : `${activeItems.length} active ${activeItems.length === 1 ? 'item' : 'items'}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowCancelModal(false);
              setTargetItemToCancel(null);
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-main hover:bg-[#EFECE6] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 text-xs">
          {/* Target Item Snapshot (when cancelling individual item) */}
          {targetItemToCancel ? (
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFECE6] flex items-center gap-3.5 animate-fade-in">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-[#EFECE6] shrink-0">
                <img
                  src={targetItemToCancel.featuredImage}
                  alt={targetItemToCancel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-text-main truncate">
                  {targetItemToCancel.name}
                </h4>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Size: <strong className="text-text-main">{targetItemToCancel.selectedSize || '3-4Y'}</strong> • Qty: <strong className="text-text-main">{targetItemToCancel.quantity || 1}</strong>
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-bold font-mono text-xs text-text-main">
                    ₹{((targetItemToCancel.price || 0) * (targetItemToCancel.quantity || 1)).toFixed(2)}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Refundable
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Entire Order Cancellation Summary (Modern eCommerce UX) */
            <div className="space-y-4 animate-fade-in">
              {/* Active Items Stack */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFECE6] space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#EAE6DE]">
                  <span className="font-bold text-text-main">
                    Items to be Cancelled ({activeItems.length})
                  </span>
                  <span className="font-bold font-mono text-brand-purple">
                    ₹{activeSubtotal.toFixed(2)}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {activeItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-white border border-[#EAE6DE] shrink-0">
                        <img
                          src={item.featuredImage}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs text-text-main truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-text-muted">
                          Size: <strong className="text-text-main">{item.selectedSize || '3-4Y'}</strong> • Qty: {item.quantity || 1}
                        </p>
                      </div>
                      <span className="font-bold font-mono text-xs text-text-main shrink-0">
                        ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Reason Selection */}
          <div className="space-y-2 pt-1">
            <label className="font-bold text-text-main block text-xs">
              Why do you want to cancel this {targetItemToCancel ? 'item' : 'order'}?
            </label>
            <p className="text-[11px] text-text-muted">
              Please choose a reason so we can improve our service:
            </p>
            <div className="space-y-2 pt-1">
              {[
                'Ordered by mistake / wrong item',
                'Need to change shipping address',
                'Delivery time is too long',
                'Found a better deal / discount',
                'Other reason',
              ].map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    cancelReason === reason
                      ? 'border-brand-purple bg-brand-purple-light/20 text-brand-purple font-semibold shadow-2xs'
                      : 'border-[#EFECE6] hover:bg-[#FAF8F5] text-text-main'
                  }`}
                >
                  <input
                    type="radio"
                    name="cancelReason"
                    value={reason}
                    checked={cancelReason === reason}
                    onChange={() => setCancelReason(reason)}
                    className="accent-brand-purple w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs">{reason}</span>
                </label>
              ))}
            </div>

            {/* Small textarea when 'Other reason' is selected */}
            {cancelReason === 'Other reason' && (
              <div className="pt-2 animate-fade-in space-y-1.5">
                <label className="text-[11px] font-bold text-text-main block">
                  Please type your reason
                </label>
                <textarea
                  value={otherReasonText}
                  onChange={(e) => setOtherReasonText(e.target.value)}
                  placeholder={`Tell us why you want to cancel this ${targetItemToCancel ? 'item' : 'order'}...`}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-[#EFECE6] bg-white text-xs text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none shadow-2xs"
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions - Side by Side */}
        <div className="p-5 border-t border-[#EFECE6] bg-[#FAF8F5]/80 flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setShowCancelModal(false);
              setTargetItemToCancel(null);
            }}
            className="flex-1 h-11 rounded-xl text-xs font-bold border border-[#DDD8CE] bg-white text-text-main hover:bg-[#FAF8F5] transition-all cursor-pointer flex items-center justify-center shadow-2xs active:scale-98"
          >
            {targetItemToCancel ? 'Keep Item' : 'Keep Order'}
          </button>

          <button
            type="button"
            disabled={isCancelling}
            onClick={handleCancelOrder}
            className="flex-1 h-11 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isCancelling ? (
              <span>Cancelling...</span>
            ) : (
              <>
                <X className="w-4 h-4 shrink-0" />
                <span>{targetItemToCancel ? 'Cancel Item' : 'Confirm Cancellation'}</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT SIDE SHEET: RATE & REVIEW PRODUCT DRAWER
         ───────────────────────────────────────────────────────────── */}
      {/* Review Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          showReviewModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setShowReviewModal(false);
          setTargetItemToReview(null);
        }}
        aria-hidden={!showReviewModal}
      />

      {/* Review Right Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[52] w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          showReviewModal ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Rate & Review Drawer"
        aria-hidden={!showReviewModal}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFECE6] bg-[#FAF8F5]/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div>
              <h3 className="font-heading font-black text-base sm:text-lg text-text-main leading-tight flex items-center gap-1.5">
                <span>Rate &amp; Review</span>
              </h3>
              <p className="text-[11px] text-text-muted mt-0.5">
                Verified Purchase • Order #{order.orderId}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowReviewModal(false);
              setTargetItemToReview(null);
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-main hover:bg-[#EFECE6] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmitReview} className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 text-xs">
            {/* Target Item Snapshot */}
            {targetItemToReview && (
              <div className="rounded-xl flex items-center gap-3.5 animate-fade-in">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-white border border-[#EFECE6] shrink-0">
                  <img
                    src={targetItemToReview.featuredImage}
                    alt={targetItemToReview.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-text-main truncate">
                    {targetItemToReview.name}
                  </h4>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Size: <strong className="text-text-main">{targetItemToReview.selectedSize || '3-4Y'}</strong> • Color: <strong className="text-text-main">{targetItemToReview.selectedColor || 'Standard'}</strong>
                  </p>
                  <span className="font-bold font-mono text-xs text-brand-purple mt-1 block">
                    ₹{((targetItemToReview.price || 0) * (targetItemToReview.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Star Rating Section */}
            <div className="space-y-2">
              <label className="font-bold text-xs text-text-main block">
                How would you rate this garment?
              </label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || ratingInput) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRatingInput(star)}
                      className="p-1 transition-transform hover:scale-115 active:scale-95 cursor-pointer focus:outline-none"
                      aria-label={`${star} star`}
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          isFilled ? 'fill-amber-400 text-amber-400 drop-shadow-xs' : 'text-[#D0C9BE]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Review Textarea */}
            <div className="space-y-1.5">
              <label className="font-bold text-xs text-text-main block">
                Write a Review <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Write your review about the fabric, softness, fit, and overall experience..."
                rows={5}
                required
                className="w-full p-3.5 rounded-xl border border-[#EFECE6] bg-white text-xs text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none shadow-2xs leading-relaxed"
              />
            </div>
          </div>

          {/* Footer Actions - Side by Side */}
          <div className="p-5 border-t border-[#EFECE6] bg-[#FAF8F5]/80 flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setShowReviewModal(false);
                setTargetItemToReview(null);
              }}
              className="flex-1 h-11 rounded-xl text-xs font-bold border border-[#DDD8CE] bg-white text-text-main hover:bg-[#FAF8F5] transition-all cursor-pointer flex items-center justify-center shadow-2xs active:scale-98"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmittingReview}
              className="flex-1 h-11 rounded-xl text-xs font-bold bg-brand-purple hover:bg-[#584F93] text-white transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <span>{isSubmittingReview ? 'Submitting...' : 'Submit Review'}</span>
            </button>
          </div>
        </form>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT SIDE SHEET: RETURN REQUEST DRAWER
         ───────────────────────────────────────────────────────────── */}
      {/* Return Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          showReturnModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setShowReturnModal(false);
          setTargetItemToReturn(null);
        }}
        aria-hidden={!showReturnModal}
      />

      {/* Return Right Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[52] w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          showReturnModal ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Return Request Drawer"
        aria-hidden={!showReturnModal}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFECE6] bg-[#FAF8F5]/80 shrink-0">
          <div>
            <h3 className="font-heading font-black text-base sm:text-lg text-text-main leading-tight flex items-center gap-1.5">
              <span>Request Return</span>
            </h3>
            <p className="text-[11px] text-text-muted mt-0.5">
              Order #{order.orderId} • 30-Day Easy Returns
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowReturnModal(false);
              setTargetItemToReturn(null);
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-main hover:bg-[#EFECE6] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmitReturn} className="flex-1 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 text-xs">
            {/* Target Item Snapshot or Multiple Item Selection */}
            {targetItemToReturn ? (
              <div className="space-y-1.5">
                <span className="font-bold text-xs text-text-main block">Item to return</span>
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFECE6] flex items-center gap-3.5 animate-fade-in">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-[#EFECE6] shrink-0">
                    <img
                      src={targetItemToReturn.featuredImage}
                      alt={targetItemToReturn.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-text-main truncate">
                      {targetItemToReturn.name}
                    </h4>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      Size: <strong className="text-text-main">{targetItemToReturn.selectedSize || '3-4Y'}</strong> • Color: <strong className="text-text-main">{targetItemToReturn.selectedColor || 'Standard'}</strong>
                    </p>
                    <span className="font-bold font-mono text-xs text-brand-purple mt-1 block">
                      Refund Amount: ₹{((targetItemToReturn.price || 0) * (targetItemToReturn.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-text-main">Select items to return:</span>
                  <span className="text-[11px] text-text-muted">
                    {selectedReturnKeys.length} of {activeReturnableItems.length} selected
                  </span>
                </div>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {activeReturnableItems.map((item) => {
                    const key = getReturnKey(order.orderId, item.id, item.selectedSize);
                    const isSelected = selectedReturnKeys.includes(key);
                    return (
                      <label
                        key={key}
                        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-brand-purple bg-brand-purple-light/20 shadow-2xs'
                            : 'border-[#EFECE6] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedReturnKeys([...selectedReturnKeys, key]);
                            } else {
                              setSelectedReturnKeys(selectedReturnKeys.filter((k) => k !== key));
                            }
                          }}
                          className="accent-brand-purple w-4 h-4 rounded cursor-pointer"
                        />
                        <img
                          src={item.featuredImage}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover bg-white border border-[#EFECE6] shrink-0"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="font-bold text-text-main truncate">{item.name}</p>
                          <p className="text-[11px] text-text-muted mt-0.5">
                            Size: {item.selectedSize || '3-4Y'} • Qty: {item.quantity || 1}
                          </p>
                          <span className="font-mono font-bold text-brand-purple text-xs">
                            ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Return Reason Selection */}
            <div className="space-y-2">
              <label className="font-bold text-xs text-text-main block">
                Why are you returning? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-1.5">
                {[
                  'Size didn’t fit / too small',
                  'Size didn’t fit / too loose',
                  'Fabric or color not as expected',
                  'Quality or stitching defect',
                  'Received wrong item or size',
                  'Other reason',
                ].map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      returnReason === reason
                        ? 'border-brand-purple bg-brand-purple-light/20 text-brand-purple font-semibold shadow-2xs'
                        : 'border-[#EFECE6] hover:bg-[#FAF8F5] text-text-main'
                    }`}
                  >
                    <input
                      type="radio"
                      name="returnReason"
                      value={reason}
                      checked={returnReason === reason}
                      onChange={() => setReturnReason(reason)}
                      className="accent-brand-purple w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Comments (Optional) */}
            <div className="space-y-1.5">
              <label className="font-bold text-xs text-text-main block">
                Additional Comments <span className="text-text-muted font-normal">(Optional)</span>
              </label>
              <textarea
                value={returnComments}
                onChange={(e) => setReturnComments(e.target.value)}
                placeholder="Tell us what went wrong so we can assist you better..."
                rows={3}
                className="w-full p-3 rounded-xl border border-[#EFECE6] bg-white text-xs text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none shadow-2xs"
              />
            </div>

            {/* Refund Mode Selection */}
            <div className="space-y-2">
              <label className="font-bold text-xs text-text-main block">
                Refund Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRefundMode('original')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    refundMode === 'original'
                      ? 'border-brand-purple bg-brand-purple-light/25 ring-1 ring-brand-purple shadow-2xs'
                      : 'border-[#EFECE6] bg-[#FAF8F5] hover:border-brand-purple/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-brand-purple" />
                    <span className="font-bold text-xs text-text-main">Original Payment</span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-1 leading-snug">
                    Refund back to bank/UPI in 3–5 business days after pickup
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setRefundMode('wallet')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    refundMode === 'wallet'
                      ? 'border-brand-purple bg-brand-purple-light/25 ring-1 ring-brand-purple shadow-2xs'
                      : 'border-[#EFECE6] bg-[#FAF8F5] hover:border-brand-purple/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-xs text-text-main">Baha Wallet Credit</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1 leading-snug">
                    Instant refund + 5% bonus shopping credit
                  </p>
                </button>
              </div>
            </div>

            {/* Reverse Pickup Address Confirmation */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFECE6] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-text-main flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-purple" />
                  <span>Reverse Pickup Address</span>
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                  Free Reverse Pickup
                </span>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">
                {order.address?.name || 'Priya Sharma'}, {order.address?.line1 || '42, Rose Garden Apartments'},{' '}
                {order.address?.city || 'Noida'}, {order.address?.pincode || '201301'}
              </p>
              <p className="text-[10px] text-text-muted flex items-center gap-1">
                <Phone className="w-3 h-3 text-text-muted" />
                <span>Contact: {order.address?.phone || '+91 98765 43210'}</span>
              </p>
            </div>

            {/* Policy Guarantee Note */}
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 flex items-start gap-2.5 text-[11px] text-purple-950">
              <ShieldCheck className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Our courier executive will inspect the garment at pickup. Please ensure original brand tags are attached and the garment is unwashed.
              </p>
            </div>
          </div>

          {/* Footer Actions - Side by Side */}
          <div className="p-5 border-t border-[#EFECE6] bg-[#FAF8F5]/80 flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setShowReturnModal(false);
                setTargetItemToReturn(null);
              }}
              className="flex-1 h-11 rounded-xl text-xs font-bold border border-[#DDD8CE] bg-white text-text-main hover:bg-[#FAF8F5] transition-all cursor-pointer flex items-center justify-center shadow-2xs active:scale-98"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmittingReturn || selectedReturnKeys.length === 0}
              className="flex-1 h-11 rounded-xl text-xs font-bold bg-brand-purple hover:bg-[#584F93] text-white transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>{isSubmittingReturn ? 'Submitting...' : 'Confirm Return Request'}</span>
            </button>
          </div>
        </form>
      </aside>
    </div>
  );
}
