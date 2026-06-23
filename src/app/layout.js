import "./globals.css";
import Script from "next/script";
import ConditionalHeader from "./components/ConditionalHeader";
import ConditionalBottomNav from "./components/ConditionalBottomNav";
import ServiceWorkerRegister from "./ServiceWorkerRegister";
import LocationLoader from "./components/LocationLoader";
import Providers from "./providers";
import NetworkStatus from "./components/NetworkStatus";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import BackgroundPoller from "./components/poller";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "./components/AuthModal";

export const metadata = {
	title: "Kazilen",
	description: "Rom writing ya disc",
	manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<NuqsAdapter>
					<Providers>
						<AuthProvider>
							<NetworkStatus />
							<ServiceWorkerRegister />
							<ConditionalHeader />
							<LocationLoader />
							{children}
							<ConditionalBottomNav />
							<AuthModal />
						</AuthProvider>
					</Providers>
				</NuqsAdapter>
			</body>

			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-4VR1GJM30T"
				strategy="afterInteractive"
			/>

			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-4VR1GJM30T');
				`}
			</Script>
		</html>
	);
}