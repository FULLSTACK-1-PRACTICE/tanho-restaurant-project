import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface Field {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "select";
  options?: string[];
}

interface CrudItem {
  id: number | string;
  customer?: string;
  name?: string;
  table?: number;
  itemsCount?: number;
  total?: string;
  time?: string;
  status?: string;
  phone?: string;
  ordersCount?: number;
  totalSpent?: string;
  role?: string;
  date?: string;
  guests?: number;
  [key: string]: string | number | undefined; 
}

interface GenericCrudSectionProps {
  title: string;
  collectionName: string;
  addLabel: string;
  fields?: Field[];
}

export const GenericCrudSection: React.FC<GenericCrudSectionProps> = ({
  title,
  addLabel,
  fields = [],
}) => {
  const [data] = useState<CrudItem[]>([
    {
      id: 1,
      customer: "Ali Valiyev",
      name: "Ali Valiyev",
      table: 4,
      itemsCount: 3,
      total: "95,000",
      time: "12:30",
      status: "Yangi",
      phone: "+998 90 123 45 67",
      ordersCount: 8,
      totalSpent: "520,000",
      role: "Administrator",
    },
    {
      id: 2,
      customer: "Sardor Karimov",
      name: "Sardor Karimov",
      table: 7,
      itemsCount: 2,
      total: "70,000",
      time: "13:10",
      status: "Tayyorlanmoqda",
      phone: "+998 91 234 56 78",
      ordersCount: 5,
      totalSpent: "310,000",
      role: "Ofitsiant",
    },
  ]);

  return (
    <div className="space-y-6 pb-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Jami: {data.length} ta yozuv
          </p>
        </div>

        <button
          type="button"
          className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-semibold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(245,158,11,0.3)]"
        >
          <Plus size={18} />
          <span>{addLabel}</span>
        </button>
      </div>

      {/* RESPONSIVE TABLE CONTAINER */}
      <div className="bg-[#121619] border border-white/[0.08] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto w-full admin-table-scroll">
          <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
            <thead>
              <tr className="border-b border-white/[0.08] text-gray-400 text-[11px] sm:text-xs uppercase tracking-wider bg-white/[0.02]">
                {fields.map((field) => (
                  <th key={field.key} className="py-3.5 px-4 font-semibold">
                    {field.label}
                  </th>
                ))}
                <th className="py-3.5 px-4 font-semibold text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm text-gray-300">
              {data.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  {fields.map((field) => (
                    <td key={field.key} className="py-4 px-4 whitespace-nowrap">
                      {field.key === "status" ? (
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            item[field.key] === "Yangi"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {item[field.key]}
                        </span>
                      ) : (
                        <span className="truncate block max-w-[150px] sm:max-w-none">
                          {item[field.key]}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500/20 text-gray-400 hover:text-amber-400 transition-colors"
                        title="Tahrirlash"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};