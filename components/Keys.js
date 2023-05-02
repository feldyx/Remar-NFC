import {writeDataToPreferences, readDataFromPreferences, deleteAllDataFromPreferences, deleteDataFromPreferences, readAllDataFromPreferences} from "../util/storage.service"
import { IonButton, IonHeader, IonInput, IonText, IonList, IonItem } from '@ionic/react';
import { useState, useEffect } from 'react';
import { NFC, Ndef, NFCOriginal } from '@awesome-cordova-plugins/nfc';
export default function Home({obj, keyPopup, setKeyPopup, status, setStatus}){

	const [scanning, setScanning] = useState(false);
    const [writing, setWriting] = useState(false);

    useEffect(() => {
        if(!keyPopup){
            setScanning(false);
            setWriting(false);
            setStatus('');
        }
    }, [keyPopup])
    //Scanning 
    useEffect(() => {
		const plat = Capacitor.getPlatform()
		if (plat == 'web'){
            setStatus('Cannot use NFC on website')
			return
        }
		if (plat == 'android') {
			let readerMode;
			if (scanning) {
                setStatus('Waiting to scan...');
				// Enable NFC reader mode when scanning is true
				let flags = NFC.FLAG_READER_NFC_A | NFC.FLAG_READER_NFC_V;
				readerMode = NFC.readerMode(flags).subscribe(
					tag => {
                        let payload = NFC.bytesToString(tag.ndefMessage[0].payload).slice(3)
                        if(payload == 'ArduinoREMAR1397'){
                            setStatus('Scanning...');
                            setScanning(false);
                            setWriting(true);
                    }},
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

    //Writing
    useEffect(() => {
		if(writing) 
        {nfc.addTagDiscoveredListener(writeTag, ()=>{console.log("Listening for NDEF tags")}, ()=>{console.log('Failed to register NFC Listener')})}
		return (()=>nfc.removeTagDiscoveredListener(writeTag, ()=>{console.log("Removed NFC Listener")}, ()=>{console.log("Failed to remove NFC Listener")}))
	}, [writing])

    //Writing Callback Function
    function writeTag(nfcEvent) {
		// ignore what's on the tag for now, just overwrite
        if(writing){
            setStatus('Writing...')
            console.log(obj.bookingId)
            var mimeType = 'text/plain',
            payload = obj.pinCode + "_" + obj.bookingId,
            record = ndef.mimeMediaRecord(mimeType, NFC.stringToBytes(payload));
        
            NFC.write(
                [record], 
                function () {
                    setKeyPopup(false);
                }, 
                function (reason) {
                    console.log(reason);
                }
            );
            }
	}

    //UI Handlers
    const handleCancel = () =>{
        setKeyPopup(false);
        setScanning(false);
        setWriting(false);
        setStatus('');
    }
    return(
        <>
            <div className="flex flex-row w-auto h-[80px] justify-between border-b">
                <div className="flex flex-col justify-around pl-4">
                <IonText className="text-xl font-semibold text-black">Name: {obj.aptName}</IonText>
                <IonText className="text-xl font-semibold text-gray-600">Pin: {`${obj.pinCode.slice(0, 3)}${"*".repeat(obj.pinCode.length - 3)}`}</IonText>
                </div>
                <IonButton className="h-[90%] w-[120px] text-lg text-white" color="dark-purple" onClick={() => {setKeyPopup(true); setScanning(true);}}>Scan</IonButton>

            </div>
                
        </>


    )
}