import { useState, useEffect, type FormEvent } from "react";
import { Plus, Trash2, Edit, X, Users, LayoutGrid, AlertCircle, Check, ChevronDown } from "lucide-react";

export type TableItem = {
  id: number;
  number: string | number;
  capacity: number;
  zone: string;
  status: "Bo'sh" | "Band" | "Bron qilingan";
};

const DEFAULT_TABLES: TableItem[] = [
  { id: 1, number: "1-Stol", capacity: 4, zone: "Zal", status: "Bo'sh" },
  { id: 2, number: "2-Stol", capacity: 2, zone: "Zal", status: "Band" },
  { id: 3, number: "3-Stol", capacity: 6, zone: "Kabina", status: "Bron qilingan" },
  { id: 4, number: "4-Stol", capacity: 4, zone: "Terassa", status: "Bo'sh" },
];

export default function ManagerTablesSection() {
  const [tables, setTables] = useState<TableItem[]>(() => {
    const saved = localStorage.getItem("restaurant_tables");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_TABLES;
  });

  useEffect(() => {
    localStorage.setItem("restaurant_tables", JSON.stringify(tables));
  }, [tables]);

  const [filterStatus, setFilterStatus] = useState<string>("Barchasi");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<TableItem | null>(null);

  const [newTable, setNewTable] = useState({
    number: "",
    capacity: "4",
    zone: "Zal",
    status: "Bo'sh" as TableItem["status"],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [editErrorMsg, setEditErrorMsg] = useState("");

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleAddTable = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedNumber = newTable.number.trim();
    const regex = /^.+$/;

    if (!regex.test(trimmedNumber)) {
      setErrorMsg("Stol raqami yoki nomini kiriting!");
      return;
    }

    const item: TableItem = {
      id: Date.now(),
      number: trimmedNumber,
      capacity: Number(newTable.capacity) || 4,
      zone: newTable.zone,
      status: newTable.status,
    };

    setTables((prev) => [item, ...prev]);
    setIsAddModalOpen(false);
    setNewTable({ number: "", capacity: "4", zone: "Zal", status: "Bo'sh" });
  };

  const handleUpdateTable = (e: FormEvent) => {
    e.preventDefault();
    if (!editingTable) return;
    setEditErrorMsg("");

    const trimmedNumber = String(editingTable.number).trim();
    const regex = /^.+$/;

    if (!regex.test(trimmedNumber)) {
      setEditErrorMsg("Stol raqami yoki nomini kiriting!");
      return;
    }

    setTables((prev) =>
      prev.map((t) => (t.id === editingTable.id ? { ...editingTable, number: trimmedNumber } : t))
    );
    setEditingTable(null);
  };

  const handleDelete = (id: number) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTables = tables.filter((table) => {
    if (filterStatus === "Barchasi") return true;
    return table.status === filterStatus;
  });

  const zonesList = ["Zal", "Kabina", "Terassa"];
  const statusesList: TableItem["status"][] = ["Bo'sh", "Band", "Bron qilingan"];

  return (
    <div className="space-y-6" onClick={() => setActiveDropdown(null)}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <LayoutGrid className="text-[#DCAE4D]" size={24} />
            Stollar Boshqaruvi
          </div>
          <p className="text-xs text-gray-400 mt-1">Menejer / Stollar ro'yxati</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-[#141416] p-1 rounded-full border border-white/5">
            {["Barchasi", "Bo'sh", "Band", "Bron qilingan"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterStatus === status
                    ? "bg-[#DCAE4D] text-black shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setErrorMsg("");
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#DCAE4D] hover:bg-[#c99b3c] text-black text-xs font-bold transition-all cursor-pointer shadow-md"
          >
            <Plus size={16} /> Stol qo'shish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTables.map((table) => {
          let statusBg = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
          if (table.status === "Band") {
            statusBg = "bg-red-500/10 text-red-400 border-red-500/20";
          } else if (table.status === "Bron qilingan") {
            statusBg = "bg-amber-500/10 text-amber-400 border-amber-500/20";
          }

          return (
            <div
              key={table.id}
              className="bg-[#141416] border border-white/5 rounded-2xl p-5 relative group hover:border-[#DCAE4D]/40 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-gray-300 text-xs font-medium border border-white/5">
                    {table.zone}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusBg}`}>
                    {table.status}
                  </span>
                </div>

                <div className="text-center py-6">
                  <h3 className="text-2xl font-black text-white tracking-wide">
                    {table.number}
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mt-2 font-medium">
                    <Users size={14} className="text-[#DCAE4D]" />
                    <span>{table.capacity} kishilik</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
                <span className="text-[11px] text-gray-500 font-mono">ID: #{table.id.toString().slice(-4)}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditErrorMsg("");
                      setEditingTable(table);
                    }}
                    className="w-8 h-8 rounded-lg bg-white/5 text-gray-300 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    title="Tahrirlash"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(table.id)}
                    className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors cursor-pointer"
                    title="O'chirish"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTables.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500 bg-[#141416]/50 rounded-2xl border border-white/5">
            Stollar topilmadi
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div 
            className="bg-[#141416] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h3 className="text-base font-bold text-white flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#DCAE4D]/10 flex items-center justify-center text-[#DCAE4D]">
                  <Plus size={18} />
                </div>
                Yangi stol qo'shish
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddTable} noValidate className="p-6 space-y-4">
              {errorMsg && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Stol raqami / Nomi</label>
                <input
                  type="text"
                  value={newTable.number}
                  onChange={(e) => {
                    setNewTable({ ...newTable, number: e.target.value });
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="Masalan: 5-Stol"
                  className="w-full bg-[#1b1b1f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#DCAE4D] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Kishilar soni (Sig'imi)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={newTable.capacity}
                    onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                    className="w-full bg-[#1b1b1f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#DCAE4D] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 select-none">
                    <button
                      type="button"
                      onClick={() => setNewTable(prev => ({ ...prev, capacity: String(Math.max(1, Number(prev.capacity || 0) + 1)) }))}
                      className="text-gray-400 hover:text-[#DCAE4D] transition-colors p-0.5 cursor-pointer"
                    >
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewTable(prev => ({ ...prev, capacity: String(Math.max(1, Number(prev.capacity || 0) - 1)) }))}
                      className="text-gray-400 hover:text-[#DCAE4D] transition-colors p-0.5 cursor-pointer"
                    >
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Custom Dropdown: Zal / Hudud */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Zal / Hudud</label>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === "add-zone" ? null : "add-zone");
                  }}
                  className={`w-full bg-[#1b1b1f] border rounded-xl px-4 py-3 text-sm text-white flex items-center justify-between cursor-pointer transition-all ${
                    activeDropdown === "add-zone" ? "border-[#DCAE4D] ring-1 ring-[#DCAE4D]" : "border-white/10 hover:border-[#DCAE4D]/50"
                  }`}
                >
                  <span>{newTable.zone}</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${activeDropdown === "add-zone" ? "rotate-180 text-[#DCAE4D]" : ""}`} />
                </div>

                {activeDropdown === "add-zone" && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b1b1f] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-30 py-1.5">
                    {zonesList.map((z) => (
                      <div
                        key={z}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewTable({ ...newTable, zone: z });
                          setActiveDropdown(null);
                        }}
                        className={`px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                          newTable.zone === z ? "bg-[#DCAE4D]/10 text-[#DCAE4D] font-medium" : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{z}</span>
                        {newTable.zone === z && <Check size={16} className="text-[#DCAE4D]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Dropdown: Holati */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Holati</label>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === "add-status" ? null : "add-status");
                  }}
                  className={`w-full bg-[#1b1b1f] border rounded-xl px-4 py-3 text-sm text-white flex items-center justify-between cursor-pointer transition-all ${
                    activeDropdown === "add-status" ? "border-[#DCAE4D] ring-1 ring-[#DCAE4D]" : "border-white/10 hover:border-[#DCAE4D]/50"
                  }`}
                >
                  <span>{newTable.status}</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${activeDropdown === "add-status" ? "rotate-180 text-[#DCAE4D]" : ""}`} />
                </div>

                {activeDropdown === "add-status" && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b1b1f] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-30 py-1.5">
                    {statusesList.map((st) => (
                      <div
                        key={st}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewTable({ ...newTable, status: st });
                          setActiveDropdown(null);
                        }}
                        className={`px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                          newTable.status === st ? "bg-[#DCAE4D]/10 text-[#DCAE4D] font-medium" : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{st}</span>
                        {newTable.status === st && <Check size={16} className="text-[#DCAE4D]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold hover:bg-white/5 text-gray-300 cursor-pointer transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#DCAE4D] hover:bg-[#c99b3c] text-black rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-lg"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div 
            className="bg-[#141416] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h3 className="text-base font-bold text-white flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#DCAE4D]/10 flex items-center justify-center text-[#DCAE4D]">
                  <Edit size={18} />
                </div>
                Stolni tahrirlash
              </h3>
              <button
                type="button"
                onClick={() => setEditingTable(null)}
                className="w-8 h-8 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateTable} noValidate className="p-6 space-y-4">
              {editErrorMsg && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{editErrorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Stol raqami / Nomi</label>
                <input
                  type="text"
                  value={editingTable.number}
                  onChange={(e) => {
                    setEditingTable({ ...editingTable, number: e.target.value });
                    if (editErrorMsg) setEditErrorMsg("");
                  }}
                  className="w-full bg-[#1b1b1f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#DCAE4D] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Kishilar soni (Sig'imi)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={editingTable.capacity}
                    onChange={(e) => setEditingTable({ ...editingTable, capacity: Number(e.target.value) })}
                    className="w-full bg-[#1b1b1f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#DCAE4D] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 select-none">
                    <button
                      type="button"
                      onClick={() => setEditingTable(prev => prev ? ({ ...prev, capacity: Math.max(1, Number(prev.capacity || 0) + 1) }) : null)}
                      className="text-gray-400 hover:text-[#DCAE4D] transition-colors p-0.5 cursor-pointer"
                    >
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTable(prev => prev ? ({ ...prev, capacity: Math.max(1, Number(prev.capacity || 0) - 1) }) : null)}
                      className="text-gray-400 hover:text-[#DCAE4D] transition-colors p-0.5 cursor-pointer"
                    >
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Custom Dropdown Edit: Zal / Hudud */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Zal / Hudud</label>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === "edit-zone" ? null : "edit-zone");
                  }}
                  className={`w-full bg-[#1b1b1f] border rounded-xl px-4 py-3 text-sm text-white flex items-center justify-between cursor-pointer transition-all ${
                    activeDropdown === "edit-zone" ? "border-[#DCAE4D] ring-1 ring-[#DCAE4D]" : "border-white/10 hover:border-[#DCAE4D]/50"
                  }`}
                >
                  <span>{editingTable.zone}</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${activeDropdown === "edit-zone" ? "rotate-180 text-[#DCAE4D]" : ""}`} />
                </div>

                {activeDropdown === "edit-zone" && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b1b1f] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-30 py-1.5">
                    {zonesList.map((z) => (
                      <div
                        key={z}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTable({ ...editingTable, zone: z });
                          setActiveDropdown(null);
                        }}
                        className={`px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                          editingTable.zone === z ? "bg-[#DCAE4D]/10 text-[#DCAE4D] font-medium" : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{z}</span>
                        {editingTable.zone === z && <Check size={16} className="text-[#DCAE4D]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Dropdown Edit: Holati */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Holati</label>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === "edit-status" ? null : "edit-status");
                  }}
                  className={`w-full bg-[#1b1b1f] border rounded-xl px-4 py-3 text-sm text-white flex items-center justify-between cursor-pointer transition-all ${
                    activeDropdown === "edit-status" ? "border-[#DCAE4D] ring-1 ring-[#DCAE4D]" : "border-white/10 hover:border-[#DCAE4D]/50"
                  }`}
                >
                  <span>{editingTable.status}</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${activeDropdown === "edit-status" ? "rotate-180 text-[#DCAE4D]" : ""}`} />
                </div>

                {activeDropdown === "edit-status" && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b1b1f] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-30 py-1.5">
                    {statusesList.map((st) => (
                      <div
                        key={st}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTable({ ...editingTable, status: st });
                          setActiveDropdown(null);
                        }}
                        className={`px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                          editingTable.status === st ? "bg-[#DCAE4D]/10 text-[#DCAE4D] font-medium" : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{st}</span>
                        {editingTable.status === st && <Check size={16} className="text-[#DCAE4D]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setEditingTable(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold hover:bg-white/5 text-gray-300 cursor-pointer transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#DCAE4D] hover:bg-[#c99b3c] text-black rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-lg"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}