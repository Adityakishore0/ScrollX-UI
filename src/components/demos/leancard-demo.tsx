import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LeanCard, LeanCardContent } from '@/components/ui/lean-card';

export default function LeanCardDemo() {
  return (
    <LeanCard className='w-full max-w-sm'>
      <LeanCardContent className='flex flex-col gap-4'>
        <svg
          className='size-6'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M32.0001 13.3845C32.0001 13.4072 32 13.4298 31.9998 13.4524V27.5382H31.975C31.6622 23.7478 29.4868 20.7691 24.6157 20.7691C20.5374 20.7691 17.2311 17.4629 17.2311 13.3845C17.2311 9.30617 20.5372 6 24.6156 6C28.6939 6 32.0001 9.30617 32.0001 13.3845Z'
            fill='currentColor'
          />
          <path
            d='M7.38449 20.7691C12.245 20.781 14.4316 23.7554 14.7437 27.5382H14.7692V13.3845C14.7692 9.30616 11.4628 6.00001 7.38449 6.00001C3.30615 6.00001 0 9.30618 0 13.3845C0 17.4629 3.30615 20.7691 7.38449 20.7691Z'
            fill='currentColor'
          />
        </svg>

        <p className='text-sm leading-relaxed'>
          Switching to ScrollX UI has been exclusively positive! The component
          library is beautifully crafted, and the design system has brought
          consistency and speed to everything we ship.
        </p>

        <footer className='flex items-center gap-3'>
          <Avatar className='size-12 rounded-xl border border-foreground/10 bg-green-50'>
            <AvatarImage
              src='https://cdn.pixabay.com/photo/2023/06/26/04/38/ai-generated-8088680_1280.jpg'
              alt='Lynlyn Warp'
            />
            <AvatarFallback className='rounded-xl bg-green-50 text-xs font-medium'>
              LW
            </AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium'>Lynlyn Warp</p>
            <p className='text-sm text-muted-foreground'>
              Head of HR, Practicality
            </p>
          </div>
        </footer>
      </LeanCardContent>
    </LeanCard>
  );
}
