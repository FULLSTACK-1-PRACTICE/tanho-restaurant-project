import { Thumb } from '../../../components/ui/Thumb/Thumb';

export interface Food {
    id?: number | string;
    name: string;
    image: string;
    price?: number;
    category?: string;
}

interface PopularFoodsProps {
    foods: Food[];
}

export function PopularFoods({ foods }: PopularFoodsProps) {
    const popular = [
        { name: 'Kaboblar lag‘mon', qty: 45, image: 'amber' },
        { name: 'Mix pizza', qty: 38, image: 'orange' },
        { name: 'Cheeseburger', qty: 32, image: 'orange' },
        { name: 'Caesar salat', qty: 28, image: 'emerald' },
        { name: 'Tandir somsa', qty: 24, image: 'amber' },
    ];

    const max = Math.max(...popular.map(item => item.qty));

    return (
        <div className='bg-[#111113] border border-white/5 rounded-2xl p-4 md:p-5'>
            <h3 className='font-semibold text-white mb-3'>
                Eng ko‘p buyurtma qilingan taomlar
            </h3>

            <div className='space-y-3.5'>
                {popular.map(item => {
                    const matched = foods.find(food =>
                        food.name
                            .toLowerCase()
                            .includes(item.name.split(' ')[0].toLowerCase())
                    );

                    return (
                        <div key={item.name} className='flex items-center gap-3'>
                            <Thumb style={matched?.image || item.image} size={36} />

                            <div className='flex-1 min-w-0'>
                                <div className='flex items-center justify-between mb-1'>
                                    <span className='text-sm text-gray-200 truncate'>
                                        {item.name}
                                    </span>

                                    <span className='text-xs text-gray-500 shrink-0 ml-2'>
                                        {item.qty} ta
                                    </span>
                                </div>

                                <div className='h-1.5 w-full rounded-full bg-white/5 overflow-hidden'>
                                    <div
                                        className='h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400'
                                        style={{
                                            width: `${(item.qty / max) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}