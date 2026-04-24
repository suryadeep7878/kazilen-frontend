"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../utils/api";
import SafeStorage, { getStoredPhone, clearStoredPhone, validatePhone } from "../../utils/storage";

/**
 * CreateAccountClient - Refactored for robust phone state management.
 * Fixes:
 * - Hydration race conditions in PWA (isInitializing state)
 * - Single source of truth for phone state
 * - Strict normalization (91 prefix) for backend contract
 * - Logging for production debugging
 */
export default function CreateAccountClient() {
	const router = useRouter();
	const [phone, setPhone] = useState("");
	const [isInitializing, setIsInitializing] = useState(true);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");
	const [touched, setTouched] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log("[CreateAccount] Initializing component state...");
		try {
			const storedPhone = getStoredPhone();
			
			if (!storedPhone || !validatePhone(storedPhone)) {
				console.warn("[CreateAccount] Invalid or missing phone found. Redirecting to login.", storedPhone);
				router.replace("/login");
				return;
			}

			console.log("[CreateAccount] Successfully retrieved phone:", storedPhone);
			setPhone(storedPhone);
			setIsInitializing(false);
		} catch (err) {
			console.error("[CreateAccount] Error reading from storage:", err);
			router.replace("/login");
		}
	}, [router]);

	const isValidPhone = validatePhone(phone);
	const canSubmit = name.trim() && dob && gender && isValidPhone;

	const handleCreateAccount = async () => {
		console.log("[CreateAccount] Create account attempt started.");
		
		if (!canSubmit) {
			console.warn("[CreateAccount] Submit blocked: form invalid or phone missing.", { name, dob, gender, phone });
			setTouched({ name: true, dob: true, gender: true });
			alert("Please fill Name, Date of Birth, Gender and ensure a valid phone number.");
			return;
		}

		try {
			setLoading(true);

			const genderMap = {
				male: "M",
				female: "F",
				other: "O",
			};

			const genderEnum = genderMap[gender.toLowerCase()] || "O";
			
			const payload = {
				phoneNo: phone,
				name: name.trim(),
				email: email,
				dob: dob,
				gender: genderEnum,
			};

			console.log("[CreateAccount] Dispatching payload to /create-account:", payload);

			const created = await apiRequest("/create-account", "POST", payload);
			console.log("[CreateAccount] API Success Response:", created);

			if (created?.id) {
				SafeStorage.set("userId", String(created.id));
			}

			alert("Account created successfully!");

			router.replace("/");
		} catch (err) {
			console.error("[CreateAccount] API Request Failed:", err);
			alert(`Create failed: ${err?.message || "Something went wrong"}`);
		} finally {
			setLoading(false);
		}
	};

	// Graceful fallback for hydration/initialization
	if (isInitializing) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
				<Loader2 className="animate-spin text-yellow-400 mb-4" size={48} />
				<h2 className="text-xl font-bold text-gray-800 mb-2">Setting up your profile</h2>
				<p className="text-gray-500">Checking your account details, please wait...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Top bar */}
			<div className="flex items-center gap-3 p-4 shadow-sm border-b">
				<button onClick={() => router.back()} className="text-gray-700 hover:bg-gray-100 p-1 rounded-full transition">
					<ArrowLeft size={24} />
				</button>

				<h1 className="text-lg font-semibold text-gray-800">
					Create your profile
				</h1>
			</div>

			{/* Phone (Read Only) */}
			<div className="px-4 mt-6">
				<fieldset className="relative border border-gray-200 bg-gray-50 rounded-lg px-3 pt-4 pb-2">
					<legend className="text-xs px-1 text-gray-500">Registered Phone Number</legend>

					<div className="flex items-center">
						<input
							type="tel"
							value={phone}
							readOnly
							className="w-full border-none bg-transparent p-0 text-sm font-semibold text-gray-700 focus:outline-none cursor-not-allowed"
						/>
					</div>
				</fieldset>

				{!isValidPhone && (
					<p className="text-xs text-red-500 mt-2 flex items-center gap-1">
						<span>⚠️</span> Phone number data is inconsistent. Please return to login.
					</p>
				)}
			</div>

			{/* Name */}
			<div className="px-4 mt-6">
				<fieldset
					className={`relative border rounded-lg px-3 pt-4 pb-2 transition-colors ${touched.name && !name.trim() ? "border-red-400" : "border-gray-300 focus-within:border-yellow-400"
						}`}
				>
					<legend className="text-xs px-1 text-gray-500">Name *</legend>

					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						onBlur={() => setTouched((t) => ({ ...t, name: true }))}
						placeholder="Enter your full name"
						className="w-full border-none bg-transparent p-0 text-sm text-black focus:outline-none"
					/>
				</fieldset>
			</div>

			{/* Email */}
			<div className="px-4 mt-4">
				<fieldset className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2 focus-within:border-yellow-400 transition-colors">
					<legend className="text-xs px-1 text-gray-500">
						Email (optional)
					</legend>

					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						className="w-full border-none bg-transparent p-0 text-sm text-black focus:outline-none"
					/>
				</fieldset>
			</div>

			{/* DOB */}
			<div className="px-4 mt-4">
				<fieldset
					className={`relative border rounded-lg px-3 pt-4 pb-2 transition-colors ${touched.dob && !dob ? "border-red-400" : "border-gray-300 focus-within:border-yellow-400"
						}`}
				>
					<legend className="text-xs px-1 text-gray-500">
						Date of birth *
					</legend>

					<input
						type="date"
						value={dob}
						onChange={(e) => setDob(e.target.value)}
						onBlur={() => setTouched((t) => ({ ...t, dob: true }))}
						className="w-full border-none bg-transparent p-0 text-sm text-black focus:outline-none"
					/>
				</fieldset>
			</div>

			{/* Gender */}
			<div className="px-4 mt-4 mb-6">
				<fieldset
					className={`relative border rounded-lg px-3 pt-4 pb-2 transition-colors ${touched.gender && !gender ? "border-red-400" : "border-gray-300 focus-within:border-yellow-400"
						}`}
				>
					<legend className="text-xs px-1 text-gray-500">Gender *</legend>

					<select
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						onBlur={() => setTouched((t) => ({ ...t, gender: true }))}
						className="w-full border-none bg-transparent text-sm text-black focus:outline-none"
					>
						<option value="" disabled>
							Select gender
						</option>

						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
				</fieldset>
			</div>

			{/* Submit */}
			<div className="px-4 pb-10 mt-auto">
				<button
					onClick={handleCreateAccount}
					disabled={!canSubmit || loading}
					className={`w-full py-4 rounded-xl font-bold transition-all shadow-md active:scale-95 ${canSubmit && !loading
							? "bg-yellow-400 hover:bg-yellow-500 text-black"
							: "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
						}`}
				>
					{loading ? (
						<div className="flex items-center justify-center gap-2">
							<Loader2 className="animate-spin" size={20} />
							<span>Creating Account...</span>
						</div>
					) : (
						"Create Account"
					)}
				</button>
				
				<p className="text-center text-[10px] text-gray-400 mt-4">
					By creating an account, you agree to our Terms and Conditions.
				</p>
			</div>
		</div>
	);
}
