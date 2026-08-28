// Firebase o'rnini vaqtincha bosuvchi oddiy baza (localStorage asosida).
// Backend API tayyor bo'lgach, shu faylni real fetch/axios so'rovlariga
// almashtirish kifoya — boshqa fayllar faqat shu yerdagi funksiyalarni chaqiradi.

type Listener = () => void;
const listeners: Record<string, Set<Listener>> = {};

function notify(key: string) {
  listeners[key]?.forEach((cb) => cb());
}

function subscribe(key: string, cb: Listener) {
  if (!listeners[key]) listeners[key] = new Set();
  listeners[key].add(cb);
  return () => listeners[key]?.delete(cb);
}

function readCollection<T>(name: string): T[] {
  try {
    const raw = localStorage.getItem(`db:${name}`);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function writeCollection<T>(name: string, items: T[]) {
  localStorage.setItem(`db:${name}`, JSON.stringify(items));
  notify(name);
}

function readDoc<T>(path: string): T | null {
  try {
    const raw = localStorage.getItem(`db:${path}`);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeDoc<T>(path: string, data: T) {
  localStorage.setItem(`db:${path}`, JSON.stringify(data));
  notify(path);
}

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now();
}

export const localDb = {
  readCollection,
  writeCollection,
  readDoc,
  writeDoc,
  subscribe,
  uid,
};