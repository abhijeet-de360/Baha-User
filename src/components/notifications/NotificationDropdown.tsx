"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Truck,
  Coins,
  Sparkles,
  CheckCheck,
  Package,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { NotificationItem, INITIAL_NOTIFICATIONS } from "@/data/notifications";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
}

export function NotificationDropdown({
  isOpen,
  onClose,
  unreadCount,
  setUnreadCount,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadItems = notifications.filter((n) => !n.read);
  const displayedNotifications =
    filter === "unread" ? unreadItems : notifications;

  const handleMarkAllAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
  };

  const handleItemClick = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    const remainingUnread = updated.filter((n) => !n.read).length;
    setUnreadCount(remainingUnread);
    onClose();
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    const remainingUnread = updated.filter((n) => !n.read).length;
    setUnreadCount(remainingUnread);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications([]);
    setUnreadCount(0);
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "order":
        return (
          <div className="w-8 h-8 rounded-full bg-[#EDE5FA] text-[#0D03AE] flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
        );
      case "coins":
        return (
          <div className="w-8 h-8 rounded-full bg-[#FFE4CF] text-[#DC5513] flex items-center justify-center shrink-0">
            <Coins className="w-4 h-4" />
          </div>
        );
      case "offer":
        return (
          <div className="w-8 h-8 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        );
      case "system":
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Notifications panel"
      onClick={(e) => e.stopPropagation()}
      className="w-[calc(100vw-24px)] sm:w-96 rounded-3xl bg-[#fffcf6] border border-[#E7DEC8] shadow-[0_20px_50px_rgba(25,30,45,0.22)] flex flex-col overflow-hidden font-jost animate-in fade-in zoom-in-95 duration-200 backdrop-blur-md"
    >
      {/* Top Header Bar */}
      <div className="px-4 sm:px-5 py-3.5 bg-[#FFFBF0] border-b border-[#E7DEC8] flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-[#0D03AE] text-white flex items-center justify-center shadow-2xs">
            <Bell className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-neutral-900 leading-none">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#DC5513] text-white text-[10px] font-extrabold shadow-2xs">
                  {unreadCount} New
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="text-[11px] font-bold text-[#0D03AE] hover:text-[#DC5513] px-2 py-1 rounded-full hover:bg-[#FAF8E8] transition-colors flex items-center gap-1 cursor-pointer"
              title="Mark all notifications as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mark all read</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-[#FAF8E8] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-2 border-b border-[#E7DEC8]/60 bg-[#FAF8E8]/50 flex items-center justify-between text-xs font-bold text-neutral-600">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#0D03AE] text-white shadow-2xs"
                : "hover:bg-[#FAF8E8] text-neutral-700"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              filter === "unread"
                ? "bg-[#0D03AE] text-white shadow-2xs"
                : "hover:bg-[#FAF8E8] text-neutral-700"
            }`}
          >
            Unread ({unreadItems.length})
          </button>
        </div>

        {notifications.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-[11px] text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Notifications Scrollable List */}
      <div
        data-lenis-prevent="true"
        className="max-h-[360px] overflow-y-auto divide-y divide-[#E7DEC8]/60 no-scrollbar"
      >
        {displayedNotifications.length === 0 ? (
          <div className="py-12 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF8E8] border border-[#E7DEC8] flex items-center justify-center mx-auto mb-2.5 text-[#0D03AE]">
              <Bell className="w-5 h-5 text-neutral-400" />
            </div>
            <p className="font-bold text-sm text-neutral-800">
              {filter === "unread"
                ? "No unread notifications"
                : "All caught up!"}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5 font-secondary">
              {filter === "unread"
                ? "You have reviewed all your alerts."
                : "We will alert you about orders, delivery milestones and coin rewards."}
            </p>
          </div>
        ) : (
          displayedNotifications.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              onClick={() => handleItemClick(item.id)}
              className={`p-3.5 sm:p-4 flex items-start gap-3 transition-colors relative group block text-left ${
                !item.read
                  ? "bg-[#FAF8E8] hover:bg-[#F5F1DC]"
                  : "bg-transparent hover:bg-[#FAF8E8]/60"
              }`}
            >
              {/* Type Icon */}
              {getIcon(item.type)}

              {/* Text info */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4
                    className={`text-xs sm:text-sm font-bold truncate leading-snug ${
                      !item.read ? "text-neutral-900" : "text-neutral-700"
                    }`}
                  >
                    {item.title}
                  </h4>
                  {item.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-[#FAF8E8] border border-[#E7DEC8] text-neutral-600">
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-600 font-secondary mt-1 line-clamp-2 leading-relaxed">
                  {item.message}
                </p>

                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-neutral-400 font-secondary">
                  <span>{item.timestamp}</span>
                  {item.orderNumber && (
                    <>
                      <span>&bull;</span>
                      <span className="font-mono font-semibold text-neutral-600">
                        #{item.orderNumber}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Unread indicator or Dismiss action on hover */}
              <div className="absolute right-3.5 top-4 flex flex-col items-end gap-2">
                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-[#DC5513] shrink-0" />
                )}

                <button
                  type="button"
                  onClick={(e) => handleDeleteItem(item.id, e)}
                  aria-label="Dismiss notification"
                  className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-rose-600 transition-opacity rounded-full hover:bg-neutral-200/50 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

