import { useEffect, useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { toast } from "sonner"
import { SideBar } from "../../components/common/SideBar"
import { DashboardNavbar } from "../../components/common/DashboardNavbar"
import {
  Home,
  Calendar,
  Heart,
  MessageSquare,
  Globe,
} from "lucide-react"

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

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("user_name") || "USER"
  })

  const [userAvatar, setUserAvatar] = useState(() => {
    return localStorage.getItem("user_avatar") || ""
  })

  useEffect(() => {
    const updateUser = () => {
      setUserName(localStorage.getItem("user_name") || "USER")
      setUserAvatar(localStorage.getItem("user_avatar") || "")
    }

    updateUser()

    window.addEventListener("userUpdated", updateUser)

    return () => {
      window.removeEventListener("userUpdated", updateUser)
    }
  }, [])

  const userNavItems: NavItem[] = [
    {
      label: "Bosh sahifa",
      path: "/user",
      icon: Home,
    },
    {
      label: "Stol band qilish",
      path: "/user/stollar",
      icon: Calendar,
    },
    {
      label: "Sevimlilar",
      path: "/user/sevimlilar",
      icon: Heart,
    },
    {
      label: "Taklif va shikoyatlar",
      path: "/user/takliflar",
      icon: MessageSquare,
    },
    {
      label: "Asosiy Sayt (Landing)",
      path: "/",
      icon: Globe,
    },
  ]

  const handleLogout = () => {
    toast.info("Tizimdan chiqildi", {
      description: "Xayr, sog' bo'ling!",
    })

    localStorage.removeItem("user")
    localStorage.removeItem("is_logged_in")
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("user_role")

    setTimeout(() => {
      navigate("/")
    }, 300)
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
      return
    }

    navigate(`/user/${page}`)
  }

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileSidebarOpen((prev) => !prev)
    } else {
      setSidebarOpen((prev) => !prev)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      <SideBar
        items={userNavItems}
        sidebarOpen={sidebarOpen}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        activePath={location.pathname}
        onItemClick={(targetPath: string) => {
          if (targetPath) {
            navigate(targetPath)
          }
        }}
      />

      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <DashboardNavbar
          title="Foydalanuvchi paneli"
          onToggleSidebar={handleToggleSidebar}
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onNavigate={handleNavigate}
          user={{
            name: userName,
            role: "Foydalanuvchi",
            avatar: userAvatar,
          }}
        />

        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}