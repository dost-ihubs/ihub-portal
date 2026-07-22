import type { IHub } from "../types";

export function openIHubModal(hub: IHub | undefined): void {
  if (!hub) return;

  const overlay = document.getElementById("ihub-modal-overlay");
  const img = document.getElementById("ihub-modal-img") as HTMLImageElement;
  const title = document.getElementById("ihub-modal-title");
  const address = document.getElementById("ihub-modal-address");
  const launchDate = document.getElementById("ihub-modal-launch-date");
  const focal = document.getElementById("ihub-modal-focal");
  const contact = document.getElementById("ihub-modal-contact");
  const email = document.getElementById("ihub-modal-email");
  const connectivity = document.getElementById("ihub-modal-connectivity");
  const isp = document.getElementById("ihub-modal-isp");
  const ict = document.getElementById("ihub-modal-ict");

  if (img) {
    img.src = hub.image_url || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80";
    img.alt = hub.name;
  }
  if (title) title.textContent = hub.name;
  if (address) address.textContent = hub.address;
  if (launchDate) launchDate.textContent = hub.launch_date || "N/A";
  if (focal) focal.textContent = hub.focal_person || "N/A";
  if (contact) contact.textContent = hub.contact_number || "N/A";
  if (email) email.textContent = hub.email || "N/A";
  if (connectivity) connectivity.textContent = hub.connectivity_status || "N/A";
  if (isp) isp.textContent = hub.isp || "N/A";
  if (ict) ict.textContent = hub.ict_assistance || "N/A";

  if (overlay) {
    overlay.classList.add("visible");
  }
}

export function closeIHubModal(): void {
  const overlay = document.getElementById("ihub-modal-overlay");
  if (overlay) {
    overlay.classList.remove("visible");
  }
}
