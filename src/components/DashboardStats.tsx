import { useEffect, useState } from "react";

// Same easing/timing behavior as the original animateCounter() in dashboard.ts,
// just driven by React state instead of directly mutating a DOM node.
function useAnimatedCounter(targetValue: number): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1200;
    const stepTime = Math.abs(Math.floor(duration / targetValue));
    const delay = isNaN(stepTime) || stepTime < 10 ? 15 : stepTime;

    const timer = setInterval(() => {
      current += 1;
      setValue(current);
      if (current >= targetValue) {
        setValue(targetValue);
        clearInterval(timer);
      }
    }, delay);

    return () => clearInterval(timer);
  }, [targetValue]);

  return value;
}

interface DashboardStatsProps {
  total: number;
  regional: number;
  provincial: number;
  regionsCovered: number;
}

export default function DashboardStats({ total, regional, provincial, regionsCovered }: DashboardStatsProps) {
  const totalCount = useAnimatedCounter(total);
  const regionalCount = useAnimatedCounter(regional);
  const provincialCount = useAnimatedCounter(provincial);
  const regionsCount = useAnimatedCounter(regionsCovered);

  return (
    <section className="overlay-dashboard" aria-label="National Statistics Dashboard">
      <h2 className="font-poppins text-lg font-bold text-blue-900 mb-2">Current iHub Network</h2>
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="font-poppins block text-xs text-slate-500 font-medium mb-0.5">Total iHubs</span>
          <span className="font-poppins text-2xl font-black text-sky-500">{totalCount}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="font-poppins block text-xs text-slate-500 font-medium mb-0.5">Regional</span>
          <span className="font-poppins text-2xl font-black text-sky-500">{regionalCount}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="font-poppins block text-xs text-slate-500 font-medium mb-0.5">Provincial</span>
          <span className="font-poppins text-2xl font-black text-sky-500">{provincialCount}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="font-poppins block text-xs text-slate-500 font-medium mb-0.5">Regions</span>
          <span className="font-poppins text-2xl font-black text-sky-500">{regionsCount}</span>
        </div>
      </div>
    </section>
  );
}
