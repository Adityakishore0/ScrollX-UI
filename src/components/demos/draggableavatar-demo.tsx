import DraggableAvatar from '@/components/ui/draggable-avatar';

export default function DraggableAvatarDemo() {
  return (
    <div className='flex items-center justify-center p-8'>
      <div className='relative'>
        <h1 className='bg-clip-text text-transparent text-center bg-linear-to-b from-neutral-900 to-white dark:from-white dark:to-neutral-700 text-2xl select-none md:text-4xl font-bold leading-tight'>
          Knowledge at
          <br />
          Your Fingertip
        </h1>

        <div className='absolute -top-17.5 -left-17.5'>
          <DraggableAvatar
            image='https://cdn.pixabay.com/photo/2023/06/26/04/38/ai-generated-8088680_1280.jpg'
            borderColor='#60A5FA'
            range={200}
            size={70}
          />
        </div>
      </div>
    </div>
  );
}
