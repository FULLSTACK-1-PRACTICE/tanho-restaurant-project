import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function UserProfile() {
  const [name, setName] = useState(() => {
    return localStorage.getItem("user_name") || "USER"
  })
  const [phone, setPhone] = useState(() => {
    return localStorage.getItem("user_phone") || "+998 90 123 45 67"
  })
  const [avatar, setAvatar] = useState(() => {
    return localStorage.getItem("user_avatar") || ""
  })

  useEffect(() => {
    const handleStorageUpdate = () => {
      setName(localStorage.getItem("user_name") || "USER")
      setPhone(localStorage.getItem("user_phone") || "+998 90 123 45 67")
      setAvatar(localStorage.getItem("user_avatar") || "")
    }

    window.addEventListener("userUpdated", handleStorageUpdate)
    return () => {
      window.removeEventListener("userUpdated", handleStorageUpdate)
    }
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      localStorage.setItem("user_name", name)
      localStorage.setItem("user_phone", phone)
      if (avatar) {
        localStorage.setItem("user_avatar", avatar)
      }

      window.dispatchEvent(new Event("userUpdated"))
      toast.success("Profil ma'lumotlari saqlandi!")
    } catch (error) {
      console.error("Profilni saqlashda xatolik:", error)
      toast.error("Saqlashda xatolik yuz berdi")
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-white">Profil</h1>

      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-2xl border border-amber-500/30 overflow-hidden shrink-0 aspect-square">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              name.trim() ? name.trim().charAt(0).toUpperCase() : "U"
            )}
          </div>
          <label className="cursor-pointer">
            <span className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium rounded-lg transition-colors inline-block">
              Rasm tanlash
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Ism</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d9a441] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">Telefon</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#d9a441] text-sm"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#d9a441] hover:bg-[#edbd58] text-black font-semibold rounded-lg text-sm transition-colors cursor-pointer"
          >
            Saqlash
          </button>
        </form>
      </div>
    </div>
  )
}