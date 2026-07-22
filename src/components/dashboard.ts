export function animateCounter(element: HTMLElement, targetValue: number): void {
  let currentValue = 0;
  const duration = 1200; // ms
  const stepTime = Math.abs(Math.floor(duration / targetValue));
  const delay = isNaN(stepTime) || stepTime < 10 ? 15 : stepTime;

  const timer = setInterval(() => {
    currentValue += 1;
    element.textContent = currentValue.toString();
    if (currentValue >= targetValue) {
      element.textContent = targetValue.toString();
      clearInterval(timer);
    }
  }, delay);
}

export function updateDashboardStats(
  statTotal: HTMLElement,
  statRegional: HTMLElement,
  statProvincial: HTMLElement,
  statRegions: HTMLElement
): void {
  const total = 59;
  const regionalCount = 5;
  const provincialCount = 54;
  const regionsCovered = 18;

  animateCounter(statTotal, total);
  animateCounter(statRegional, regionalCount);
  animateCounter(statProvincial, provincialCount);
  animateCounter(statRegions, regionsCovered);
}
