"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Baby,
  Plus,
  ArrowLeft,
  ShieldCheck,
  X,
  Upload,
  User,
  Mail,
  Phone,
  Trash2,
  Check,
  AlertTriangle,
  Sparkles,
  Camera,
  Package,
} from "lucide-react";
import { useScrollLock } from "@/lib/scroll-lock";

export interface KidProfile {
  id: string;
  name: string;
  relation: string;
  age: string;
  size: string;
  gender: "Girl" | "Boy";
  avatar: string;
}

const DEMO_KIDS: KidProfile[] = [
  {
    id: "k1",
    name: "Rhea",
    relation: "Daughter",
    age: "8 Months",
    size: "6-12M",
    gender: "Girl",
    avatar: "/assets/temp/review-baby1.webp",
  },
  {
    id: "k2",
    name: "Kabir",
    relation: "Son",
    age: "3 Years",
    size: "3-4Y",
    gender: "Boy",
    avatar: "/assets/temp/review-photo3.webp",
  },
];

export default function ProfilePage() {
  const [kids, setKids] = useState<KidProfile[]>(DEMO_KIDS);
  const [selectedKidId, setSelectedKidId] = useState<string>("k1");

  // Profile Form State
  const [profileName, setProfileName] = useState("Priya Sharma");
  const [profileEmail, setProfileEmail] = useState("priya.sharma@example.com");
  const [profilePhone, setProfilePhone] = useState("+91 98765 43210");
  const [profileAvatar, setProfileAvatar] = useState("/assets/temp/review-baby1.webp");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const profileAvatarInputRef = useRef<HTMLInputElement>(null);

  // Add Child Modal State
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [newChildAge, setNewChildAge] = useState("");
  const [newChildGender, setNewChildGender] = useState<"Girl" | "Boy">("Girl");
  const [newChildRelation, setNewChildRelation] = useState("Daughter");
  const [newChildSize, setNewChildSize] = useState("6-12M");
  const [newChildImage, setNewChildImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete Account Confirmation Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");

  useScrollLock(isAddChildOpen || isDeleteModalOpen);

  const selectedKid = kids.find((k) => k.id === selectedKidId) || kids[0];

  const handleProfileAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleChildImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewChildImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim() || !newChildAge.trim()) {
      alert("Please enter the child's name and age.");
      return;
    }

    const defaultAvatar =
      newChildGender === "Girl"
        ? "/assets/temp/review-baby2.webp"
        : "/assets/temp/review-photo3.webp";

    const newKid: KidProfile = {
      id: "k" + (kids.length + 1),
      name: newChildName.trim(),
      relation: newChildRelation,
      age: newChildAge.trim(),
      size: newChildSize,
      gender: newChildGender,
      avatar: newChildImage || defaultAvatar,
    };

    setKids((prev) => [...prev, newKid]);
    setSelectedKidId(newKid.id);

    // Reset Form & Close Modal
    setNewChildName("");
    setNewChildAge("");
    setNewChildImage(null);
    setIsAddChildOpen(false);
  };

  const handleDeleteKid = (kidId: string) => {
    if (kids.length <= 1) {
      alert("You need at least one child profile.");
      return;
    }
    const remaining = kids.filter((k) => k.id !== kidId);
    setKids(remaining);
    if (selectedKidId === kidId) {
      setSelectedKidId(remaining[0].id);
    }
  };

  const handleConfirmDeleteAccount = () => {
    if (deleteConfirmationText !== "DELETE") {
      alert('Please type "DELETE" to confirm account deletion.');
      return;
    }
    alert("Account deletion request submitted. Logging you out...");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#fffcf6] pt-28 sm:pt-32 pb-48 sm:pb-32 lg:pb-24 font-secondary">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-6 font-jost">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-[#0D03AE] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="font-semibold text-neutral-800">My Account</span>
        </div>

        {/* Page Title & Tagline */}
        <div className="mb-8 pb-4 border-b border-[#E7DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-primary text-3xl sm:text-4xl text-neutral-900">
              Account &amp; Family Settings
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-jost">
              Manage your personal profile details, baby sizing profiles, and account preferences.
            </p>
          </div>

          <Link
            href="/orders"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8E8] hover:bg-[#0D03AE] border border-[#E7DEC8] hover:border-[#0D03AE] text-neutral-800 hover:text-white text-xs font-bold transition-all shadow-2xs font-jost self-start sm:self-auto group"
          >
            <Package className="w-3.5 h-3.5 text-[#0D03AE] group-hover:text-white transition-colors" />
            <span>My Orders &amp; Delivery History &rarr;</span>
          </Link>
        </div>

        <div className="space-y-8 font-jost">
          {/* Section 1: Profile Edit View */}
          <div className="bg-[#FFFBF0]/80 rounded-3xl border border-[#E7DEC8] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7DEC8] mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#0D03AE] text-white flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-neutral-900">Profile Details</h2>
                  <p className="text-xs text-neutral-500">
                    Update your personal contact information
                  </p>
                </div>
              </div>

              {savedSuccess && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Changes Saved</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Avatar Edit Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#0D03AE] bg-[#FAF8E8] shrink-0 group">
                  <Image
                    src={profileAvatar}
                    alt={profileName}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                  <div
                    onClick={() => profileAvatarInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white"
                  >
                    <Camera className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => profileAvatarInputRef.current?.click()}
                    className="px-4 py-1.5 rounded-full bg-[#FFFBF0] border border-[#E7DEC8] hover:border-[#0D03AE] text-xs font-bold text-neutral-800 hover:text-[#0D03AE] transition-colors cursor-pointer"
                  >
                    Change Avatar
                  </button>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    JPG, PNG or WEBP up to 5MB
                  </p>
                  <input
                    ref={profileAvatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileAvatarChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-[#FAF8E8] border border-[#E7DEC8] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#0D03AE] focus:bg-[#FFFBF0] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full bg-[#FAF8E8] border border-[#E7DEC8] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#0D03AE] focus:bg-[#FFFBF0] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full bg-[#FAF8E8] border border-[#E7DEC8] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#0D03AE] focus:bg-[#FFFBF0] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Membership Tier
                  </label>
                  <div className="w-full bg-[#FAF8E8] border border-[#E7DEC8] rounded-2xl px-4 py-2.5 text-sm font-bold text-[#DC5513] flex items-center justify-between">
                    <span>Gold Club Parent</span>
                    <span className="text-[11px] text-neutral-500 font-normal">
                      450 Coins Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Save Profile Button */}
              <div className="flex items-center justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0D03AE] text-white hover:bg-[#DC5513] text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Kids Profiles View */}
          <div className="bg-[#FFFBF0]/80 rounded-3xl border border-[#E7DEC8] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7DEC8] mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#FFF8E0] text-[#DC5513] border border-[#FED174]/60 flex items-center justify-center">
                  <Baby className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-neutral-900">Kids Profiles</h2>
                  <p className="text-xs text-neutral-500">
                    Get tailored age and size recommendations for each little one
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddChildOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0D03AE] text-white hover:bg-[#DC5513] text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Child</span>
              </button>
            </div>

            {/* Kids Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4.5">
              {kids.map((kid) => {
                const isSelected = selectedKidId === kid.id;

                return (
                  <div
                    key={kid.id}
                    className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#FFF8E0] border-[#0D03AE] shadow-xs ring-2 ring-[#0D03AE]/20"
                        : "bg-[#FAF8E8] border-[#E7DEC8]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#E7DEC8] shrink-0 bg-white">
                          <Image
                            src={kid.avatar}
                            alt={kid.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-neutral-900">
                              {kid.name}
                            </h3>
                            <span className="text-[10px] uppercase font-bold text-neutral-500 bg-white/70 px-2 py-0.5 rounded-full border border-[#E7DEC8]">
                              {kid.relation}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 mt-1">
                            Age: <strong>{kid.age}</strong> &bull; Gender: {kid.gender}
                          </p>
                          <p className="text-xs text-[#0D03AE] font-bold mt-0.5">
                            Recommended Size: {kid.size}
                          </p>
                        </div>
                      </div>

                      {/* Remove Kid Button */}
                      {kids.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteKid(kid.id)}
                          className="p-1.5 rounded-full text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove child"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E7DEC8]/60 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSelectedKidId(kid.id)}
                        className={`text-xs font-bold cursor-pointer transition-colors ${
                          isSelected
                            ? "text-[#0D03AE]"
                            : "text-neutral-600 hover:text-[#0D03AE]"
                        }`}
                      >
                        {isSelected ? "Active Child Selected" : "Set as Active Child"}
                      </button>

                      <Link
                        href={`/products?size=${encodeURIComponent(kid.size)}`}
                        className="text-xs font-bold text-[#DC5513] hover:underline"
                      >
                        Shop {kid.size} &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Delete Account Danger Zone */}
          <div className="bg-[#FFFBF0]/80 rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-rose-600 font-bold text-base mb-1">
                  <AlertTriangle className="w-4.5 h-4.5" />
                  <span>Delete Account</span>
                </div>
                <p className="text-xs text-neutral-600 max-w-xl leading-relaxed">
                  Permanently delete your Baha account, including saved kids sizing profiles,
                  coins balance, and past order invoices. This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmationText("");
                  setIsDeleteModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-rose-50 border border-rose-300 text-rose-600 hover:bg-rose-600 hover:text-white text-xs font-bold transition-all cursor-pointer shrink-0 self-start sm:self-center"
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Mobile Spacer to prevent overlap with floating bottom nav */}
        <div className="h-24 lg:hidden" aria-hidden="true" />
      </div>

      {/* Add Child Modal */}
      {isAddChildOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 font-jost"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsAddChildOpen(false)}
          />

          {/* Modal Card */}
          <div
            data-lenis-prevent="true"
            className="relative w-full max-w-lg bg-[#fffcf6] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto border border-[#E7DEC8]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7DEC8]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#FFF8E0] text-[#DC5513] flex items-center justify-center border border-[#E7DEC8]">
                  <Baby className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-primary text-xl text-neutral-900">
                    Add Child Profile
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Get customized size recommendations &amp; style picks.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddChildOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF8E8] hover:bg-[#FFF8E0] border border-[#E7DEC8] text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveChild} className="mt-5 space-y-4">
              {/* Optional Photo Upload */}
              <div className="flex flex-col items-center justify-center pb-2">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-20 h-20 rounded-full border-2 border-dashed border-[#0D03AE]/40 hover:border-[#0D03AE] bg-[#FAF8E8] flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all group"
                >
                  {newChildImage ? (
                    <Image
                      src={newChildImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-[#0D03AE] group-hover:scale-110 transition-transform mb-1" />
                      <span className="text-[10px] text-neutral-500 font-semibold">
                        Photo (Opt)
                      </span>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleChildImageUpload}
                  className="hidden"
                />
                <span className="text-[11px] text-neutral-400 mt-1">
                  Upload baby photo (optional)
                </span>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                  Child&apos;s Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rhea, Kabir, Ananya"
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  className="w-full bg-[#FFFBF0] border border-[#E7DEC8] rounded-2xl px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#0D03AE] focus:bg-white focus:ring-2 focus:ring-[#0D03AE]/15 transition-all"
                />
              </div>

              {/* Age / Birthday */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Age / Month <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 8 Months, 2 Years"
                    value={newChildAge}
                    onChange={(e) => setNewChildAge(e.target.value)}
                    className="w-full bg-[#FFFBF0] border border-[#E7DEC8] rounded-2xl px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#0D03AE] focus:bg-white focus:ring-2 focus:ring-[#0D03AE]/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Recommended Size
                  </label>
                  <select
                    value={newChildSize}
                    onChange={(e) => setNewChildSize(e.target.value)}
                    className="w-full bg-[#FFFBF0] border border-[#E7DEC8] rounded-2xl px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-[#0D03AE] focus:bg-white focus:ring-2 focus:ring-[#0D03AE]/15 transition-all cursor-pointer"
                  >
                    <option value="0-3M">0-3 Months</option>
                    <option value="3-6M">3-6 Months</option>
                    <option value="6-12M">6-12 Months</option>
                    <option value="12-18M">12-18 Months</option>
                    <option value="18-24M">18-24 Months</option>
                    <option value="2-3Y">2-3 Years</option>
                    <option value="3-4Y">3-4 Years</option>
                  </select>
                </div>
              </div>

              {/* Gender & Relation */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Gender
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["Girl", "Boy"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setNewChildGender(g)}
                        className={`py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                          newChildGender === g
                            ? "bg-[#0D03AE] text-white shadow-xs"
                            : "bg-[#FFFBF0] border border-[#E7DEC8] text-neutral-700 hover:bg-[#FAF8E8]"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                    Relation
                  </label>
                  <select
                    value={newChildRelation}
                    onChange={(e) => setNewChildRelation(e.target.value)}
                    className="w-full bg-[#FFFBF0] border border-[#E7DEC8] rounded-2xl px-4 py-2 text-sm text-neutral-900 outline-none focus:border-[#0D03AE] focus:bg-white focus:ring-2 focus:ring-[#0D03AE]/15 transition-all cursor-pointer"
                  >
                    <option value="Daughter">Daughter</option>
                    <option value="Son">Son</option>
                    <option value="Niece">Niece</option>
                    <option value="Nephew">Nephew</option>
                    <option value="Grandchild">Grandchild</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E7DEC8]">
                <button
                  type="button"
                  onClick={() => setIsAddChildOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-neutral-600 hover:bg-[#FAF8E8] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0D03AE] text-white hover:bg-[#DC5513] text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Save Child Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 font-jost"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsDeleteModalOpen(false)}
          />

          {/* Modal Card */}
          <div
            data-lenis-prevent="true"
            className="relative w-full max-w-md bg-[#fffcf6] rounded-3xl shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 border border-rose-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-primary text-2xl text-neutral-900 text-center">
              Delete Your Account?
            </h3>
            <p className="text-xs text-neutral-600 text-center mt-2 leading-relaxed">
              This will permanently erase your profile, saved children&apos;s sizing,
              and 450 Baha Coins. This action cannot be reversed.
            </p>

            <div className="mt-5">
              <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wide mb-1.5 text-center">
                Type <strong className="text-rose-600 font-mono font-black">DELETE</strong> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="DELETE"
                className="w-full bg-[#FFFBF0] border border-rose-300 rounded-2xl px-4 py-2 text-center text-sm font-bold text-rose-600 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-1/2 py-2.5 rounded-full border border-[#E7DEC8] bg-[#FAF8E8] text-xs font-bold text-neutral-700 hover:bg-[#FFFBF0] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmationText !== "DELETE"}
                onClick={handleConfirmDeleteAccount}
                className="w-1/2 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
