import { HerkeySession } from '@/type';

const WelcomeScreen = ({ setCalling, currentSession }: { setCalling: any; currentSession: HerkeySession }) => {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center p-4 gap-y-4">
            <div className='flex flex-col justify-center items-center text-pearlWhite'>
                <div className='text-[32px]'>{currentSession?.attributes?.title}</div>
                <div>{currentSession?.attributes?.description}</div>
                <div className='flex items-center gap-x-2'>
                    Hosted by:   <div>{currentSession?.attributes?.participants?.find(participant => participant?.type === "HOST")?.user?.first_name}</div>
                </div>

            </div>
            <div className='flex items-center justify-center gap-x-4'>

                {setCalling && <button
                    className="border border-purple-400 rounded-xl px-9 py-2 text-purple-400 hover:bg-purple-400 hover:text-pearlWhite"
                    onClick={() => {
                        setCalling(true);
                    }}

                >Join</button>}
            </div>
           
        </div>
    )
}

export default WelcomeScreen