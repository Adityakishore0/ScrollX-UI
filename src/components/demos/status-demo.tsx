import { Status } from "@/components/ui/status";

export default function StatusDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Status status="online">Online</Status>
        <Status status="offline">Offline</Status>
        <Status status="away">Away</Status>
      </div>
      <div className="flex gap-3">
        <Status status="info">Info</Status>
        <Status status="warning">Warning</Status>
        <Status status="idle">Idle</Status>
      </div>
      <div className="flex gap-3">
        <Status status="error">Error</Status>
        <Status status="pending">Pending</Status>
        <Status status="success">Success</Status>
      </div>
      <div className="flex gap-3">
        <Status status="error">Error</Status>
        <Status status="busy">Busy</Status>
        <Status status="online">Online</Status>
      </div>
    </div>
  );
}
