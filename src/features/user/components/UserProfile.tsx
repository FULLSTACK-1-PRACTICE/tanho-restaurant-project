export default function UserProfile() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Shaxsiy ma'lumotlar</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Ism</label>
          <input type="text" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white" defaultValue="Izzatbek" />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Telefon raqam</label>
          <input type="text" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white" defaultValue="+998 90 123 45 67" />
        </div>
      </div>
    </div>
  )
}