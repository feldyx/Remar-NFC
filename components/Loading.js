
export default function Loading({ message, id="loading" }) {
    return (
        <div id={id} className="fixed z-50 flex flex-col items-center justify-center hidden w-screen h-screen bg-white bg-opacity-60">
            <div className="mb-4 text-5xl font-semibold text-center text-purple-dark">
                     {message}
                </div>
            <div className="spinner">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    )
}




{/* <div className="flex flex-col items-center justify-center w-full max-w-xs ">
                 <div className="mb-4 text-5xl font-semibold text-center text-purple-dark">
                     {message}
                </div>
                <ArrowPathIcon className="w-10 h-10 mx-auto mb-4 text-black rounded-full bg-inherit animate-spin"></ArrowPathIcon>
                 <div className="spinner mr-7"></div>
             </div> */}