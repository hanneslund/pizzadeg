export default function log(level: "info" | "warning" | "error", msg: any) {
  if (typeof window === "undefined") return;
  const headers = {
    type: "application/json",
  };
  let blob = new Blob([JSON.stringify(msg)], headers);
  navigator.sendBeacon(`/api/log/${level}`, blob);
}
