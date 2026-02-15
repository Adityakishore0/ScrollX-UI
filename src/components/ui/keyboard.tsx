import {
  SunDim,
  Sun,
  Table,
  Search,
  Mic,
  Moon,
  Rewind,
  SkipForward,
  FastForward,
  Volume2,
  Volume1,
  VolumeX,
  Globe,
  ChevronUp,
  Command,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface KeyboardProps {
  className?: string;
  containerClassName?: string;
  showWASD?: boolean;
  wasdColorClassName?: string;
  wasdKeyShadowClassName?: string;
  textClassName?: string;
  keyShadowClassName?: string;
}

interface KeyProps {
  label?: string;
  secondaryLabel?: string;
  width?: string;
  height?: string;
  shadowColor?: string;
  keyShadowClassName?: string;
  content?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  textClassName?: string;
}

const Key = ({
  label,
  secondaryLabel,
  width = 'w-6',
  height = 'h-6',
  shadowColor,
  keyShadowClassName,
  content,
  className = '',
  icon,
  textClassName,
}: KeyProps) => {
  return (
    <div
      className={cn(
        'p-[0.5px] rounded-[4px] bg-black/20 dark:bg-white/20 shadow-md hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100',
        shadowColor ||
          keyShadowClassName ||
          'shadow-black/50 dark:shadow-white/50',
        className,
      )}
    >
      <div
        className={cn(
          height,
          width,
          'bg-white dark:bg-[#0A090D] rounded-[3.5px] flex items-center justify-center',
          'shadow-[inset_0_-0.5px_2px_0_rgba(240,240,240,1),inset_-0.5px_0_2px_0_rgba(240,240,240,1)]',
          'dark:shadow-[inset_0_-0.5px_2px_0_rgba(13,13,15,1),inset_-0.5px_0_2px_0_rgba(13,13,15,1)]',
        )}
      >
        {content || (
          <div
            className={cn(
              'text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-foreground',
              textClassName,
            )}
          >
            {icon && <span className='block'>{icon}</span>}
            {secondaryLabel && <span className='block'>{secondaryLabel}</span>}
            {label && <span className='block'>{label}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

const ModifierKey = ({
  label,
  width,
  align = 'center',
  icon,
  textClassName,
  keyShadowClassName,
}: {
  label: string;
  width: string;
  align?: 'start' | 'end' | 'center';
  icon?: React.ReactNode;
  textClassName?: string;
  keyShadowClassName?: string;
}) => {
  const alignClasses = {
    start: 'items-start pl-1',
    end: 'items-end pr-1',
    center: 'items-center',
  };

  return (
    <Key
      width={width}
      keyShadowClassName={keyShadowClassName}
      content={
        <div
          className={cn(
            'text-[5px] w-full flex justify-center flex-col pb-0.5 text-foreground',
            alignClasses[align],
            textClassName,
          )}
        >
          {icon && <span className='block mb-0.5'>{icon}</span>}
          {label}
        </div>
      }
    />
  );
};

const DualLabelKey = ({
  main,
  sub,
  shadowColor,
  textClassName,
  keyShadowClassName,
}: {
  main: string;
  sub: string;
  shadowColor?: string;
  textClassName?: string;
  keyShadowClassName?: string;
}) => {
  return (
    <Key
      label={main}
      secondaryLabel={sub}
      shadowColor={shadowColor}
      textClassName={textClassName}
      keyShadowClassName={keyShadowClassName}
    />
  );
};

const FunctionKey = ({
  label,
  icon,
  textClassName,
  keyShadowClassName,
}: {
  label: string;
  icon: React.ReactNode;
  textClassName?: string;
  keyShadowClassName?: string;
}) => {
  return (
    <Key
      keyShadowClassName={keyShadowClassName}
      content={
        <div
          className={cn(
            'text-[5px] w-full flex justify-center items-center flex-col h-full leading-none gap-[0.38rem] text-foreground',
            textClassName,
          )}
        >
          <span className='block'>{icon}</span>
          <span className='block'>{label}</span>
        </div>
      }
    />
  );
};

const CommandKey = ({
  textClassName,
  keyShadowClassName,
}: {
  textClassName?: string;
  keyShadowClassName?: string;
}) => {
  return (
    <Key
      width='w-8'
      keyShadowClassName={keyShadowClassName}
      content={
        <div
          className={cn(
            'text-[5px] w-full flex items-center flex-col h-full justify-between py-1 text-foreground',
            textClassName,
          )}
        >
          <div className='flex justify-end w-full pr-1'>
            <Command className='h-1.5 w-1.5' />
          </div>
          <div className='flex justify-start w-full pl-1'>
            <span className='block'>command</span>
          </div>
        </div>
      }
    />
  );
};

const ArrowKey = ({
  direction,
  className,
  textClassName,
  keyShadowClassName,
}: {
  direction: 'up' | 'down' | 'left' | 'right';
  className?: string;
  textClassName?: string;
  keyShadowClassName?: string;
}) => {
  const icons = {
    up: <ChevronUp className='h-1.5 w-1.5' />,
    down: <ChevronDown className='h-1.5 w-1.5' />,
    left: <ChevronLeft className='h-1.5 w-1.5' />,
    right: <ChevronRight className='h-1.5 w-1.5' />,
  };

  return (
    <div
      className={cn(
        'p-[0.5px] rounded-[4px] bg-black/20 dark:bg-white/20 shadow-md hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100',
        keyShadowClassName || 'shadow-black/50 dark:shadow-white/50',
      )}
    >
      <div
        className={cn(
          'bg-white dark:bg-[#0A090D] rounded-[3.5px] flex items-center justify-center w-6 h-3',
          'shadow-[inset_0_-0.5px_2px_0_rgba(240,240,240,1),inset_-0.5px_0_2px_0_rgba(240,240,240,1)]',
          'dark:shadow-[inset_0_-0.5px_2px_0_rgba(13,13,15,1),inset_-0.5px_0_2px_0_rgba(13,13,15,1)]',
          className,
        )}
      >
        <div
          className={cn(
            'text-[5px] w-full flex justify-center items-center flex-col text-foreground',
            textClassName,
          )}
        >
          {icons[direction]}
        </div>
      </div>
    </div>
  );
};

const OptionKey = ({ className }: { className?: string }) => {
  return (
    <svg
      fill='none'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      className={className}
    >
      <rect
        stroke='currentColor'
        strokeWidth={2}
        x='18'
        y='5'
        width='10'
        height='2'
      />
      <polygon
        stroke='currentColor'
        strokeWidth={2}
        points='10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25'
      />
    </svg>
  );
};

const Keyboard = ({
  className,
  containerClassName,
  showWASD = false,
  wasdColorClassName,
  wasdKeyShadowClassName,
  textClassName,
  keyShadowClassName,
}: KeyboardProps) => {
  const functionKeys = [
    { label: 'F1', icon: <SunDim className='h-1.5 w-1.5' /> },
    { label: 'F2', icon: <Sun className='h-1.5 w-1.5' /> },
    { label: 'F3', icon: <Table className='h-1.5 w-1.5' /> },
    { label: 'F4', icon: <Search className='h-1.5 w-1.5' /> },
    { label: 'F5', icon: <Mic className='h-1.5 w-1.5' /> },
    { label: 'F6', icon: <Moon className='h-1.5 w-1.5' /> },
    { label: 'F7', icon: <Rewind className='h-1.5 w-1.5' /> },
    { label: 'F8', icon: <SkipForward className='h-1.5 w-1.5' /> },
    { label: 'F9', icon: <FastForward className='h-1.5 w-1.5' /> },
    { label: 'F10', icon: <VolumeX className='h-1.5 w-1.5' /> },
    { label: 'F11', icon: <Volume1 className='h-1.5 w-1.5' /> },
    { label: 'F12', icon: <Volume2 className='h-1.5 w-1.5' /> },
  ];

  const numberRow = [
    { main: '`', sub: '~' },
    { main: '1', sub: '!' },
    { main: '2', sub: '@' },
    { main: '3', sub: '#' },
    { main: '4', sub: '$' },
    { main: '5', sub: '%' },
    { main: '6', sub: '^' },
    { main: '7', sub: '&' },
    { main: '8', sub: '*' },
    { main: '9', sub: '(' },
    { main: '0', sub: ')' },
    { main: '-', sub: '_' },
    { main: '=', sub: '+' },
  ];

  const qwertyRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const qwertySpecial = [
    { main: '[', sub: '{' },
    { main: ']', sub: '}' },
    { main: '\\', sub: '|' },
  ];

  const asdfRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const asdfSpecial = [
    { main: ';', sub: ':' },
    { main: "'", sub: '"' },
  ];

  const zxcvRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  const zxcvSpecial = [
    { main: ',', sub: '<' },
    { main: '.', sub: '>' },
    { main: '/', sub: '?' },
  ];

  return (
    <div
      className={cn(
        'bg-background select-none flex items-center justify-center p-4',
        containerClassName,
      )}
    >
      <div
        className={cn(
          'rounded-md bg-neutral-200 dark:bg-zinc-800 p-1 scale-[0.8] sm:scale-100 md:scale-125 lg:scale-150 w-fit h-fit mx-auto',
          className,
        )}
      >
        <div className='flex gap-0.5 mb-0.5 w-full shrink-0'>
          <ModifierKey
            label='esc'
            width='w-10'
            align='start'
            textClassName={textClassName}
            keyShadowClassName={keyShadowClassName}
          />

          {functionKeys.map((key) => (
            <FunctionKey
              key={key.label}
              label={key.label}
              icon={key.icon}
              textClassName={textClassName}
              keyShadowClassName={keyShadowClassName}
            />
          ))}

          <Key
            keyShadowClassName={keyShadowClassName}
            content={
              <div className='text-[5px] w-full flex justify-center items-center flex-col text-foreground'>
                <div className='h-4 w-4 rounded-full bg-linear-to-b from-20% from-neutral-300 dark:from-neutral-900 via-neutral-200 dark:via-black via-50% to-neutral-300 dark:to-neutral-900 to-95% p-px'>
                  <div className='bg-neutral-100 dark:bg-black h-full w-full rounded-full'></div>
                </div>
              </div>
            }
          />
        </div>

        <div className='flex gap-0.5 mb-0.5 w-full shrink-0'>
          {numberRow.map((key, idx) => (
            <DualLabelKey
              key={idx}
              main={key.main}
              sub={key.sub}
              textClassName={textClassName}
              keyShadowClassName={keyShadowClassName}
            />
          ))}
          <ModifierKey
            label='delete'
            width='w-10'
            align='end'
            textClassName={textClassName}
            keyShadowClassName={keyShadowClassName}
          />
        </div>

        <div className='flex gap-0.5 mb-0.5 w-full shrink-0'>
          <ModifierKey
            label='tab'
            width='w-10'
            align='start'
            textClassName={textClassName}
            keyShadowClassName={keyShadowClassName}
          />

          {qwertyRow.map((letter) => (
            <Key
              key={letter}
              label={letter}
              shadowColor={
                showWASD && letter === 'W' ? wasdKeyShadowClassName : undefined
              }
              keyShadowClassName={keyShadowClassName}
              textClassName={
                showWASD && letter === 'W'
                  ? cn(textClassName, wasdColorClassName)
                  : textClassName
              }
            />
          ))}

          {qwertySpecial.map((key, idx) => (
            <DualLabelKey
              key={idx}
              main={key.main}
              sub={key.sub}
              textClassName={textClassName}
              keyShadowClassName={keyShadowClassName}
            />
          ))}
        </div>

        <div className='flex gap-0.5 mb-0.5 w-full shrink-0'>
          <ModifierKey
            label='caps lock'
            width='w-[2.8rem]'
            align='start'
            textClassName={textClassName}
            keyShadowClassName={keyShadowClassName}
          />

          {asdfRow.map((letter) => (
            <Key
              key={letter}
              label={letter}
              shadowColor={
                showWASD && ['A', 'S', 'D'].includes(letter)
                  ? wasdKeyShadowClassName
                  : undefined
              }
              keyShadowClassName={keyShadowClassName}
              textClassName={
                showWASD && ['A', 'S', 'D'].includes(letter)
                  ? cn(textClassName, wasdColorClassName)
                  : textClassName
              }
            />
          ))}

          {asdfSpecial.map((key, idx) => (
            <DualLabelKey
              key={idx}
              main={key.main}
              sub={key.sub}
              textClassName={textClassName}
              keyShadowClassName={keyShadowClassName}
            />
          ))}

          <ModifierKey
            label='return'
            width='w-[2.85rem]'
            align='end'
            textClassName={textClassName}
            keyShadowClassName={keyShadowClassName}
          />
        </div>

        <div className='flex gap-0.5 mb-0.5 w-full shrink-0'>
          <ModifierKey
            label='shift'
            width='w-[3.65rem]'
            textClassName={textClassName}
            keyShadowClassName={keyShadowClassName}
          />

          {zxcvRow.map((letter) => (
            <Key
              key={letter}
              label={letter}
              textClassName={textClassName}
              keyShadowClassName={keyShadowClassName}
            />
          ))}

          {zxcvSpecial.map((key, idx) => (
            <DualLabelKey
              key={idx}
              main={key.main}
              sub={key.sub}
              textClassName={textClassName}
              keyShadowClassName={keyShadowClassName}
            />
          ))}

          <ModifierKey
            label='shift'
            width='w-[3.65rem]'
            textClassName={textClassName}
            keyShadowClassName={keyShadowClassName}
          />
        </div>

        <div className='flex gap-0.5 mb-0.5 w-full shrink-0'>
          <Key
            height='h-7'
            width='w-7'
            keyShadowClassName={keyShadowClassName}
            content={
              <div
                className={cn(
                  'text-[5px] w-full flex items-center flex-col h-full justify-between py-1 text-foreground',
                  textClassName,
                )}
              >
                <div className='flex justify-start w-full pl-1'>
                  <Globe className='h-1.25 w-1.25' />
                </div>
                <div className='flex justify-center w-full pr-1'>
                  <span className='block'>fn</span>
                </div>
              </div>
            }
          />

          <Key
            width='w-6'
            height='h-6'
            keyShadowClassName={keyShadowClassName}
            content={
              <div
                className={cn(
                  'text-[5px] w-full flex items-center flex-col h-full justify-between py-1 text-foreground',
                  textClassName,
                )}
              >
                <div className='flex justify-end w-full pr-1'>
                  <ChevronUp className='h-1.5 w-1.5' />
                </div>
                <div className='flex justify-start w-full pl-1'>
                  <span className='block'>control</span>
                </div>
              </div>
            }
          />

          <Key
            width='w-6'
            height='h-6'
            keyShadowClassName={keyShadowClassName}
            content={
              <div
                className={cn(
                  'text-[5px] w-full flex items-center flex-col h-full justify-between py-1 text-foreground',
                  textClassName,
                )}
              >
                <div className='flex justify-end w-full pr-1'>
                  <OptionKey className='h-1.5 w-1.5' />
                </div>
                <div className='flex justify-start w-full pl-1'>
                  <span className='block'>option</span>
                </div>
              </div>
            }
          />

          <CommandKey
            textClassName={textClassName}
            keyShadowClassName={keyShadowClassName}
          />

          <Key
            width='w-[8.2rem]'
            keyShadowClassName={keyShadowClassName}
            content={
              <div
                className={cn(
                  'text-[0.4rem] w-full flex justify-center items-center flex-col text-foreground',
                  textClassName,
                )}
              >
                <span className='block font-bold'>ScrollX UI</span>
              </div>
            }
          />

          <CommandKey
            textClassName={textClassName}
            keyShadowClassName={keyShadowClassName}
          />

          <Key
            width='w-6'
            height='h-6'
            keyShadowClassName={keyShadowClassName}
            content={
              <div
                className={cn(
                  'text-[5px] w-full flex items-center flex-col h-full justify-between py-1 text-foreground',
                  textClassName,
                )}
              >
                <div className='flex justify-end w-full pr-1'>
                  <OptionKey className='h-1.5 w-1.5' />
                </div>
                <div className='flex justify-start w-full pl-1'>
                  <span className='block'>option</span>
                </div>
              </div>
            }
          />

          <div className='w-[4.9rem] mt-0.5 h-6 p-[0.5px] rounded-[4px] flex flex-col justify-end items-center'>
            <ArrowKey
              direction='up'
              textClassName={textClassName}
              keyShadowClassName={keyShadowClassName}
            />
            <div className='flex'>
              <ArrowKey
                direction='left'
                textClassName={textClassName}
                keyShadowClassName={keyShadowClassName}
              />
              <ArrowKey
                direction='down'
                textClassName={textClassName}
                keyShadowClassName={keyShadowClassName}
              />
              <ArrowKey
                direction='right'
                textClassName={textClassName}
                keyShadowClassName={keyShadowClassName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Keyboard };
