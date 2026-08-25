export default function UserCabinas() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Stol band qilish</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white">
          <h3 className="font-semibold text-amber-400">Kabina #1</h3>
          <p className="text-sm text-gray-400 mt-1">6 kishilik • Qavat: 2</p>
          <span className="inline-block mt-3 px-2.5 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Band qilingan</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white">
          <h3 className="font-semibold text-amber-400">Kabina #2</h3>
          <p className="text-sm text-gray-400 mt-1">4 kishilik • Qavat: 1</p>
          <span className="inline-block mt-3 px-2.5 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Faol bron</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white">
          <h3 className="font-semibold text-amber-400">Kabina #3</h3>
          <p className="text-sm text-gray-400 mt-1">8 kishilik • Qavat: 2</p>
          <span className="inline-block mt-3 px-2.5 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">Bo'sh</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white">
          <h3 className="font-semibold text-amber-400">Kabina #4</h3>
          <p className="text-sm text-gray-400 mt-1">4 kishilik • Qavat: 1</p>
          <span className="inline-block mt-3 px-2.5 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Faol bron</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white">
          <h3 className="font-semibold text-amber-400">Kabina #5</h3>
          <p className="text-sm text-gray-400 mt-1">10 kishilik • Qavat: 2</p>
          <span className="inline-block mt-3 px-2.5 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">Bo'sh</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white">
          <h3 className="font-semibold text-amber-400">Kabina #6</h3>
          <p className="text-sm text-gray-400 mt-1">2 kishilik • Qavat: 1</p>
          <span className="inline-block mt-3 px-2.5 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Band qilingan</span>
        </div>
      </div>
    </div>
  )
}