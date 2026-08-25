export default function UserFavorites() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Sevimlilar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-xs text-center px-1">Lag'mon</div>
          <div>
            <h3 className="font-semibold text-white">Lag'mon (Qovurma)</h3>
            <p className="text-sm text-amber-400 mt-1">38,000 so'm</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-white flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-xs text-center px-1">Mastava</div>
          <div>
            <h3 className="font-semibold text-white">Mastava</h3>
            <p className="text-sm text-amber-400 mt-1">25,000 so'm</p>
          </div>
        </div>
      </div>
    </div>
  )
}