import { useState, useEffect } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { SideBar } from "../../components/common/SideBar"
import { Navbar } from "../../components/common/DashboardNavbar"
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

  useEffect(() => {
    localStorage.setItem("user_role", "user")
    localStorage.setItem("is_logged_in", "true")
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

  useEffect(() => {
    const updateLabels = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null)
      let node
      while ((node = walker.nextNode())) {
        if (node.nodeValue === "Admin") {
          node.nodeValue = "User"
        } else if (node.nodeValue === "Administrator") {
          node.nodeValue = "Foydalanuvchi"
        }
      }
    }

    updateLabels()
    const timer = setTimeout(updateLabels, 50)
    return () => clearTimeout(timer)
  }, [location.pathname])

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
        <Navbar 
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setMobileSidebarOpen(!mobileSidebarOpen)
            } else {
              setSidebarOpen(!sidebarOpen)
            }
          }}
          title="Foydalanuvchi paneli"
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-zinc-950">
          <Outlet />
        </main>
      </div>
    </div>
  )
}