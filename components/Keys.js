import {writeDataToPreferences, readDataFromPreferences, deleteAllDataFromPreferences, deleteDataFromPreferences, readAllDataFromPreferences} from "../util/storage.service"
import { IonButton, IonHeader, IonInput, IonText, IonList, IonItem } from '@ionic/react';
import { useState, useEffect } from 'react';
export default function Home(){

    const [keys, setKeys] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const { keys } = await readAllDataFromPreferences();
          setKeys(keys);
        }
        fetchData();
      }, []);

    return(
        <>

            <IonButton onClick={()=>writeDataToPreferences('TestKey', 'key1')}>add</IonButton>
			<IonButton onClick={()=>{deleteAllDataFromPreferences()}}>delete all</IonButton>
			<IonButton onClick={()=>{console.log(readDataFromPreferences('TestKey'))}}>read</IonButton>
            <IonButton onClick={()=>{console.log(readAllDataFromPreferences())}}>read</IonButton>

            <IonList>
                {keys.map((key) => (
                <IonItem key={key}>
                    
                </IonItem>
        ))}
            </IonList>
        </>


    )
}