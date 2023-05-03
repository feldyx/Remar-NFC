import Head from "next/head";
import Image from 'next/image'
import { useContext, useEffect, useState } from "react";
import { AtSymbolIcon, LockClosedIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";
import HeaderLogo from "../../components/HeaderLogo";
import Loading from "../../components/Loading";
import GoogleLogo from "/public/google.webp"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";

export default function Login() {
	const { data: session, status } = useSession()
	const router = useRouter();

	const [submitting, setSubmitting] = useState(false)
	const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: {} })

	if (session) {
		//console.log("LOG IN SESS", session)
		router.push("/")
	
	}


	// useEffect(() => {
	// 	if (submitting) {
	// 		if (typeof window !== "undefined") {
	// 			document.getElementById("loading").classList.remove('hidden')
	// 			document.body.style.cursor = "progress"

	// 		}
	// 	}
	// 	else {
	// 		if (typeof window !== "undefined") {
	// 			document.getElementById("loading").classList.add('hidden')
	// 			document.body.style.cursor = "auto"

	// 		}
	// 	}
	// }, [submitting])


	async function handleCreate({ email, pass }) {
		console.log({ email, pass })
		try {
			const res = await signIn('credentials', {
				redirect: false,
				email: email,
				password: pass,
				callbackUrl: '/'
			})
			console.log(res.status)
			if (res.status != 200) {
				setSubmitting(false)
				return
			}

		}
		catch (error) {
			setSubmitting(false)
			return
		}
		if (status === "authenticated") {
			setSubmitting(false)
			router.push('/')

		}
	}

	function onSubmit(data, e) {
		setSubmitting(true)
		handleCreate(data)

	}
	function onError(errors, e) {
		console.log(errors, e)

	}

	return (
		<div className="flex flex-col w-screen h-screen">
			<Head>
				<title>Login</title>
			</Head>
			<HeaderLogo message="" />
			<Loading message="Loggin In"></Loading>
			<div id="main" className='bg-white md:shadow-lg md:border rounded-md flex w-[75%] justify-center h-[400px] 2xl:h-[500px] self-center my-auto'>
				<div className='relative w-[53%] hidden sm:inline-flex'>
					<Image style={{ objectFit: 'cover' }} fill src={"/images/login-1.jpg"} alt="Login Image" priority></Image>
				</div>
				<form className="flex flex-col gap-6 lg:gap-4 xl:gap-6 fixed no-scrollbar sm:static sm:w-[47%] md:p-9 justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-3 text-2xl font-bold text-center md:text-left md:mb-0 lg:mt-3 xl:mt-0'>Login to your Account</div>
					<div className="flex flex-col gap-3 w-full lg:w-[80%] xl:w-[70%]">
						<div className='flex flex-col w-full gap-1'>
							<div className='flex items-center h-10 bg-white border-2 shadow-sm'>
								<input
									id='email'
									className='flex w-full pl-3 text-xs text-gray-600 placeholder-gray-400 bg-transparent outline-none md:text-sm'
									type="text"
									placeholder="Email"
									{...register("email",
										{
											required: "Please enter an email",
											max: { value: 64, message: "Invalid email" },
											validate: (value) => {
												// console.log(value)
												let regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/

												//checks if email in correct format
												if (!regex.test(value)) {
													return "Invalid email"
												}

												return true
											}
										})}
								></input>
								<AtSymbolIcon className="w-6 h-6 p-1 mr-1 text-black" />

							</div>
							{errors.email && <p className="self-start p-0 text-xs font-light text-red-600">{errors.email.message}</p> || <p className='invisible text-xs font-light '>.</p>}
						</div>

						<div className='flex flex-col w-full gap-1'>
							<div className='flex items-center h-10 bg-white border-2 shadow-sm'>
								<input
									id='pass'
									className='flex w-full pl-3 text-xs text-gray-600 placeholder-gray-400 bg-transparent outline-none md:text-sm'
									type="password"
									placeholder="Password"
									{...register("pass", { required: "Please enter your password" })}
								></input>
								<LockClosedIcon className="w-6 h-6 p-1 mr-1 text-black" />
							</div>
							{errors.pass && <p className="self-start p-0 text-xs font-light text-red-600">{errors.pass.message}</p> || <p className='invisible text-xs font-light '>.</p>}
						</div>

						<button
							type="submit"
							disabled={submitting}
							className="flex items-center justify-around w-full h-10 gap-3 p-4 text-xs font-medium text-black bg-white border border-gray-500 outline-none disabled:cursor-not-allowed md:justify-center focus:border-2 rounded-2xl md:text-sm hover:bg-slate-100">
							<ArrowRightOnRectangleIcon className="w-6 h-6 text-black"></ArrowRightOnRectangleIcon>
							<p id="text1" className="mr-4 text-right">Login with Email</p>
						</button>
						<button className="flex items-center w-full h-10 gap-3 p-4 text-xs font-medium text-black bg-white border border-gray-500 outline-none justify-evenly md:justify-center focus:border-2 rounded-2xl md:text-sm hover:bg-slate-100" onClick={(e) => {
							e.preventDefault()
							// router.push("/")
							signIn("google")
							// setApiRes({ msg: "Welcome to Remar", id: Math.random() * 100 })
						}}>
							<div className="relative w-5 h-5">
								<Image id="provider-logo-dark" style={{ objectFit: 'contain' }} fill src={GoogleLogo} alt="google"></Image>
							</div>
							<p> Continue with Google</p>
						</button>
					</div>
				</form>
			</div>
		</div>

	)
}





