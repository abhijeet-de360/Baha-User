export interface TrackingMilestone {
  id: string;
  title: string;
  location: string;
  description: string;
  timestamp: string;
  status: "completed" | "current" | "upcoming";
  badge?: string;
  icon?: "check" | "truck" | "warehouse" | "package" | "pin" | "plane";
  details?: {
    driverName?: string;
    driverPhone?: string;
    vehicleNumber?: string;
    otpVerified?: boolean;
    transitRoute?: string;
  };
}

export interface LiveShipmentData {
  orderNumber: string;
  trackingNumber: string;
  courier: string;
  courierTrackingUrl?: string;
  status: "In Transit" | "Delivered" | "Processing";
  statusText: string;
  expectedDelivery: string;
  estimatedTimeRemaining?: string;
  currentLocation: string;
  progressPercent: number; // 0 - 100
  currentStage: 1 | 2 | 3 | 4 | 5; // 1: Booked, 2: Picked Up, 3: In Transit, 4: Out for Delivery, 5: Delivered
  otp?: string;
  driver?: {
    name: string;
    phone: string;
    vehicleNumber: string;
    rating: number;
    deliveriesCount: number;
  };
  destination: {
    recipientName: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
    addressType: "Home" | "Work";
  };
  milestones: TrackingMilestone[];
}

export const DEMO_SHIPMENTS: Record<string, LiveShipmentData> = {
  "BAHA-8921": {
    orderNumber: "BAHA-8921",
    trackingNumber: "AWB-7891230491",
    courier: "Bluedart Express",
    courierTrackingUrl: "https://www.bluedart.com",
    status: "In Transit",
    statusText: "Out for Delivery — Arriving Today",
    expectedDelivery: "Today, by 6:00 PM",
    estimatedTimeRemaining: "Approx. 2-3 hours",
    currentLocation: "Indiranagar / Bengaluru North Hub",
    progressPercent: 82,
    currentStage: 4,
    otp: "4892",
    driver: {
      name: "Rahul S.",
      phone: "+91 98765 43210",
      vehicleNumber: "KA-01-MJ-8821",
      rating: 4.9,
      deliveriesCount: 1420,
    },
    destination: {
      recipientName: "Priya Sharma",
      address: "Flat 402, Sunshine Meadows, 14th Main, Indiranagar",
      city: "Bengaluru, Karnataka",
      pincode: "560038",
      phone: "+91 98765 43210",
      addressType: "Home",
    },
    // Milestones listed latest-first (matching the user's reference timeline design)
    milestones: [
      {
        id: "m1",
        title: "Delivered",
        location: "HSR Layout, Bengaluru",
        description: "Doorstep delivery with contact-less OTP verification",
        timestamp: "Expected Today · by 6:00 PM",
        status: "upcoming",
        badge: "Estimated",
        icon: "pin",
      },
      {
        id: "m2",
        title: "Out for delivery",
        location: "Bengaluru North hub",
        description: "Assigned to courier Rahul S. Package is in transit on delivery vehicle.",
        timestamp: "12 Oct 2026 · 8:15 AM",
        status: "current",
        badge: "Live Now",
        icon: "truck",
        details: {
          driverName: "Rahul S.",
          driverPhone: "+91 98765 43210",
          vehicleNumber: "KA-01-MJ-8821",
        },
      },
      {
        id: "m3",
        title: "Arrived at destination hub",
        location: "Bengaluru sorting centre",
        description: "Scanned at gate 4, sorted to local Indiranagar delivery route.",
        timestamp: "11 Oct 2026 · 9:02 PM",
        status: "completed",
        badge: "Sorted",
        icon: "warehouse",
      },
      {
        id: "m4",
        title: "In transit",
        location: "Mumbai to Bengaluru Line-haul",
        description: "Departed Mumbai central hub via line-haul transit container MH-12-4471.",
        timestamp: "10 Oct 2026 · 6:40 PM",
        status: "completed",
        badge: "Dispatched",
        icon: "plane",
        details: {
          transitRoute: "Line-haul MH-12-4471",
        },
      },
      {
        id: "m5",
        title: "Arrived at transit hub",
        location: "Mumbai central hub",
        description: "Package received at hub, sorted to Bengaluru high-speed corridor.",
        timestamp: "10 Oct 2026 · 11:25 AM",
        status: "completed",
        badge: "Processed",
        icon: "warehouse",
      },
      {
        id: "m6",
        title: "Picked up",
        location: "Shivajinagar, Pune",
        description: "Collected from Baha Central Fulfillment Facility, barcoded & quality sealed.",
        timestamp: "09 Oct 2026 · 2:10 PM",
        status: "completed",
        badge: "Quality Sealed",
        icon: "package",
      },
      {
        id: "m7",
        title: "Booked",
        location: "Pune counter",
        description: "AWB generated, shipping label printed at Pune dispatch desk.",
        timestamp: "09 Oct 2026 · 10:15 AM",
        status: "completed",
        badge: "Manifested",
        icon: "check",
      },
    ],
  },
  "BAHA-7742": {
    orderNumber: "BAHA-7742",
    trackingNumber: "DEL-992014184",
    courier: "Delhivery Surface",
    courierTrackingUrl: "https://www.delhivery.com",
    status: "Delivered",
    statusText: "Delivered Successfully",
    expectedDelivery: "Delivered on 30 Oct 2026",
    currentLocation: "Doorstep, Bengaluru",
    progressPercent: 100,
    currentStage: 5,
    destination: {
      recipientName: "Priya Sharma",
      address: "Flat 402, Sunshine Meadows, 14th Main, Indiranagar",
      city: "Bengaluru, Karnataka",
      pincode: "560038",
      phone: "+91 98765 43210",
      addressType: "Home",
    },
    milestones: [
      {
        id: "m1",
        title: "Delivered",
        location: "Indiranagar, Bengaluru",
        description: "Handed to recipient Priya Sharma — signed & OTP verified successfully.",
        timestamp: "30 Oct 2026 · 3:15 PM",
        status: "completed",
        badge: "Signed & OTP Verified",
        icon: "check",
        details: {
          otpVerified: true,
        },
      },
      {
        id: "m2",
        title: "Out for delivery",
        location: "Bengaluru East Hub",
        description: "Assigned to courier agent Manoj K. for scheduled doorstep drop.",
        timestamp: "30 Oct 2026 · 9:15 AM",
        status: "completed",
        badge: "Out for Delivery",
        icon: "truck",
      },
      {
        id: "m3",
        title: "Arrived at destination hub",
        location: "Bengaluru Sort Facility",
        description: "Bag opened, items inspected and routed to local pin 560038.",
        timestamp: "29 Oct 2026 · 8:40 PM",
        status: "completed",
        badge: "Arrived",
        icon: "warehouse",
      },
      {
        id: "m4",
        title: "In transit",
        location: "Chennai to Bengaluru Line-haul",
        description: "Dispatched on Express road vehicle DL-01-4412.",
        timestamp: "29 Oct 2026 · 1:10 PM",
        status: "completed",
        badge: "En Route",
        icon: "plane",
      },
      {
        id: "m5",
        title: "Arrived at transit hub",
        location: "Chennai Hub",
        description: "Sorted to Bangalore lane conveyor.",
        timestamp: "29 Oct 2026 · 6:30 AM",
        status: "completed",
        badge: "Processed",
        icon: "warehouse",
      },
      {
        id: "m6",
        title: "Picked up",
        location: "Warehouse Central",
        description: "Dispatched from primary fulfillment hub.",
        timestamp: "28 Oct 2026 · 4:00 PM",
        status: "completed",
        badge: "Picked Up",
        icon: "package",
      },
      {
        id: "m7",
        title: "Booked",
        location: "Baha Central",
        description: "Order confirmed and packaging completed.",
        timestamp: "28 Oct 2026 · 11:20 AM",
        status: "completed",
        badge: "Booked",
        icon: "check",
      },
    ],
  },
};

export function getShipmentTracking(orderNumber: string): LiveShipmentData {
  if (DEMO_SHIPMENTS[orderNumber]) {
    return DEMO_SHIPMENTS[orderNumber];
  }

  // Generate dynamic completed milestone tracking for delivered orders
  return {
    orderNumber: orderNumber,
    trackingNumber: `DEL-${orderNumber.replace("BAHA-", "")}901`,
    courier: "Delhivery Surface",
    courierTrackingUrl: "https://www.delhivery.com",
    status: "Delivered",
    statusText: "Delivered Successfully",
    expectedDelivery: "Delivered at Doorstep",
    currentLocation: "Doorstep, Bengaluru",
    progressPercent: 100,
    currentStage: 5,
    destination: {
      recipientName: "Priya Sharma",
      address: "Flat 402, Sunshine Meadows, 14th Main, Indiranagar",
      city: "Bengaluru, Karnataka",
      pincode: "560038",
      phone: "+91 98765 43210",
      addressType: "Home",
    },
    milestones: [
      {
        id: "m1",
        title: "Delivered",
        location: "Indiranagar, Bengaluru",
        description: "Handed to recipient Priya Sharma — signed & OTP verified successfully.",
        timestamp: "Doorstep Delivery Verified",
        status: "completed",
        badge: "Signed & OTP Verified",
        icon: "check",
        details: {
          otpVerified: true,
        },
      },
      {
        id: "m2",
        title: "Out for delivery",
        location: "Bengaluru East Hub",
        description: "Assigned to courier agent for scheduled doorstep drop.",
        timestamp: "Morning Dispatch",
        status: "completed",
        badge: "Out for Delivery",
        icon: "truck",
      },
      {
        id: "m3",
        title: "Arrived at destination hub",
        location: "Bengaluru Sort Facility",
        description: "Package sorted to Indiranagar corridor.",
        timestamp: "Facility Arrival",
        status: "completed",
        badge: "Arrived",
        icon: "warehouse",
      },
      {
        id: "m4",
        title: "In transit",
        location: "Line-Haul Express Corridor",
        description: "Departed hub via express line-haul carrier.",
        timestamp: "Line-Haul Transit",
        status: "completed",
        badge: "En Route",
        icon: "plane",
      },
      {
        id: "m5",
        title: "Picked up",
        location: "Warehouse Central",
        description: "Collected from primary fulfillment hub.",
        timestamp: "Warehouse Dispatch",
        status: "completed",
        badge: "Picked Up",
        icon: "package",
      },
      {
        id: "m6",
        title: "Booked",
        location: "Baha Central",
        description: "Order confirmed and packaging completed.",
        timestamp: "Order Confirmation",
        status: "completed",
        badge: "Booked",
        icon: "check",
      },
    ],
  };
}

