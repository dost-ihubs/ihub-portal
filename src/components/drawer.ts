export function openConfigDrawer(
  configDrawer: HTMLElement,
  drawerBackdrop: HTMLElement,
  txtSheetId: HTMLInputElement,
  currentSheetId: string,
  clearStatusFn: () => void
): void {
  configDrawer.classList.add("open");
  drawerBackdrop.classList.add("visible");
  txtSheetId.value = currentSheetId;
  clearStatusFn();
}

export function closeConfigDrawer(
  configDrawer: HTMLElement,
  drawerBackdrop: HTMLElement
): void {
  configDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("visible");
}

export function showConfigStatus(
  statusEl: HTMLElement,
  message: string,
  type: "warning" | "success" | "error"
): void {
  statusEl.className = `config-status ${type}`;
  statusEl.innerHTML = `<span>${message}</span>`;
  statusEl.style.display = "block";
}

export function clearConfigStatus(statusEl: HTMLElement): void {
  statusEl.style.display = "none";
}
