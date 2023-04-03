import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react';
import { NFC, Ndef, NFCOriginal } from '@awesome-cordova-plugins/nfc';
import { IonButton, IonHeader, IonInput, IonText } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { TextHelper } from '@awesome-cordova-plugins/nfc';
const inter = Inter({ subsets: ['latin'] })

export default function WriteNfc() {

	const [writing, setWriting] = useState(false);
	const [text, setText] = useState("");
	//const nfc = new NFC();
	// const ndef = new Ndef();

	function writeTag(nfcEvent) {
		// ignore what's on the tag for now, just overwrite
		  if(writing){
		var mimeType = 'text/plain',
		  payload = text,
		  record = ndef.mimeMediaRecord(mimeType, NFC.stringToBytes(payload));
	  
		NFC.write(
			  [record], 
			  function () {
			  }, 
			  function (reason) {
			  }
		);   
	  }
	}

	function win() {
		console.log("Listening for NDEF tags");
	  }
	  
	  function fail() {
		console.log('Failed to register NFC Listener');
	  }

	useEffect(() => {
		if(writing) nfc.addTagDiscoveredListener(writeTag, win, fail);
		return ()=>nfc.removeTagDiscoveredListener(writeTag, fail, win);
	}, [writing])


	return (
		<>
			<div className='flex flex-col justify-center items-center h-screen text-center'>
            {writing ? (
					<IonButton onClick={() => setWriting(false)}>Stop Writing</IonButton>
				) : (
					<IonButton onClick={() => { text && setWriting(true) }}>Start Writing</IonButton>
				)}
				<IonInput
					value={text}
					placeholder="Enter Input"
					onIonChange={(e) => setText(e.detail.value)}
					clearInput
				></IonInput>
				

			</div>
		</>
	)
}
