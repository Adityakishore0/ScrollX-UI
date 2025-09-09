import { Status } from "@/components/ui/status";

export default function StatusIndicatorDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Status status="online" statusindicator>
          Online
        </Status>
        <Status status="busy" statusindicator>
          Busy
        </Status>
        <Status status="away" statusindicator>
          Away
        </Status>
      </div>
      <div className="flex gap-3">
        <Status status="error" statusindicator>
          Service Outage
        </Status>
        <Status status="success" statusindicator>
          All Systems Operational
        </Status>
      </div>
    </div>
  );
}
