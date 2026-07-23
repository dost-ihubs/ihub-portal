import type { IHub } from "../types";

interface IHubModalProps {
  hub: IHub | null;
  onClose: () => void;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80";

export default function IHubModal({ hub, onClose }: IHubModalProps) {
  const visible = hub !== null;

  return (
    <div
      className={
        "ihub-modal-overlay fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 " +
        (visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
      }
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative transform transition-all duration-300 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-slate-900/60 hover:bg-slate-900 text-white rounded-full transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {hub && (
          <>
            <img
              className="w-full h-48 object-cover"
              src={hub.image_url || FALLBACK_IMAGE}
              alt={hub.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <h2 className="font-title text-xl font-black text-slate-900 leading-snug">{hub.name}</h2>
                <p className="text-xs text-slate-500 mt-1">{hub.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                <Field label="Launch Date" value={hub.launch_date} />
                <Field label="Focal Person" value={hub.focal_person} />
                <Field label="Contact Number" value={hub.contact_number} />
                <Field label="Email Address" value={hub.email} truncate />
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-2 text-xs">
                <Field label="Internet Connectivity Status" value={hub.connectivity_status} block />
                <Field label="Internet Service Provider" value={hub.isp} block />
                <Field label="ICT-related assistance needed" value={hub.ict_assistance} block />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  truncate = false,
  block = false,
}: {
  label: string;
  value?: string;
  truncate?: boolean;
  block?: boolean;
}) {
  return (
    <div className={block ? "" : undefined}>
      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className={"font-semibold text-slate-800" + (truncate ? " truncate block" : "")}>{value || "N/A"}</span>
    </div>
  );
}
