import { Status } from "@/components/ui/status";

export default function StatusShinyDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Status status="success" shiny>
        Processing
      </Status>
      <Status status="pending" shiny shinySpeed={2}>
        Fast Shine
      </Status>
      <Status status="info" shiny statusindicator>
        Shiny with Dot
      </Status>
    </div>
  );
}
