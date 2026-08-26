import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function UserProfile() {
  const [name, setName] = useState(() => {
    return localStorage.getItem("user_name") || "USER"
  })
  const [phone, setPhone] = useState(() => {
    return localStorage.getItem("user_phone") || "+998 90 123 45 67"
  })

  useEffect(() => {
    const handleStorageUpdate = () => {
      setName(localStorage.getItem("user_name") || "USER")
      setPhone(localStorage.getItem("user_phone") || "+998 90 123 45 67")
    }

    window.addEventListener("userUpdated", handleStorageUpdate)
    return () => {
      window.removeEventListener("userUpdated", handleStorageUpdate)
    }
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    localStorage.setItem("user_name", name)
    localStorage.setItem("user_phone", phone)

    window.dispatchEvent(new Event("userUpdated"))

    toast.success("Profil ma'lumotlari saqlandi!")
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-white">Profil</h1>

      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-2xl border border-amber-500/30">
            {name.trim() ? name.trim().charAt(0).toUpperCase() : "U"}
          </div>
          <input
            type="file"
            className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
          />
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Ism</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">Telefon</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg text-sm transition-colors cursor-pointer"
          >
            Saqlash
          </button>
        </form>
      </div>
    </div>
  )
}