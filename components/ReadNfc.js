import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import { NFC, Ndef, NFCOriginal } from '@awesome-cordova-plugins/nfc';
import { IonButton, IonHeader, IonInput, IonText } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { TextHelper } from '@awesome-cordova-plugins/nfc';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const [tagData, setTagData] = useState(null);
	const [scanning, setScanning] = useState(false);

	useEffect(() => {
		const plat = Capacitor.getPlatform()
		if (plat == 'web')
			return
		if (plat == 'android') {
			let readerMode;
			if (scanning) {
				// Enable NFC reader mode when scanning is true
				let flags = NFC.FLAG_READER_NFC_A | NFC.FLAG_READER_NFC_V;
				readerMode = NFC.readerMode(flags).subscribe(
					tag => setTagData(tag),
					err => console.log('Error reading tag', err)
				);

			}
			// Clean up the subscription when the component unmounts or scanning is turned off
			return () => {
				if (readerMode) {
					readerMode.unsubscribe();
				}
			};
		}
		else {

			NFC.scanNdef().then(
				tag => setTagData(tag),
				err => console.log('Error reading tag', err));
		}

	}, [scanning]);

	const handleScanButton = () => {
		setScanning(true);
	};

	const handleStopButton = () => {
		setScanning(false);
		setTagData(null);
	};
	return (
		<>
			<div className='flex flex-col justify-center items-center h-screen text-center'>
				{scanning ? (
					<IonButton onClick={handleStopButton}>Stop Scanning</IonButton>
				) : (
					<IonButton onClick={handleScanButton}>Start Scanning</IonButton>
				)}

				{tagData ?
					<div>
						<p>Tag: {JSON.stringify(tagData)}</p>
						<p>Payload: {NFC.bytesToString(tagData.ndefMessage[0].payload)}</p>
						<p>Tag ID: {tagData.id}</p>
						<p>Tag Type: {tagData.type}</p>
						
					</div>
					:
					<></>
				}

			</div>
		</>
	)
}
