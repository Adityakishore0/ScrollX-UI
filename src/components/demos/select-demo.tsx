import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className='w-full max-w-48'>
        <SelectValue placeholder='Choose a plan' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subscription Plans</SelectLabel>
          <SelectItem value='free'>Free</SelectItem>
          <SelectItem value='starter'>Starter</SelectItem>
          <SelectItem value='pro'>Pro</SelectItem>
          <SelectItem value='business'>Business</SelectItem>
          <SelectItem value='enterprise'>Enterprise</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
