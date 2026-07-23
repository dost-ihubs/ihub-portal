import type { Region } from "../types";

interface InfoOverlayProps {
  visible: boolean;
  label: string;
  count: number;
  regionInfo: Region | undefined;
}

export default function InfoOverlay({ visible, label, count, regionInfo }: InfoOverlayProps) {
  return (
    <div
      className={
        "info-overlay absolute bottom-4 left-4 z-10 w-72 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-glass border border-slate-200 text-slate-800 transition-all duration-300 " +
        (visible ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-2")
      }
      aria-live="polite"
    >
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
        <div className="font-title text-base font-extrabold text-brand-blue">{label}</div>
        <div className="px-2.5 py-0.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center gap-1">
          <span className="font-title text-sm font-bold text-brand-blue">{count}</span>
          <span className="text-[10px] uppercase font-semibold text-slate-500">iHubs</span>
        </div>
      </div>
      <div className="text-xs space-y-1">
        <Row label="Focal Person:" value={regionInfo?.focal_person} />
        <Row label="Position:" value={regionInfo?.position} />
        <Row label="Contact No:" value={regionInfo?.contact_number} />
        <Row label="Email:" value={regionInfo?.email} last />
      </div>
    </div>
  );
}

function Row({ label, value, last = false }: { label: string; value?: string; last?: boolean }) {
  return (
    <div className={"flex justify-between gap-4 text-xs py-1" + (last ? "" : " border-b border-slate-100")}>
      <span className="font-medium text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800 truncate">{value || "N/A"}</span>
    </div>
  );
}
