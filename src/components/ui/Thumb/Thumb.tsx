import { ChefHat } from 'lucide-react';
import { IMAGE_STYLES } from '../../../data/foodsData';

interface ThumbProps {
    style: string;
    size?: number;
}

export function Thumb({ style, size = 40 }: ThumbProps) {
    const found = IMAGE_STYLES.find(s => s.id === style) || IMAGE_STYLES[0];

    return (
        <div
            className='rounded-lg flex items-center justify-center shrink-0 ring-1 ring-white/10'
            style={{
                width: size,
                height: size,
                background: `linear-gradient(135deg, ${found.from}, ${found.to})`,
            }}
        >
            <ChefHat
                size={Math.round(size * 0.5)}
                className='text-white/90'
                strokeWidth={1.75}
            />
        </div>
    );
}