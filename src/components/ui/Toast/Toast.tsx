import { useEffect } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
    message: string;
    onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 2600);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className='fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-lg bg-[#1a1a1e] border border-white/10 px-4 py-3 shadow-2xl shadow-black/50'>
            <div className='w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center'>
                <Check size={14} className='text-emerald-400' />
            </div>
            <span className='text-sm text-gray-200'>{message}</span>
        </div>
    );
}