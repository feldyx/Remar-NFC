import Image from 'next/image'
import Logo from "../public/logo.png"


export default function HeaderLogo({ message, user }) {
	return (
		<header className='sticky top-0 z-20 flex items-center justify-center h-24 px-5 py-3 bg-white shadow-md md:px-10'>
			<div className='  flex items-center justify-start  h-[30px] lg:h-[50px] md:h-[45px] sm:h-[35px] ' >
				<div className='relative justify-start w-[170px] sm:w-[200px] h-full cursor-pointer'>
					<Image
						src={Logo}
						fill
						alt="Logo"
						style={{ objectFit: "contain", objectPosition: "left" }}
						className="inline-flex"
					/>
				</div>
			</div>
			<div className='flex items-center justify-center w-full'>
				<h1 className='text-3xl font-bold'>{message}</h1>
			</div>
		</header>
	)
}




