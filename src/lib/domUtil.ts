export const getElement = <T extends HTMLElement>(from: T | string | null | undefined) => {
  if (!from) return null
  if (from instanceof HTMLElement) return from
  return document.querySelector<T>(from)
}
