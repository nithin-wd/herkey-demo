export const dynamic = "force-dynamic";
export const maxDuration = 60;


import Herkey from "@/components/svgx/Herkey";
import ErrorAlert from "./ErrorAlert";
import LoginForm from "./login-form";


export default async function Home({ searchParams }: { searchParams: any }) {
  const error = await searchParams?.error;


  return (<>
    <div className="flex justify-center items-center w-screen h-screen bg-burgundy sm:bg-pearlWhite">
      <div className="bg-gr-gray-50 sm:shadow-lg rounded-lg grid grid-cols-1 p-8 2xl:p-10 gap-5 sm:w-[320px] lg:max-w-[unset] lg:w-fit w-full bg-burgundy">
        <div className="flex flex-col items-center">
          <Herkey className="text-pureWhite scale-150 my-[20px]" />
          <div className="text-[20px] font-[500] leading-[23.5px] text-pearlWhite">
            Welcome back
          </div>
          <div className="text-[14px] font-[400] leading-[16.4px] text-pearlWhite mt-[5px]">
            Login to your account
          </div>
        </div>

        <LoginForm className="flex flex-col gap-y-[15px] my-[20px]" error={error} />
      </div>

    </div>


   <ErrorAlert error={error}/>

  </>
  );
}
