import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const SessionTabs = ({ activeTab }: { activeTab: string }) => {
  return (
    <div className='flex gap-[8px] px-[20px] pt-[20px] pb-[12px] text-black bg-pureWhite'>
      <Link href="/sessions" className={cn('text-black border border-lightBurgundy bg-pureWhite text-[12px] leading-[18px] font-[400] px-[12px] py-[8px] rounded-[8px]', {
        "bg-burgundy text-pureWhite": activeTab !== "my"
      })}>All</Link>
      <Link href="/sessions?tab=my" className={cn('text-black border border-lightBurgundy bg-pureWhite text-[12px] leading-[18px] font-[400] px-[12px] py-[8px] rounded-[8px]', {
        "bg-burgundy text-pureWhite": activeTab === "my"
      })}>My sessions</Link>
    </div>
  )
}

export default SessionTabs