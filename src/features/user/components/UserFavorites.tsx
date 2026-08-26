import { useAuthAndFavorites } from '../../../context/useAuthAndFavorites'

interface FavoriteItem {
  id: string | number
  name: string
  price?: number
  image?: string
}

export default function UserFavorites() {
  const context = useAuthAndFavorites() as unknown as {
    favorites: FavoriteItem[]
    toggleFavorite: (item: FavoriteItem) => void
  }

  const favorites = context?.favorites || []
  const toggleFavorite = context?.toggleFavorite

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Sevimlilar</h2>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/50 p-12 text-center">
          <p className="text-sm text-white/50">Hozircha sevimlilar bo'sh</p>
          <p className="mt-1 text-xs text-white/30">
            Menyudan o'zingizga yoqqan taomlarni yurakcha orqali qo'shing
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((item: FavoriteItem) => (
            <div
              key={item.id}
              className="relative p-4 rounded-xl bg-zinc-900 border border-white/10 text-white flex items-center gap-4 group"
            >
              <div className="w-16 h-16 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-xs text-center px-1 shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  item.name
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-amber-400 mt-1">
                  {item.price ? `${item.price.toLocaleString()} so'm` : ''}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleFavorite && toggleFavorite(item)}
                className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}