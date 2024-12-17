export const dynamic = "force-dynamic";
export const maxDuration = 60;


import LoginForm from "./login-form";
export default async function Home() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gr-gray-50 sm:bg-[unset]">
      <div className="bg-gr-gray-50 sm:shadow-lg rounded-lg grid grid-cols-1 p-8 2xl:p-10 gap-5 sm:w-[350px] lg:max-w-[unset] lg:w-fit w-full bg-pearlWhite">
        <div className="flex flex-col items-center">
        
          <div className="text-[20px] font-[500] leading-[23.5px] text-gr-gray-800">
            Welcome back
          </div>
          <div className="text-[14px] font-[400] leading-[16.4px] text-gr-gray-500 mt-[5px]">
            Login to your account
          </div>
        </div>

        <LoginForm className="flex flex-col gap-y-[15px] my-[20px]" />
      </div>
    </div>
  );
}
