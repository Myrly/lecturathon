export function logac(action: string, details: {} = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    action: action,
    details: details,
  }

  const logs = JSON.parse(localStorage.getItem("logs") || "[]")
  logs.push(entry)
  localStorage.setItem("logs", JSON.stringify(logs))
}