"use client";

import { useEffect, useSyncExternalStore } from "react";

let lockCount = 0;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return lockCount > 0;
}

function notify() {
  listeners.forEach((cb) => cb());
}

function acquire() {
  lockCount += 1;
  notify();
}

function release() {
  lockCount = Math.max(0, lockCount - 1);
  notify();
}

export function useHeaderLocked() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
export function useLockHeader(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;
    acquire();
    return release;
  }, [isOpen]);
}
