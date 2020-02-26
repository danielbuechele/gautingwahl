const STORAGE_KEY = "device";

export default function log(event: string, data?: Object) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  let device = localStorage.getItem(STORAGE_KEY);
  if (device === null) {
    device = Math.random().toString(36);
    localStorage.setItem(STORAGE_KEY, device);
  }
  fetch("https://log.gautingwahl.de", {
    method: "POST",
    body: JSON.stringify({
      event,
      device,
      location: window.location.pathname,
      userAgent: navigator.userAgent,
      screenSize: [window.innerWidth, window.innerHeight],
      ...data
    })
  });
}
