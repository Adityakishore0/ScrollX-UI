import { Keyboard } from '@/components/ui/keyboard';

export default function KeyboardDemo() {
  return (
    <Keyboard
      showWASD={true}
      wasdColorClassName='text-green-500'
      wasdKeyShadowClassName='shadow-green-500'
    />
  );
}
