import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="cool">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="premium" id="r1" />
        <Label direction="right" htmlFor="r1">
          Premium
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="cool" id="r2" />
        <Label direction="right" htmlFor="r2">
          Cool
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="creative" id="r3" />
        <Label direction="right" htmlFor="r3">
          Creative
        </Label>
      </div>
    </RadioGroup>
  );
}
