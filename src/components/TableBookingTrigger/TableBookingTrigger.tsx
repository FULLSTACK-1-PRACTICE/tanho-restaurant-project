import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useRestaurant } from "../../context/RestaurantContext";

interface TableBookingTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Saytdagi barcha "Stol band qilish" tugmalari uchun umumiy komponent.
 * Original tugmaning className/children'i saqlanadi, faqat onClick
 * global rezervatsiya oynasini (ReserveTableModal) ochadi.
 */
export default function TableBookingTrigger({ children, className, ...rest }: TableBookingTriggerProps) {
  const { openReserveModal } = useRestaurant();
  return (
    <button type="button" className={className} onClick={openReserveModal} {...rest}>
      {children}
    </button>
  );
}