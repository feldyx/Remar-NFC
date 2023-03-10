import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.example.app',
	appName: 'rnfc',
	webDir: 'out',
	bundledWebRuntime: false,
	server: {
		url: 'http://192.168.0.130:3000', //THIS SHOULD BE UR IPv4, type ipconfig
		cleartext: true,
	},
};

export default config;
