"use client";

import { useEffect, useRef, useState, Suspense, type PointerEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Shirt, Clapperboard, ShoppingBag, User } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { CartDrawer } from "@/components/cart/CartDrawer";

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/products", icon: Shirt },
  { label: "Reels", href: "/#reels", icon: Clapperboard },
  { label: "Cart", href: "/cart", icon: ShoppingBag },
  { label: "Profile", href: "/profile", icon: User },
] as const;

function MobileBottomNavInner() {
  const pathname = usePathname();
  const router = useRouter();
  const [hash, setHash] = useState("");
  const [dragPosition, setDragPosition] = useState<number | null>(null);
  const gesture = useRef<{ id: number; x: number; y: number; left: number; width: number; dragging: boolean; position: number } | null>(null);
  const suppressClickUntil = useRef(0);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [pathname]);

  const active = pathname.startsWith("/cart")
    ? 3
    : pathname.startsWith("/products")
    ? 1
    : pathname.startsWith("/profile")
    ? 4
    : pathname === "/" && hash === "#reels"
    ? 2
    : 0;
  const position = dragPosition ?? active;
  const highlighted = Math.round(position);

  const activate = (index: number, navigate = true) => {
    setHash(index === 2 ? "#reels" : "");
    const href = items[index].href;
    if (navigate && href) router.push(href);
  };

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.x;
    if (!current.dragging) {
      if (Math.abs(dx) < 4) return;
      current.dragging = true;
    }
    event.preventDefault();
    current.position = Math.max(0, Math.min(items.length - 1,
      (event.clientX - current.left) / (current.width / items.length) - 0.5));
    setDragPosition(current.position);
  };

  const finish = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    setDragPosition(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    suppressClickUntil.current = performance.now() + 400;
    if (!cancelled) activate(Math.round(current.position));
  };

  return (
    <>
      <nav aria-label="Mobile Navigation" className="fixed inset-x-0 bottom-0 z-50 font-jost pointer-events-auto lg:hidden">
        <div className="relative mx-3 mb-2.5 pb-[max(0px,env(safe-area-inset-bottom))]">
          <LiquidGlass radius={28} bevelDepth={100} scale={50} aberration={3} frost={0.5} tint={0.1}
            className="border border-white/60 shadow-[0_8px_32px_0_rgba(13,3,174,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)]"
            contentClassName="px-2 py-2">
            <div className="relative grid touch-none select-none grid-cols-5 cursor-grab active:cursor-grabbing [-webkit-touch-callout:none]"
              onPointerDownCapture={event => {
                if (!event.isPrimary || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                event.currentTarget.setPointerCapture(event.pointerId);
                suppressClickUntil.current = 0;
                const rect = event.currentTarget.getBoundingClientRect();
                gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, width: rect.width, dragging: false, position: Math.max(0, Math.min(items.length - 1, Math.floor((event.clientX - rect.left) / (rect.width / items.length)))) };
              }}
              onPointerMove={move} onPointerUp={event => finish(event)}
              onPointerCancel={event => finish(event, true)} onLostPointerCapture={event => finish(event, true)}
              onDragStart={event => event.preventDefault()}
              onClickCapture={event => {
                if (performance.now() < suppressClickUntil.current) { event.preventDefault(); event.stopPropagation(); }
              }}>
              <div aria-hidden="true" data-nav-indicator
                className={`pointer-events-none absolute inset-y-0 w-1/5 ${dragPosition === null ? "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none" : ""}`}
                style={{ transform: `translateX(${position * 100}%)` }}>
                <LiquidGlass
                  radius={999} bevelDepth={12} scale={65} aberration={2} frost={0.2} tint={0.16}
                  className={`z-0 mx-auto h-full w-[94%] max-w-20 border border-white/80 bg-[#b8adff]/20 shadow-[0_3px_12px_rgba(13,3,174,0.2),inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(13,3,174,0.18)] transition-transform duration-200 motion-reduce:transition-none ${dragPosition !== null ? "scale-x-125 scale-y-125" : "scale-100"}`}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.08)_42%,rgba(179,163,255,0.12)_65%,rgba(255,255,255,0.4)_100%)]" />
                  <div className="pointer-events-none absolute inset-x-2 top-0.5 h-px rounded-full bg-white/90" />
                </LiquidGlass>
              </div>
              {items.map((item, index) => {
                const Icon = item.icon;
                const selected = highlighted === index;
                const className = `relative z-10 flex min-h-[52px] min-w-0 cursor-pointer flex-col items-center rounded-2xl outline-offset-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#0D03AE] motion-reduce:transition-none ${selected ? "text-[#0D03AE]" : "text-black/70"}`;
                const content = <>
                  <span className="pointer-events-none relative flex h-8 w-12 items-center justify-center">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={selected ? 2.6 : 1.8} />
                    {index === 2 && <span className="absolute right-2 top-1 h-1.5 w-1.5 rounded-full bg-[#DC5513]" />}
                    {index === 3 && <span className="absolute -right-0.5 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#DC5513] text-[9px] font-bold text-white">3</span>}
                  </span>
                  <span className={`mt-0.5 text-[10px] tracking-tight ${selected ? "font-bold" : "font-medium"}`}>{item.label}</span>
                </>;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    draggable={false}
                    aria-current={active === index ? "page" : undefined}
                    className={className}
                    onClick={(event) => {
                      if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                        activate(index, false);
                      }
                    }}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </LiquidGlass>
        </div>
      </nav>
    </>
  );
}

export function MobileBottomNav() {
  return (
    <Suspense fallback={null}>
      <MobileBottomNavInner />
    </Suspense>
  );
}
