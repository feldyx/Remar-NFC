import { useState, useEffect, Fragment, useContext } from "react"
import { Dialog, Transition } from '@headlessui/react'
import context from '../lib/context'
import { X, InformationCircleOutline } from 'heroicons-react';

function Notification({ msg, isShowing, onClick}) {
    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
        onClick()
    }

    function openModal() {
        setIsOpen(true)
    }

    setTimeout(() => {
        closeModal()
    }, 3000);

  
    return (
        //isOpen && isShowing
        <Transition appear show={isOpen && isShowing} as={Fragment}>
            <Dialog as="div" className="relative z-10 flex justify-center" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="transform ease-out duration-400 transition-all"
                    enterFrom="translate-x-full opacity-0"
                    enterTo="translate-x-0 opacity-100"
                    leave="transform ease-in duration-400 transition-all"
                    leaveFrom="translate-x-0 opacity-100"
                    leaveTo="translate-x-full opacity-0"
                >
                    <div className="fixed flex max-w-3xl overflow-hidden transition-all transform shadow-xl card w-80 bg-base-100 rounded-tr-2xl rounded-bl-2xl top-28 right-10">
                        <div className="p-4 py-2 pb-3 card-body">
                            <div className="items-center justify-between card-actions">
                                <InformationCircleOutline className='h-10 text-purple-600'></InformationCircleOutline>
                                <X onClick={closeModal} className='h-4 text-gray-400 cursor-pointer hover:text-black'></X>
                            </div>
                            <p>{msg}</p>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}

export default function NotificationPopup() {
    const { notifs, setNotifs } = useContext(context)

    function removeElement(index) {
        setTimeout(() => {
            const newNotifs = notifs.filter((_, i) => i !== index);
            setNotifs(newNotifs);
        }, 1000);
    };

    return notifs.map((notif, index) => <Notification key={notif.id} msg={notif.msg} onClick={() => removeElement(index)} isShowing={true} ></Notification>)
    // return <Notification key={1000} msg={"fefverfgewfg"} isShowing={true} ></Notification>


}