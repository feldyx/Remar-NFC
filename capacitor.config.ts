import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.example.app",
	appName: "rnfc",
	webDir: "out",
	bundledWebRuntime: false,
	server: {
		url: "remar-nfc.vercel.app", //THIS SHOULD BE UR IPv4, type ipconfig
		cleartext: true,
	},
};

export default config;
