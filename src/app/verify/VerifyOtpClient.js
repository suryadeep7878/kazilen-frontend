"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { apiRequest } from "../../utils/api";
import { getStoredPhone, validatePhone } from "../../utils/storage";
import VerifySkeleton from "./VerifySkeleton";


/**
 * Exponential backoff retry wrapper
 */
const withRetry = async (fn, maxRetries = 3, initialDelay = 1000) => {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      // Don't retry on 400s or 401s - they are usually client errors
      if (error.message?.includes("40") || error.message?.includes("Unauthorized")) {
        throw error;
      }
      const delay = initialDelay * Math.pow(2, i);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
};

export default function VerifyOtpClient() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  
  const inputRefs = useRef([]);

  // Hydration and phone validation
  useEffect(() => {
    const storedPhone = getStoredPhone();
    if (!storedPhone || !validatePhone(storedPhone)) {
      console.warn(`[Phone Transition] Invalid or missing phone in Verify: ${storedPhone}`);
      router.replace("/login");
      return;
    }
    setPhone(storedPhone);
    setIsHydrated(true);
    console.log(`[Phone Transition] Verify Page Loaded: ${storedPhone}`);
  }, [router]);

  // Timer logic
  useEffect(() => {
    if (seconds <= 0) {
      setResendEnabled(true);
      return;
    }
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const handleBack = () => router.back();

  const handleChange = (value, index) => {
    // Only allow digits
    const lastChar = value.slice(-1);
    if (lastChar && !/^\d$/.test(lastChar)) return;

    const updated = [...otpDigits];
    updated[index] = lastChar;
    setOtpDigits(updated);
    setError("");

    // Move to next input if filled
    if (lastChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        // If current is empty, move back and clear previous
        const updated = [...otpDigits];
        updated[index - 1] = "";
        setOtpDigits(updated);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Just clear current
        const updated = [...otpDigits];
        updated[index] = "";
        setOtpDigits(updated);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pasteData.every(char => /^\d$/.test(char))) {
      const updated = [...otpDigits];
      pasteData.forEach((char, i) => {
        if (i < 6) updated[i] = char;
      });
      setOtpDigits(updated);
      // Focus the last filled or the next empty
      const focusIndex = Math.min(pasteData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleVerify = useCallback(async () => {
    const fullOtp = otpDigits.join("");
    if (fullOtp.length !== 6) return;

    try {
      setLoading(true);
      setError("");

      const response = await withRetry(() => 
        apiRequest("/verify-otp", "POST", {
          phone: phone,
          otp: fullOtp,
        })
      );

      if (response.session) {
        const token = typeof response.session === "string"
          ? response.session
          : JSON.stringify(response.session);

        SafeStorage.set("session_token", token);

        const result = await apiRequest("/check", "POST", { phone: phone });

        if (result?.exists) {
          router.push("/");
        } else {
          router.push("/create-account");
        }
      }
    } catch (e) {
      setError(e.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [otpDigits, phone, router]);

  // Auto-submit when all digits are filled
  useEffect(() => {
    if (otpDigits.every(d => d !== "") && !loading) {
      handleVerify();
    }
  }, [otpDigits, handleVerify, loading]);

  const handleResend = async () => {
    if (!resendEnabled || resending) return;

    try {
      setResending(true);
      setError("");
      
      await withRetry(() => apiRequest("/send-otp", "POST", { phone: phone }));

      setSeconds(30);
      setResendEnabled(false);
      setOtpDigits(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (e) {
      setError(`Failed to resend: ${e.message}`);
    } finally {
      setResending(false);
    }
  };

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${min.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  if (!isHydrated) {
    return <VerifySkeleton />;
  }

  return (
    <div className="min-h-screen bg-white px-6 py-4 flex flex-col">
      <header className="flex items-center mb-8">
        <button onClick={handleBack} className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={28} />
        </button>
      </header>

      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-2">Verify OTP</h1>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          We sent a 6-digit code to <span className="font-semibold text-black">{phone}</span>. 
          Enter it below to continue.
        </p>

        <div className="flex justify-between gap-2 mb-4" onPaste={handlePaste}>
          {otpDigits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              autoFocus={idx === 0}
              className={`w-12 h-14 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-xl text-center text-xl font-bold focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all`}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-xs mb-4 animate-pulse">{error}</p>
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            Does not receive code?{" "}
            <button
              disabled={!resendEnabled || resending}
              onClick={handleResend}
              className={`font-semibold transition-colors ${
                resendEnabled ? "text-blue-600 hover:text-blue-700 underline" : "text-gray-300 cursor-not-allowed"
              }`}
            >
              {resending ? "Sending..." : "Resend"}
            </button>
          </span>
          {!resendEnabled && (
            <span className="font-mono text-gray-400">{formatTime(seconds)}</span>
          )}
        </div>
      </main>

      <footer className="mt-auto py-4">
        <button
          onClick={handleVerify}
          disabled={loading || otpDigits.some(d => d === "")}
          className={`w-full bg-yellow-400 text-black font-bold py-4 rounded-2xl shadow-lg shadow-yellow-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
            (loading || otpDigits.some(d => d === "")) ? "opacity-50 cursor-not-allowed shadow-none" : "hover:bg-yellow-500"
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify & Continue"
          )}
        </button>
      </footer>
    </div>
  );
}

