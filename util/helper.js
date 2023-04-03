function writeNfc(){

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
		setTest(prev => prev = "success");
	  }
	  
	  function fail() {
		console.log('Failed to register NFC Listener');
		setTest(prev => prev = "error0");
	  }

      useEffect(() => {
		if(writing) nfc.addTagDiscoveredListener(writeTag, win, fail);
		return ()=>nfc.removeTagDiscoveredListener(writeTag, fail, win);
	}, [writing])
}