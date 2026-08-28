import { useState } from "react";
import { Calendar, Search, CheckCircle2, XCircle, Clock, Phone, User, Users, AlertCircle } from "lucide-react";

interface Reservation {
  id: string;
  clientName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableType: string;
  status: "Kutilmoqda" | "Tasdiqlangan" | "Bekor qilingan";
}

const initialReservations: Reservation[] = [
  {
    id: "1",
    clientName: "Sardor Rahimov",
    phone: "+998 90 555 44 33",
    date: "1 Sentyabr, 2026",
    time: "19:00",
    guests: 4,
    tableType: "Deraza yonida",
    status: "Kutilmoqda",
  },
  {
    id: "2",
    clientName: "Dilshodbek Tursunov",
    phone: "+998 93 777 88 99",
    date: "2 Sentyabr, 2026",
    time: "20:30",
    guests: 2,
    tableType: "VIP Stol",
    status: "Tasdiqlangan",
  },
];

export default function ManagerReservationsSection() {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Barchasi");

  const handleStatusChange = (id: string, newStatus: Reservation["status"]) => {
    setReservations(
      reservations.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filtered = reservations.filter((item) => {
    const matchesSearch =
      item.clientName.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search);
    const matchesFilter = filterStatus === "Barchasi" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar style={{ color: "#F6B530" }} /> Rezervatsiyalar Boshqaruvi
          </h1>
          <p className="text-sm text-gray-400">Menejer / Rezervatsiyalar ro'yxati</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["Barchasi", "Kutilmoqda", "Tasdiqlangan", "Bekor qilingan"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                backgroundColor: filterStatus === status ? "#F6B530" : "rgba(255, 255, 255, 0.05)",
                color: filterStatus === status ? "#000" : "#fff",
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap"
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Mijoz ismi yoki telefon raqami bo'yicha qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111113] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#111113] border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                    <Calendar size={14} style={{ color: "#F6B530" }} /> {item.date}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
                      item.status === "Tasdiqlangan"
                        ? "bg-green-500/20 text-green-400"
                        : item.status === "Kutilmoqda"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <User size={16} className="text-gray-400" /> {item.clientName}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" /> {item.phone}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
                  <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-400 block flex items-center justify-center gap-1">
                      <Clock size={12} /> Vaqt
                    </span>
                    <span className="text-xs font-bold text-white">{item.time}</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-400 block flex items-center justify-center gap-1">
                      <Users size={12} /> Mehmon
                    </span>
                    <span className="text-xs font-bold text-white">{item.guests} kishi</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded-xl border border-white/5">
                    <span className="text-[10px] text-gray-400 block">Stol turi</span>
                    <span className="text-xs font-bold text-white truncate block">{item.tableType}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                {item.status !== "Tasdiqlangan" && (
                  <button
                    onClick={() => handleStatusChange(item.id, "Tasdiqlangan")}
                    className="flex items-center gap-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
                  >
                    <CheckCircle2 size={14} /> Tasdiqlash
                  </button>
                )}
                {item.status !== "Bekor qilingan" && (
                  <button
                    onClick={() => handleStatusChange(item.id, "Bekor qilingan")}
                    className="flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
                  >
                    <XCircle size={14} /> Bekor qilish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#111113] border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
            <AlertCircle size={24} style={{ color: "#F6B530" }} />
          </div>
          <h3 className="text-white font-bold text-lg">Ma'lumot topilmadi</h3>
          <p className="text-xs text-gray-400 max-w-sm">
            Hozircha bu bo'limda hech qanday rezervatsiyalar mavjud emas yoki qidiruv bo'yicha hech narsa topilmadi.
          </p>
        </div>
      )}
    </div>
  );
}