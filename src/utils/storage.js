"use client";

import { useState, useEffect } from "react";

// Simple in-memory fallback for environments without localStorage (e.g., SSR, Private Mode)
const memoryStorage = {};

/**
 * SafeStorage provides a consistent interface for localStorage with 
 * built-in protection against:
 * 1. Hydration mismatches (returns null/default until mounted)
 * 2. Missing localStorage (private mode, old browsers)
 * 3. Storage errors (QuotaExceededError, etc.)
 */
export const SafeStorage = {
  get: (key, defaultValue = null) => {
    if (typeof window === "undefined") return defaultValue;
    
    try {
      const value = window.localStorage.getItem(key);
      return value !== null ? value : (memoryStorage[key] ?? defaultValue);
    } catch (e) {
      console.warn(`[SafeStorage] Failed to get ${key}:`, e);
      return memoryStorage[key] ?? defaultValue;
    }
  },

  set: (key, value) => {
    if (typeof window === "undefined") {
      memoryStorage[key] = value;
      return;
    }

    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[SafeStorage] Failed to set ${key}:`, e);
      memoryStorage[key] = value; // Fallback to memory
    }
  },

  remove: (key) => {
    if (typeof window === "undefined") {
      delete memoryStorage[key];
      return;
    }

    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[SafeStorage] Failed to remove ${key}:`, e);
    }
    delete memoryStorage[key];
  },

  clear: () => {
    if (typeof window === "undefined") {
      Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
      return;
    }

    try {
      window.localStorage.clear();
    } catch (e) {
      console.warn("[SafeStorage] Failed to clear storage:", e);
    }
    Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
  }
};

/**
 * Hook to use SafeStorage in a way that avoids hydration mismatches.
 */
export function useSafeStorage(key, defaultValue = null) {
  const [value, setValue] = useState(defaultValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = SafeStorage.get(key, defaultValue);
    if (stored !== defaultValue) {
      setValue(stored);
    }
  }, [key, defaultValue]);

  const setSafeValue = (newValue) => {
    SafeStorage.set(key, newValue);
    setValue(newValue);
  };

  return [isMounted ? value : defaultValue, setSafeValue, isMounted];
}

export default SafeStorage;

/**
 * Phone Number Reliability Utility
 * Enforces unified contract: 91XXXXXXXXXX
 */
const PHONE_STORAGE_KEY = "kazilen_temp_phone";

/**
 * Normalizes phone number to 12-digit 91XXXXXXXXXX format
 */
export const normalizePhone = (phone) => {
    if (!phone) return null;
    const digits = String(phone).replace(/\D/g, "");
    
    if (digits.length === 10) return `91${digits}`;
    if (digits.length === 12 && digits.startsWith("91")) return digits;
    
    return null;
};

/**
 * Validates phone number format 91XXXXXXXXXX
 */
export const validatePhone = (phone) => {
    return typeof phone === 'string' && /^91\d{10}$/.test(phone);
};

/**
 * Stores normalized phone
 */
export const setStoredPhone = (phone) => {
    const normalized = normalizePhone(phone);
    if (normalized) {
        SafeStorage.set(PHONE_STORAGE_KEY, normalized);
        console.log(`[Phone Transition] Stored: ${normalized}`);
    } else {
        console.warn(`[Phone Transition] Failed to store invalid phone: ${phone}`);
    }
};

/**
 * Retrieves normalized phone
 */
export const getStoredPhone = () => {
    const phone = SafeStorage.get(PHONE_STORAGE_KEY);
    const normalized = normalizePhone(phone);
    
    if (phone && phone !== normalized) {
        console.log(`[Phone Transition] Migrating storage: ${phone} -> ${normalized}`);
        if (normalized) {
            SafeStorage.set(PHONE_STORAGE_KEY, normalized);
        }
    }
    
    return normalized;
};

/**
 * Clears stored phone
 */
export const clearStoredPhone = () => {
    console.log(`[Phone Transition] Clearing stored phone`);
    SafeStorage.remove(PHONE_STORAGE_KEY);
};
