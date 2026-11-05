export interface NotificationItem {
  id: string;
  type: "order" | "coins" | "offer" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link: string;
  orderNumber?: string;
  badge?: string;
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "order",
    title: "Order #BAHA-8921 Out for Delivery",
    message: "Rider Rahul S. (Bluedart) is arriving today by 6:00 PM. Keep OTP ready.",
    timestamp: "12m ago",
    read: false,
    link: "/orders",
    orderNumber: "BAHA-8921",
    badge: "Delivery",
  },
  {
    id: "notif-2",
    type: "coins",
    title: "+150 Baha Coins Credited",
    message: "150 loyalty coins added to your wallet for reviewing your recent purchase.",
    timestamp: "2h ago",
    read: false,
    link: "/profile",
    badge: "Wallet",
  },
  {
    id: "notif-3",
    type: "offer",
    title: "Festive Collection Just Dropped 🌸",
    message: "Pure organic cotton ethnic sets now live. Use code FESTIVE20 for extra 20% off.",
    timestamp: "Yesterday",
    read: false,
    link: "/#ethnic-wear",
    badge: "Special Offer",
  },
  {
    id: "notif-4",
    type: "order",
    title: "Exchange Shipped for #BAHA-7712",
    message: "Replacement size (6-12M) has departed Mumbai transit hub via Delhivery.",
    timestamp: "2d ago",
    read: true,
    link: "/orders",
    orderNumber: "BAHA-7712",
    badge: "Exchange",
  },
  {
    id: "notif-5",
    type: "system",
    title: "Welcome to the Baha Family! 🧸",
    message: "Add your child's birth date in your profile to unlock custom birthday surprises.",
    timestamp: "5d ago",
    read: true,
    link: "/profile",
    badge: "Account",
  },
];

