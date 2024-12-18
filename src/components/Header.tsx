import { cn } from '@/lib/utils'
import Icons from './icons'
import Herkey from './svgx/Herkey'
import UserPopup from './UserPopup';
const Header = () => {
  const hasNewNotification = true;
  const hasNewMessage = false

  return (
    <>
      <header className='container bg-burgundy h-[64px] grid-cols-[280px_auto_280px] gap-x-1 items-center hidden md:grid'>
        <Herkey className='text-pureWhite' />
        <input type="text" placeholder='Search' className='bg-pureWhite rounded-[12px] px-4 py-2 w-[350px] h-[40px] text-black' />
        <div className='flex items-center gap-4'>
          <div className='text-white flex flex-col items-center'>
            <div className={cn('bg-[#FFFFFF14] h-[32px] w-[32px] rounded-[12px] flex justify-center items-center relative', {
              "before:contents-[''] before:absolute before:h-[8px] before:w-[8px] before:bg-red before:rounded-full before:top-0 before:right-0 before:border-burgundy before:border-[1.6px]": hasNewMessage
            })}>
              <Icons.Message />
            </div>
            <div className='text-[12px]'>Messaging</div>
          </div>
          <div className='text-white flex flex-col items-center'>
            <div className={cn('bg-[#FFFFFF14] h-[32px] w-[32px] rounded-[12px] flex justify-center items-center relative', {
              "before:contents-[''] before:absolute before:h-[8px] before:w-[8px] before:bg-red before:rounded-full before:top-0 before:right-0 before:border-burgundy before:border-[1.6px]": hasNewNotification
            })}>
              <Icons.Bell />
            </div>
            <div className='text-[12px]'>Notifications</div>
          </div>
          <UserPopup />
        </div>
      </header>

      {/* mobile */}
      <header className='container bg-burgundy h-[64px] gap-x-2 items-center  md:hidden flex'>
        <div className='text-white bg-[#FFFFFF14] min-h-[36px] min-w-[36px] rounded-[12px] flex justify-center items-center text-[10px]'>me</div>
        <input type="text" placeholder='Search by title and host' className='bg-[#FFFFFF14] rounded-[12px] px-4 py-2 w-full h-[40px] text-black placeholder:text-[14px] placeholder:text-[#FFFFFFBF]' />
        <div className='flex items-center gap-2'>
          <div className={cn('text-white bg-[#FFFFFF14] h-[32px] w-[32px] rounded-[12px] flex justify-center items-center relative', {
            "before:contents-[''] before:absolute before:h-[8px] before:w-[8px] before:bg-red before:rounded-full before:top-0 before:right-0 before:border-burgundy before:border-[1.6px]": hasNewMessage
          })}>
            <Icons.Message />
          </div>
          <div className={cn('text-white bg-[#FFFFFF14] h-[32px] w-[32px] rounded-[12px] flex justify-center items-center relative', {
            "before:contents-[''] before:absolute before:h-[8px] before:w-[8px] before:bg-red before:rounded-full before:top-0 before:right-0 before:border-burgundy before:border-[1.6px]": hasNewNotification
          })}>
            <Icons.Bell />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header