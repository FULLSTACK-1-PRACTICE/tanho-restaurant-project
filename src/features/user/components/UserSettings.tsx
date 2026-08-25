export default function UserSettings() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Sozlamalar</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-zinc-300">Bildirishnomalar</span>
          <input type="checkbox" className="toggle" defaultChecked />
        </div>
      </div>
    </div>
  )
}