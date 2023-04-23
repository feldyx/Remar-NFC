import {writeDataToPreferences, readDataFromPreferences, deleteAllDataFromPreferences, deleteDataFromPreferences, readAllDataFromPreferences} from "../util/storage.service"
import { IonButton, IonHeader, IonInput, IonText, IonList, IonItem } from '@ionic/react';
import { useState, useEffect } from 'react';
import { NFC, Ndef, NFCOriginal } from '@awesome-cordova-plugins/nfc';
export default function Home({obj}){

    const [popup, setPopup] = useState(false);
	const [scanning, setScanning] = useState(false);
    const [writing, setWriting] = useState(false);
    const [status, setStatus] = useState('');
    //Scanning 
    useEffect(() => {
		const plat = Capacitor.getPlatform()
		if (plat == 'web')
			return
		if (plat == 'android') {
			let readerMode;
			if (scanning) {
                setStatus('Scanning');
				// Enable NFC reader mode when scanning is true
				let flags = NFC.FLAG_READER_NFC_A | NFC.FLAG_READER_NFC_V;
				readerMode = NFC.readerMode(flags).subscribe(
					tag => {
                        let payload = NFC.bytesToString(tag.ndefMessage[0].payload).slice(3)
                        if(payload == 'ArduinoRemar1397'){
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
            setStatus('Writing')
            console.log(obj.value)
            var mimeType = 'text/plain',
            payload = obj.value,
            record = ndef.mimeMediaRecord(mimeType, NFC.stringToBytes(payload));
        
            NFC.write(
                [record], 
                function () {
                    setPopup(false);
                    setWriting(false);
                    setStatus('');
                }, 
                function (reason) {
                    console.log(reason);
                }
            );
            }
	}

    //UI Handlers
    const handleCancel = () =>{
        setPopup(false);
        setScanning(false);
        setWriting(false);
        setStatus('');
    }
    return(
        <>
        {popup && <div className='absolute h-screen w-screen opacity-50 bg-black z-10'></div>}
            {popup &&<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col
                bg-white rounded-lg shadow-md h-1/3 w-2/3 justify-center z-20 items-center' id="popup">
                    <div className='flex flex-col w-full px-4'>
                        <h2 className='text-violet-900'>{status}</h2>
                        <IonButton color="dark-purple" onClick={handleCancel}>Cancel</IonButton>
                        </div>
                </div>
                }
            <div className="flex flex-row w-auto h-[80px] justify-between border-b">
                <div className="flex flex-col pl-4 justify-around">
                <IonText className="text-black font-semibold text-2xl">Key: {obj.key}</IonText>
                <IonText className="text-gray-600 font-semibold text-xl">Value: {`${obj.value.slice(0, 3)}${"*".repeat(obj.value.length - 3)}`}</IonText>
                </div>
                <IonButton class="h-full w-[120px] text-lg text-white" color="dark-purple" onClick={() => {setPopup(true); setScanning(true);}}>Scan</IonButton>

            </div>
                
        </>


    )
}