import { useState, useEffect } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { SideBar } from "../../components/common/SideBar"
import { DashboardNavbar } from "../../components/common/DashboardNavbar"
import { Home, Calendar, Heart, MessageSquare, Globe } from "lucide-react"

interface NavItem {
  label: string
  path: string
  icon: React.ComponentType<{ className?: string }>
}

export default function UserLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  
  // LocalStorage'dan ismni olish (agar bo'sh bo'lsa "USER")
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("user_name") || "USER"
  })

  useEffect(() => {
    localStorage.setItem("user_role", "user")
    localStorage.setItem("is_logged_in", "true")

    // Event kelganda ismni darhol yangilash
    const updateUser = () => {
      const savedName = localStorage.getItem("user_name")
      if (savedName) {
        setUserName(savedName)
      }
    }

    window.addEventListener("userUpdated", updateUser)
    return () => {
      window.removeEventListener("userUpdated", updateUser)
    }
  }, [])

  const userNavItems: NavItem[] = [
    { label: "Bosh sahifa", path: "/user", icon: Home },
    { label: "Stol band qilish", path: "/user/stollar", icon: Calendar },
    { label: "Sevimlilar", path: "/user/sevimlilar", icon: Heart },
    { label: "Taklif va shikoyatlar", path: "/user/takliflar", icon: MessageSquare },
    { label: "Asosiy Sayt (Landing)", path: "/", icon: Globe },
  ]

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  const handleProfileClick = () => {
    navigate("/user/profil")
  }

  const handleSettingsClick = () => {
    navigate("/user/sozlamalar")
  }

  const handleNavigate = (page: string) => {
    if (page.startsWith("/")) {
      navigate(page)
    } else {
      navigate(`/user/${page}`)
    }
  }

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <SideBar
        items={userNavItems}
        sidebarOpen={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        activePath={location.pathname}
        onItemClick={(targetPath: string) => {
          if (targetPath) navigate(targetPath)
        }}
      />
      
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <DashboardNavbar
          title="Foydalanuvchi paneli"
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setMobileSidebarOpen(!mobileSidebarOpen)
            } else {
              setSidebarOpen(!sidebarOpen)
            }
          }}
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onNavigate={handleNavigate}
          user={{
            name: userName,
            role: "Foydalanuvchi",
          }}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-zinc-950">
          <Outlet />
        </main>
      </div>
    </div>
  )
}