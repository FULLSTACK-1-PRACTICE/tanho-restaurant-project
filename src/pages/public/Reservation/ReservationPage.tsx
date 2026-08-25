import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Armchair, 
  ChevronDown, 
  CheckCircle2, 
  Bell, 
  UtensilsCrossed, 
  Music, 
  Heart, 
  MessageCircle, 
  CalendarCheck,
  AlertTriangle,
  X
} from 'lucide-react';
import Container from '../../../components/ui/container/Container';
import Button from '../../../components/ui/Button';
import Cabina from "../../../assets/images/About/Cabina.png";

const ReservationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    date: '1 Sentabr, 2026',
    time: '19:00',
    guests: '4 kishi',
    tableType: 'Istalgan stol turi',
    note: ''
  });

  const [openDropdown, setOpenDropdown] = useState<'guests' | 'tableType' | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Modal uchun state

  const guestOptions = ['1 kishi', '2 kishi', '3 kishi', '4 kishi', '5+ kishi'];
  const tableTypeOptions = ['Istalgan stol turi', 'Kabina', 'Zal', 'Devor Oldidan'];

  const phoneRegex = /^\+?998\d{9}$/;
  const nameRegex = /^[\p{L}\s]{3,}$/u;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const hasName = formData.fullName.trim().length > 0;
    const hasPhone = formData.phone.trim().length > 0;

    if (!hasName && !hasPhone) {
      setError("Iltimos, barcha majburiy maydonlarni to'liq to'ldiring!");
      return;
    }

    if (hasName && !hasPhone) {
      setError("Iltimos, nomeringizni kiriting!");
      return;
    }

    if (!hasName && hasPhone) {
      setError("Iltimos, ism va familiyangizni kiriting!");
      return;
    }

    if (!nameRegex.test(formData.fullName.trim())) {
      setError("Ism noto'g'ri kiritildi (kamida 3 ta harf bo'lishi kerak)");
      return;
    }

    const cleanPhone = formData.phone.replace(/[()\s-]/g, '');

    if (!phoneRegex.test(cleanPhone)) {
      setError("Telefon raqam formati noto'g'ri (+998XXXXXXXXX)");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmReservation = () => {
    setShowConfirmModal(false);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#050708] text-white font-sans pb-12 sm:pb-16 overflow-x-hidden">
      
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0A0A0B] border border-[#23232A] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center">
            
            <button 
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-[#e5c567]/10 border border-[#e5c567]/30 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-[#e5c567]" />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Tasdiqlash
            </h3>
            
            <p className="text-xs sm:text-sm text-neutral-300 mb-6">
              Aminmisiz? Band qilishga ishonchingiz komilmi?
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="bg-[#141417] hover:bg-[#1E1E24] text-neutral-300 font-medium py-2.5 rounded-xl text-xs transition border border-[#23232A]"
              >
                Yo'q, qaytish
              </button>
              <button 
                type="button"
                onClick={handleConfirmReservation}
                className="bg-[#e5c567] hover:bg-[#d4b456] text-[#050708] font-semibold py-2.5 rounded-xl text-xs transition shadow-lg shadow-[#e5c567]/20"
              >
                Ha, ishonchim komil
              </button>
            </div>

          </div>
        </div>
      )}

      <div 
        className="relative w-full border-b border-[#1A1A1E] bg-cover bg-center pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(5, 7, 8, 0.9) 15%, rgba(5, 7, 8, 0.7) 55%, rgba(5, 7, 8, 0.9) 90%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop')`,
        }}
      >
        <Container>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white tracking-wide mb-2 sm:mb-3">
                Stol band qilish
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400">
                Bosh sahifa <span className="mx-1.5 text-[#e5c567]">›</span> <span className="text-[#e5c567]">Stol band qilish</span>
              </p>
            </div>

            <div className="bg-[#0A0A0B]/95 border border-[#1E1E24] rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 w-full lg:max-w-md shadow-2xl backdrop-blur-md">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e5c567]/10 border border-[#e5c567]/30 flex items-center justify-center shrink-0">
                <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#e5c567]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-white leading-snug">
                  Oldindan band qiling, va biz sizni kutamiz!
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 sm:mt-1">
                  Eng yaxshi xizmat va qulay stol Siz uchun tayyor.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="mt-6 sm:mt-8">
        <div className="bg-[#0A0A0B] border border-[#1E1E24] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-6 flex flex-col justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">
                Rezervatsiya ma'lumotlari
              </h2>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {success && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-green-400 text-xs">
                    Rezervatsiya muvaffaqiyatli qabul qilindi!
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#141417] border border-[#23232A] rounded-xl p-3 focus-within:border-[#e5c567] transition">
                    <label className="block text-[11px] text-neutral-400 font-medium mb-1">
                      Ism va familiya
                    </label>
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-[#e5c567] shrink-0" />
                      <input 
                        type="text" 
                        placeholder="Ismingizni kiriting"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
                      />
                    </div>
                  </div>

                  <div className="bg-[#141417] border border-[#23232A] rounded-xl p-3 focus-within:border-[#e5c567] transition">
                    <label className="block text-[11px] text-neutral-400 font-medium mb-1">
                      Telefon raqam
                    </label>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#e5c567] shrink-0" />
                      <input 
                        type="text" 
                        placeholder="+998901234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#141417] border border-[#23232A] rounded-xl p-3 focus-within:border-[#e5c567] transition">
                    <label className="block text-[11px] text-neutral-400 font-medium mb-1">
                      Sanani tanlang
                    </label>
                    <div className="flex items-center justify-between">
                      <input 
                        type="text" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer"
                      />
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    </div>
                  </div>

                  <div className="bg-[#141417] border border-[#23232A] rounded-xl p-3 focus-within:border-[#e5c567] transition">
                    <label className="block text-[11px] text-neutral-400 font-medium mb-1">
                      Vaqtni tanlang
                    </label>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 w-full">
                        <Clock className="w-4 h-4 text-[#e5c567] shrink-0" />
                        <input 
                          type="text" 
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer"
                        />
                      </div>
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#141417] border border-[#23232A] rounded-xl p-3 relative cursor-pointer select-none" onClick={() => setOpenDropdown(openDropdown === 'guests' ? null : 'guests')}>
                    <label className="block text-[11px] text-neutral-400 font-medium mb-1">
                      Kishi soni
                    </label>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#e5c567] shrink-0" />
                        <span className="text-xs text-white">{formData.guests}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    </div>

                    {openDropdown === 'guests' && (
                      <div className="absolute left-0 right-0 top-full mt-2 bg-[#141417] border border-[#23232A] rounded-xl shadow-2xl z-20 py-1">
                        {guestOptions.map((opt) => (
                          <div 
                            key={opt}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData({...formData, guests: opt});
                              setOpenDropdown(null);
                            }}
                            className="px-4 py-2 text-xs text-neutral-200 hover:bg-[#e5c567]/15 hover:text-[#e5c567] transition"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-[#141417] border border-[#23232A] rounded-xl p-3 relative cursor-pointer select-none" onClick={() => setOpenDropdown(openDropdown === 'tableType' ? null : 'tableType')}>
                    <label className="block text-[11px] text-neutral-400 font-medium mb-1">
                      Stol turi (ixtiyoriy)
                    </label>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Armchair className="w-4 h-4 text-[#e5c567] shrink-0" />
                        <span className="text-xs text-white">{formData.tableType}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    </div>

                    {openDropdown === 'tableType' && (
                      <div className="absolute left-0 right-0 top-full mt-2 bg-[#141417] border border-[#23232A] rounded-xl shadow-2xl z-20 py-1">
                        {tableTypeOptions.map((opt) => (
                          <div 
                            key={opt}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData({...formData, tableType: opt});
                              setOpenDropdown(null);
                            }}
                            className="px-4 py-2 text-xs text-neutral-200 hover:bg-[#e5c567]/15 hover:text-[#e5c567] transition"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#141417] border border-[#23232A] rounded-xl p-3 focus-within:border-[#e5c567] transition">
                  <label className="block text-[11px] text-neutral-400 font-medium mb-1">
                    Qo'shimcha izoh (ixtiyoriy)
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Masalan: Tug'ilgan kun, maxsus so'rovlar va h.k."
                    value={formData.note}
                    onChange={(e) => setFormData({...formData, note: e.target.value})}
                    className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full resize-none"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-xs text-center">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-[#e5c567] hover:bg-[#d4b456] text-[#050708] font-semibold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#e5c567]/10 mt-2 transition cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4 text-[#050708]" />
                  <span>Stolni band qilish</span>
                </Button>
              </form>

              <div className="mt-4 flex items-center gap-2 text-neutral-400 text-[11px]">
                <CheckCircle2 className="w-4 h-4 text-[#e5c567] shrink-0" />
                <span>Rezervatsiyangiz tasdiqlangandan so'ng sizga SMS orqali xabar yuboriladi.</span>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 mt-6 lg:mt-0" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              
              <div className="bg-[#141417]/90 border border-[#23232A] rounded-xl p-3 sm:p-5 text-center flex flex-col items-center justify-between min-h-[170px] sm:min-h-[190px] hover:border-[#e5c567]/40 transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e5c567]/10 border border-[#e5c567]/20 flex items-center justify-center mb-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#e5c567]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-white mb-1">Oson va tez</h4>
                  <p className="text-[9px] sm:text-[10px] text-neutral-400 leading-relaxed">
                    Bir necha qadamda stol band qilishingiz mumkin.
                  </p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#e5c567] mt-2 sm:mt-3">01</span>
              </div>

              <div className="bg-[#141417]/90 border border-[#23232A] rounded-xl p-3 sm:p-5 text-center flex flex-col items-center justify-between min-h-[170px] sm:min-h-[190px] hover:border-[#e5c567]/40 transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e5c567]/10 border border-[#e5c567]/20 flex items-center justify-center mb-2">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#e5c567]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-white mb-1">Tasdiqlash</h4>
                  <p className="text-[9px] sm:text-[10px] text-neutral-400 leading-relaxed">
                    Rezervatsiyangiz tez orada tasdiqlaymiz.
                  </p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#e5c567] mt-2 sm:mt-3">02</span>
              </div>

              <div className="bg-[#141417]/90 border border-[#23232A] rounded-xl p-3 sm:p-5 text-center flex flex-col items-center justify-between min-h-[170px] sm:min-h-[190px] hover:border-[#e5c567]/40 transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e5c567]/10 border border-[#e5c567]/20 flex items-center justify-center mb-2">
                  <Armchair className="w-4 h-4 sm:w-5 sm:h-5 text-[#e5c567]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-white mb-1">Eng yaxshi joylar</h4>
                  <p className="text-[9px] sm:text-[10px] text-neutral-400 leading-relaxed">
                    Siz uchun eng qulay stolni tanlaymiz.
                  </p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#e5c567] mt-2 sm:mt-3">03</span>
              </div>

              <div className="bg-[#141417]/90 border border-[#23232A] rounded-xl p-3 sm:p-5 text-center flex flex-col items-center justify-between min-h-[170px] sm:min-h-[190px] hover:border-[#e5c567]/40 transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e5c567]/10 border border-[#e5c567]/20 flex items-center justify-center mb-2">
                  <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-[#e5c567]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-white mb-1">A'lo xizmat</h4>
                  <p className="text-[9px] sm:text-[10px] text-neutral-400 leading-relaxed">
                    Professional jamoamiz sizni kutib olishga tayyor.
                  </p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#e5c567] mt-2 sm:mt-3">04</span>
              </div>

              <div className="bg-[#141417]/90 border border-[#23232A] rounded-xl p-3 sm:p-5 text-center flex flex-col items-center justify-between min-h-[170px] sm:min-h-[190px] hover:border-[#e5c567]/40 transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e5c567]/10 border border-[#e5c567]/20 flex items-center justify-center mb-2">
                  <Music className="w-4 h-4 sm:w-5 sm:h-5 text-[#e5c567]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-white mb-1">Yoqimli muhit</h4>
                  <p className="text-[9px] sm:text-[10px] text-neutral-400 leading-relaxed">
                    Zamonaviy muhit va yoqimli musiqa siz uchun.
                  </p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#e5c567] mt-2 sm:mt-3">05</span>
              </div>

              <div className="bg-[#141417]/90 border border-[#23232A] rounded-xl p-3 sm:p-5 text-center flex flex-col items-center justify-between min-h-[170px] sm:min-h-[190px] hover:border-[#e5c567]/40 transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e5c567]/10 border border-[#e5c567]/20 flex items-center justify-center mb-2">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#e5c567]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-white mb-1">Maxsus tadbirlar</h4>
                  <p className="text-[9px] sm:text-[10px] text-neutral-400 leading-relaxed">
                    Tug'ilgan kun, yubiley va boshqa tadbirlar uchun.
                  </p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#e5c567] mt-2 sm:mt-3">06</span>
              </div>

            </div>

          </div>
        </div>
      </Container>

      <Container className="mt-6">
        <div className="bg-[#0A0A0B] border border-[#1E1E24] rounded-2xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xl">
          
          <div className="md:col-span-5 h-36 sm:h-28 rounded-xl overflow-hidden border border-[#23232A]">
            <img 
              src={Cabina}
              alt="Restaurant ambiance" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-3">
            <h3 className="text-base font-semibold text-white mb-1">
              Yordam kerakmi?
            </h3>
            <p className="text-xs text-neutral-400">
              Biz sizga yordam berishga tayyormiz.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row items-start sm:items-center justify-start md:justify-end gap-5">
            <a href="tel:+998901234567" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#e5c567]/10 border border-[#e5c567]/20 flex items-center justify-center shrink-0 group-hover:bg-[#e5c567]/20 transition">
                <Phone className="w-4 h-4 text-[#e5c567]" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white group-hover:text-[#e5c567] transition">
                  +998 90 123 45 67
                </span>
                <span className="text-[10px] text-neutral-400">
                  Har kuni 10:00 – 23:00
                </span>
              </div>
            </a>

            <a href="https://wa.me/998901234567" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#e5c567]/10 border border-[#e5c567]/20 flex items-center justify-center shrink-0 group-hover:bg-[#e5c567]/20 transition">
                <MessageCircle className="w-4 h-4 text-[#e5c567]" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white group-hover:text-[#e5c567] transition">
                  WhatsApp
                </span>
                <span className="text-[10px] text-neutral-400">
                  Tezkor javob beramiz
                </span>
              </div>
            </a>
          </div>

        </div>
      </Container>

    </div>
  );
};

export default ReservationPage;