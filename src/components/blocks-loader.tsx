export default function BlocksLoader() {
  return (
    <div className='flex items-center justify-center space-x-2 p-2'>
      <div className='h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent dark:border-white dark:border-t-black' />
      <span className='text-sm whitespace-nowrap'>Loading...</span>
    </div>
  );
}
