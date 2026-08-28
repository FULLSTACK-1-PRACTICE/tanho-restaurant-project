import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type StatusIconProps = {
  offline: boolean;
};

function StatusIcon({ offline }: StatusIconProps) {
  if (offline) {
    return (
      <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
        <path d="m3 3 18 18" />
        <path d="M6.7 18.1A4.7 4.7 0 0 1 7 8.8a6 6 0 0 1 10.8-2.2" />
        <path d="M17 18h1a4 4 0 0 0 .7-7.9" />
      </svg>
    );
  }

  return (
    <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" aria-hidden="true">
      <path d="M2.8 8.8a14.7 14.7 0 0 1 18.4 0" />
      <path d="M5.8 12.2a10 10 0 0 1 12.4 0" />
      <path d="M9 15.6a5.2 5.2 0 0 1 6 0" />
      <path d="M12 20h.01" />
    </svg>
  );
}

function RefreshIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
      <path d="M20 11a8 8 0 0 0-14.8-4L3 10" />
      <path d="M3 5v5h5" />
      <path d="M4 13a8 8 0 0 0 14.8 4L21 14" />
      <path d="M21 19v-5h-5" />
    </svg>
  );
}

export default function WorkMode() {
  const navigate = useNavigate();
  const [, setIsOnline] = useState(() => typeof navigator === "undefined" ? true : navigator.onLine);
  const [isChecking, setIsChecking] = useState(false);

  const handleOnlineRedirect = () => {
    const lastPath = sessionStorage.getItem("last_online_path") || "/";
    navigate(lastPath);
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      handleOnlineRedirect();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (navigator.onLine) {
      handleOnlineRedirect();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigate]);

  const checkConnection = () => {
    setIsChecking(true);
    window.setTimeout(() => {
      const currentStatus = typeof navigator === "undefined" ? true : navigator.onLine;
      setIsOnline(currentStatus);
      setIsChecking(false);
      if (currentStatus) {
        handleOnlineRedirect();
      }
    }, 700);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090a0f] px-5 py-8 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[125px] transition-colors duration-700 bg-amber-400/[0.08]" />

      <section className="relative flex w-full max-w-2xl flex-col items-center text-center">
        <div className="relative mb-9 grid h-52 w-52 place-items-center rounded-full border transition-all duration-500 hover:scale-[1.02] border-amber-300/20 bg-amber-300/[0.06] shadow-amber-500/10">
          <div className="absolute inset-5 rounded-full border opacity-50 border-amber-300/10" />
          <div className="absolute inset-0 animate-pulse rounded-full bg-amber-300/[0.03]" />
          <div className="relative text-amber-300"><StatusIcon offline={true} /></div>
        </div>

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors duration-500 text-amber-300 border-amber-300/20 bg-amber-300/[0.08]">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
          Offline rejim
        </div>

        <h1 className="text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl">
          NO INTERNET
        </h1>

        <p className="mt-5 max-w-xl text-base leading-8 text-white/45 sm:text-lg">
          Internetga ulanish topilmadi. Wi-Fi yoki mobil internetingizni tekshiring va qayta urinib ko‘ring.
        </p>

        <button
          onClick={checkConnection}
          disabled={isChecking}
          className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-extrabold text-black shadow-[0_0_28px_rgba(255,255,255,0.08)] transition duration-200 active:scale-[0.97] disabled:cursor-wait disabled:opacity-70 bg-amber-300 shadow-amber-500/20 hover:bg-amber-200"
        >
          <RefreshIcon spinning={isChecking} />
          {isChecking ? "Tekshirilmoqda..." : "Qayta urinib ko‘rish"}
        </button>

        <p className="mt-8 text-[11px] font-medium tracking-wide text-white/25">
          Ulanish tiklanganda holat avtomatik yangilanadi
        </p>
      </section>
    </main>
  );
}