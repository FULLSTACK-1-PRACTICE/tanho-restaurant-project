import { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
    maxWidth?: string;
}

export function Modal({ title, onClose, children, maxWidth = 'max-w-md' }: ModalProps) {
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className='fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'>
            <div
                className={`w-full ${maxWidth} bg-[#141416] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 max-h-[90vh] overflow-y-auto`}
            >
                <div className='flex items-center justify-between px-5 py-4 border-b border-white/10 sticky top-0 bg-[#141416] rounded-t-2xl'>
                    <h3 className='text-base font-semibold text-white'>{title}</h3>

                    <button
                        onClick={onClose}
                        className='w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors'
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className='p-5'>{children}</div>
            </div>
        </div>
    );
}

export function FieldLabel({ children }: { children: ReactNode }) {
    return (
        <label className='block text-xs font-medium text-gray-400 mb-1.5'>
            {children}
        </label>
    );
}

export const inputClass =
    'w-full bg-[#0e0e10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/50 transition-colors';