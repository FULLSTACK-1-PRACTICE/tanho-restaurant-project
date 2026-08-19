import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  Armchair,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Headphones,
  X,
  Building2,
  Info
} from "lucide-react";

// Types
type ReservationStatus = "Kelgusi" | "O'tgan" | "Bekor qilingan";

interface Reservation {
  id: string;
  code: string;
  date: string;
  time: string;
  guests: number;
  table: string;
  zone: string;
  status: ReservationStatus;
  image: string;
  specialRequest?: string;
}

// Mock Data matching the screenshot layout
const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: "1",
    code: "RZ1258",
    date: "18 May, 2024",
    time: "20:00",
    guests: 4,
    table: "Stol 6",
    zone: "Ichki zal",
    status: "Kelgusi",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    specialRequest: "Deraza yonida joylashgan stol",
  },
  {
    id: "2",
    code: "RZ1120",
    date: "12 May, 2024",
    time: "19:30",
    guests: 2,
    table: "Stol 3",
    zone: "Terrasa",
    status: "Kelgusi",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "3",
    code: "RZ0987",
    date: "05 May, 2024",
    time: "18:00",
    guests: 6,
    table: "VIP Stol 1",
    zone: "VIP zal",
    status: "O'tgan",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "4",
    code: "RZ0876",
    date: "28 Apr, 2024",
    time: "17:30",
    guests: 2,
    table: "Stol 2",
    zone: "Ichki zal",
    status: "O'tgan",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "5",
    code: "RZ0765",
    date: "21 Apr, 2024",
    time: "20:30",
    guests: 3,
    table: "Stol 8",
    zone: "Terrasa",
    status: "Bekor qilingan",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=600&q=80",
  },
];

export default function StolBandQilish() {
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [activeTab, setActiveTab] = useState<"Barchasi" | "Kelgusi" | "O'tgan" | "Bekor qilingan">("Barchasi");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDetails, setSelectedDetails] = useState<Reservation | null>(null);

  // New Reservation Form State
  const [newDate, setNewDate] = useState<string>("2024-05-25");
  const [newTime, setNewTime] = useState<string>("19:00");
  const [newGuests, setNewGuests] = useState<number>(2);
  const [newZone, setNewZone] = useState<string>("Ichki zal");
  const [newTable, setNewTable] = useState<string>("Stol 4");
  const [specialReq, setSpecialReq] = useState<string>("");

  // Filter logic
  const filteredReservations = reservations.filter((item) => {
    if (activeTab === "Barchasi") return true;
    return item.status === activeTab;
  });

  // Featured upcoming reservation (first "Kelgusi")
  const featuredReservation = reservations.find((r) => r.status === "Kelgusi");

  // Statistics calculation
  const stats = {
    total: reservations.length,
    upcoming: reservations.filter((r) => r.status === "Kelgusi").length,
    past: reservations.filter((r) => r.status === "O'tgan").length,
    cancelled: reservations.filter((r) => r.status === "Bekor qilingan").length,
  };

  const handleCancelReservation = (id: string) => {
    setReservations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Bekor qilingan" as const } : item))
    );
  };

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes: Reservation = {
      id: Date.now().toString(),
      code: `RZ${Math.floor(1000 + Math.random() * 9000)}`,
      date: newDate,
      time: newTime,
      guests: newGuests,
      table: newTable,
      zone: newZone,
      status: "Kelgusi",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      specialRequest: specialReq || undefined,
    };
    setReservations([newRes, ...reservations]);
    setIsModalOpen(false);
    setSpecialReq("");
  };

  return (
    <div className="min-h-screen bg-[#050708] text-white p-4 sm:p-6 lg:p-8 animate-fadeIn">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
            Rezervatsiyalarim
          </h1>
          <p className="text-[#929292] text-xs sm:text-sm">
            Bu yerda siz barcha rezervatsiyalaringizni ko'rishingiz mumkin.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#806329] bg-[#0b0d0e] text-[#dcae4d] hover:bg-[#171713] hover:text-[#e0ad50] transition-all duration-200 text-xs sm:text-sm font-medium cursor-pointer active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi rezervatsiya</span>
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Main Section (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          {/* Filter Tabs */}
          <div className="inline-flex flex-wrap p-1 bg-[#111314] rounded-lg border border-[#242629] self-start gap-1">
            {(["Barchasi", "Kelgusi", "O'tgan", "Bekor qilingan"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#0b0d0e] text-[#dcae4d] border border-[#806329] shadow-sm"
                      : "text-[#929292] hover:text-white hover:bg-[#171713]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Reservation Cards List */}
          <div className="flex flex-col gap-4">
            {filteredReservations.length === 0 ? (
              <div className="p-8 text-center bg-[#0b0d0e] border border-[#242629] rounded-xl text-[#777777]">
                Sizda hozircha ushbu bo'limda rezervatsiyalar mavjud emas.
              </div>
            ) : (
              filteredReservations.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0b0d0e] border border-[#242629] rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 hover:border-[#806329]/50 transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  {/* Image */}
                  <div className="relative w-full sm:w-36 h-28 rounded-lg overflow-hidden shrink-0 border border-[#242629]">
                    <img
                      src={item.image}
                      alt={item.code}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-white">
                        Rezervatsiya <span className="text-[#dcae4d]">#{item.code}</span>
                      </h3>
                      {/* Status Tag */}
                      <span
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-md border ${
                          item.status === "Kelgusi"
                            ? "text-[#4ade80] border-[#4ade80]/30 bg-[#4ade80]/10"
                            : item.status === "O'tgan"
                            ? "text-[#929292] border-[#292929] bg-[#111314]"
                            : "text-[#d95043] border-[#d95043]/30 bg-[#d95043]/10"
                        }`}
                      >
                        {item.status === "Kelgusi" && "Kelgusi rezervatsiya"}
                        {item.status === "O'tgan" && "O'tgan rezervatsiya"}
                        {item.status === "Bekor qilingan" && "Bekor qilingan"}
                      </span>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs text-[#929292]">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5 text-[#777777]" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#777777]" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#777777]" />
                        <span>{item.guests} kishi</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Armchair className="w-3.5 h-3.5 text-[#777777]" />
                        <span>{item.table}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#777777]" />
                        <span>{item.zone}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#111314]">
                      <button
                        type="button"
                        onClick={() => setSelectedDetails(item)}
                        className="px-3.5 py-1.5 rounded-lg border border-[#806329] text-[#dcae4d] text-xs font-medium hover:bg-[#171713] transition-colors cursor-pointer active:scale-[0.98]"
                      >
                        Tafsilotlar
                      </button>
                      {item.status === "Kelgusi" && (
                        <button
                          type="button"
                          onClick={() => handleCancelReservation(item.id)}
                          className="px-3.5 py-1.5 rounded-lg border border-[#d95043]/40 text-[#d95043] text-xs font-medium hover:bg-[#d95043]/10 hover:border-[#d95043] transition-colors cursor-pointer active:scale-[0.98]"
                        >
                          Bekor qilish
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-lg border border-[#242629] text-[#929292] hover:text-white hover:border-[#806329] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-[#dcae4d] text-black font-bold"
                    : "border border-[#242629] text-[#929292] hover:text-white hover:bg-[#171713]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              className="p-2 rounded-lg border border-[#242629] text-[#929292] hover:text-white hover:border-[#806329] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Section / Widgets (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Featured Next Reservation Widget */}
          <div className="bg-[#0b0d0e] border border-[#242629] rounded-xl p-4 flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Kelgusi rezervatsiyangiz
            </h2>

            {featuredReservation ? (
              <div className="flex flex-col gap-3">
                <div className="relative h-40 rounded-lg overflow-hidden border border-[#242629]">
                  <img
                    src={featuredReservation.image}
                    alt="Featured"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-[#050708]/80 backdrop-blur-md border border-[#4ade80]/30 text-[#4ade80] text-[11px] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                    {featuredReservation.date} • {featuredReservation.time}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#929292] pt-1">
                  <div className="flex items-center gap-1.5">
                    <Armchair className="w-3.5 h-3.5 text-[#dcae4d]" />
                    <span className="text-white font-medium">{featuredReservation.table}</span>
                  </div>
                  <span>{featuredReservation.zone}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#929292]">
                  <Users className="w-3.5 h-3.5 text-[#dcae4d]" />
                  <span>{featuredReservation.guests} kishi</span>
                </div>

                {featuredReservation.specialRequest && (
                  <div className="p-2.5 rounded-lg bg-[#111314] border border-[#242629] text-[11px] text-[#929292] flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-[#dcae4d] shrink-0 mt-0.5" />
                    <p>
                      <span className="text-[#dcae4d] font-medium">Maxsus so'rov:</span>{" "}
                      {featuredReservation.specialRequest}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDetails(featuredReservation)}
                    className="w-full py-2 rounded-lg border border-[#806329] text-[#dcae4d] text-xs font-medium hover:bg-[#171713] transition-colors text-center cursor-pointer active:scale-[0.98]"
                  >
                    Tafsilotlar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancelReservation(featuredReservation.id)}
                    className="w-full py-2 rounded-lg border border-[#d95043]/40 text-[#d95043] text-xs font-medium hover:bg-[#d95043]/10 transition-colors text-center cursor-pointer active:scale-[0.98]"
                  >
                    Bekor qilish
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#777777] py-4 text-center">
                Yaqin orada kelgusi rezervatsiyalar yo'q.
              </p>
            )}
          </div>

          {/* Reservation Statistics Widget */}
          <div className="bg-[#0b0d0e] border border-[#242629] rounded-xl p-4 flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-white tracking-wide mb-1">
              Rezervatsiya statistikasi
            </h2>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#111314] border border-[#242629]/60">
              <div className="flex items-center gap-2.5 text-xs text-[#929292]">
                <CalendarDays className="w-4 h-4 text-[#dcae4d]" />
                <span>Jami rezervatsiyalar</span>
              </div>
              <span className="text-sm font-bold text-white">{stats.total}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#111314] border border-[#242629]/60">
              <div className="flex items-center gap-2.5 text-xs text-[#929292]">
                <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                <span>Kelgusi rezervatsiyalar</span>
              </div>
              <span className="text-sm font-bold text-white">{stats.upcoming}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#111314] border border-[#242629]/60">
              <div className="flex items-center gap-2.5 text-xs text-[#929292]">
                <Clock className="w-4 h-4 text-[#777777]" />
                <span>O'tgan rezervatsiyalar</span>
              </div>
              <span className="text-sm font-bold text-white">{stats.past}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#111314] border border-[#242629]/60">
              <div className="flex items-center gap-2.5 text-xs text-[#929292]">
                <XCircle className="w-4 h-4 text-[#d95043]" />
                <span>Bekor qilingan</span>
              </div>
              <span className="text-sm font-bold text-white">{stats.cancelled}</span>
            </div>
          </div>

          {/* Support Widget */}
          <div className="bg-[#0b0d0e] border border-[#242629] rounded-xl p-4 flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-white">Yordam kerakmi?</h2>
            <p className="text-xs text-[#777777] leading-relaxed">
              Bizning qo'llab-quvvatlash jamoamiz sizga yordam berishga tayyor.
            </p>
            <button
              type="button"
              className="mt-1 w-full py-2.5 rounded-lg border border-[#806329] bg-[#111314] text-[#dcae4d] text-xs font-medium hover:bg-[#171713] transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Headphones className="w-4 h-4" />
              <span>Biz bilan bog'laning</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: New Reservation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b0d0e] border border-[#242629] rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#777777] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1">Yangi stol band qilish</h2>
            <p className="text-xs text-[#929292] mb-5">
              Kerakli ma'lumotlarni kiriting va stolni band qiling.
            </p>

            <form onSubmit={handleCreateReservation} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-[#929292] mb-1.5">
                  Sana va Vaqt
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                    className="w-full bg-[#111314] border border-[#242629] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#806329]"
                  />
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    required
                    className="w-full bg-[#111314] border border-[#242629] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#806329]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-[#929292] mb-1.5">
                    Mehmonlar soni
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newGuests}
                    onChange={(e) => setNewGuests(Number(e.target.value))}
                    className="w-full bg-[#111314] border border-[#242629] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#806329]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#929292] mb-1.5">
                    Zal turi
                  </label>
                  <select
                    value={newZone}
                    onChange={(e) => setNewZone(e.target.value)}
                    className="w-full bg-[#111314] border border-[#242629] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#806329]"
                  >
                    <option value="Ichki zal">Ichki zal</option>
                    <option value="Terrasa">Terrasa</option>
                    <option value="VIP zal">VIP zal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#929292] mb-1.5">
                  Stol raqami
                </label>
                <select
                  value={newTable}
                  onChange={(e) => setNewTable(e.target.value)}
                  className="w-full bg-[#111314] border border-[#242629] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#806329]"
                >
                  <option value="Stol 1">Stol 1 (2 kishilik)</option>
                  <option value="Stol 4">Stol 4 (4 kishilik)</option>
                  <option value="Stol 6">Stol 6 (4 kishilik)</option>
                  <option value="VIP Stol 1">VIP Stol 1 (8 kishilik)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#929292] mb-1.5">
                  Maxsus so'rov (Izoh)
                </label>
                <textarea
                  rows={2}
                  value={specialReq}
                  onChange={(e) => setSpecialReq(e.target.value)}
                  placeholder="Masalan: Deraza yonida joylashgan stol..."
                  className="w-full bg-[#111314] border border-[#242629] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#806329] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#242629]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#242629] text-xs text-[#929292] hover:text-white transition-colors cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg border border-[#806329] bg-[#dcae4d] text-black text-xs font-bold hover:bg-[#e0ad50] transition-colors cursor-pointer active:scale-[0.98]"
                >
                  Stolni band qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Reservation Details View */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b0d0e] border border-[#242629] rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedDetails(null)}
              className="absolute top-4 right-4 text-[#777777] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1">
              Rezervatsiya #{selectedDetails.code}
            </h2>
            <p className="text-xs text-[#929292] mb-4">To'liq tafsilotlar</p>

            <div className="space-y-3 text-xs">
              <div className="relative h-36 rounded-lg overflow-hidden border border-[#242629] mb-4">
                <img
                  src={selectedDetails.image}
                  alt={selectedDetails.code}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#111314]">
                <span className="text-[#777777]">Holati:</span>
                <span className="text-[#dcae4d] font-medium">{selectedDetails.status}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#111314]">
                <span className="text-[#777777]">Sana va vaqt:</span>
                <span className="text-white">{selectedDetails.date} • {selectedDetails.time}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#111314]">
                <span className="text-[#777777]">Mehmonlar soni:</span>
                <span className="text-white">{selectedDetails.guests} kishi</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#111314]">
                <span className="text-[#777777]">Stol va Zal:</span>
                <span className="text-white">{selectedDetails.table} ({selectedDetails.zone})</span>
              </div>
              {selectedDetails.specialRequest && (
                <div className="py-1.5">
                  <span className="text-[#777777] block mb-1">Maxsus so'rov:</span>
                  <p className="p-2 rounded bg-[#111314] text-[#929292]">{selectedDetails.specialRequest}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedDetails(null)}
                className="px-4 py-2 rounded-lg border border-[#806329] text-[#dcae4d] text-xs font-medium hover:bg-[#171713] transition-colors cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}