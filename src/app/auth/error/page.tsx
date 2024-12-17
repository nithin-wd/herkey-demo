"use client";
import { useRouter } from "next/navigation";

const AuthError = ({ searchParams }: any) => {
	const router = useRouter();
	const error = searchParams?.error;
	if (error === "AccessDenied")
		return (
			<div className="w-screen h-screen flex justify-center items-center flex-col">
				<div className="text-[28px] font-[500] mb-[10px]">Access Denied</div>
				<div>You don&apos;t have the permission to access this page</div>
				<div>Please try to login from another email address</div>
				<button className="mt-[20px] bg-gr-secondary-500 text-white font-[500] px-6 py-2 rounded-lg shadow-lg text-[18px]" onClick={() => router.push("/")}>
					Go back to login
				</button>
			</div>
		);


	if (error === "InvalidCredentials")
		return (
			<div className="w-screen h-screen flex justify-center items-center flex-col">
				<div className="text-[28px] font-[500] mb-[10px]">Invalid Credentials</div>
				<div>Please check your email and password and try again</div>
				<button className="mt-[20px] bg-gr-secondary-500 text-white font-[500] px-6 py-2 rounded-lg shadow-lg text-[18px]" onClick={() => router.push("/")}>
					Go back to login
				</button>
			</div>
		);
	if (error === "InvalidBody")
		return (
			<div className="w-screen h-screen flex justify-center items-center flex-col">
				<div className="text-[28px] font-[500] mb-[10px]">Invalid Body</div>
				<div>Please contact the dev team</div>
				<button className="mt-[20px] bg-gr-secondary-500 text-white font-[500] px-6 py-2 rounded-lg shadow-lg text-[18px]" onClick={() => router.push("/")}>
					Go back to login
				</button>
			</div>
		);
	return (
		<div className="w-screen h-screen flex justify-center items-center flex-col">
			<div className="text-[28px] font-[500] mb-[10px]">Unknown Error Occurred</div>
			<div>Unknown error occurred. Please contact the Development team</div>
			<button className="mt-[20px] bg-gr-secondary-500 text-white font-[500] px-6 py-2 rounded-lg shadow-lg text-[18px]" onClick={() => router.push("/")}>
				Go back to login
			</button>
		</div>
	);
};

export default AuthError;
