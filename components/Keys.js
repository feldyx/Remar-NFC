import {writeDataToPreferences, readDataFromPreferences, deleteAllDataFromPreferences, deleteDataFromPreferences, readAllDataFromPreferences} from "../util/storage.service"
import { IonButton, IonHeader, IonInput, IonText, IonList, IonItem } from '@ionic/react';
import { useState, useEffect } from 'react';
export default function Home({obj}){

    return(
        <>
                <div onClick={() => {console.log('COMPONENT CLICKED')}} className="flex flex-col  px-3 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 transition duration-150 ease-in-out">
                    <IonText className="text-violet-900 text-base text-3xl">{obj.key}</IonText>
                    <IonText className="text-end">{`${obj.value.slice(0, 3)}${"*".repeat(obj.value.length - 3)}`}</IonText>
                </div>
        </>


    )
}