/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Icons from './icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HerkeyMenuItem } from '@/type';

const Menu = ({ activePage }: { activePage: string }) => {
    const menus: HerkeyMenuItem[] = [
        { label: "Home", icon: <Icons.Home />, link: "/", type: "link", id: "home", linkType: "internal" },
        { label: "Jobs", icon: <Icons.Jobs />, link: "/jobs", type: "link", id: "jobs", linkType: "internal" },
        { label: "Companies", icon: <Icons.Companies />, link: "/companies", type: "link", id: "companies", linkType: "internal" },
        { label: "Groups", icon: <Icons.Groups />, link: "/groups", type: "link", id: "groups", linkType: "internal" },
        { label: "Network", icon: <Icons.Network />, link: "/network", type: "link", id: "network", linkType: "internal" },
        { label: "Sessions", icon: <Icons.Sessions />, link: "/sessions", type: "link", id: "sessions", linkType: "internal" },
        { label: "Events", icon: <Icons.Events />, link: "/events", type: "link", id: "events", linkType: "external" },
        { label: "Create", icon: <Icons.AddSquare />, link: "/create", type: "button", id: "create" },
        {
            label: "More", icon: <Icons.More />, link: "", type: "accordion", id: "more",
            subMenus: [
                { label: "Settings", icon: <Icons.Home />, link: "/settings", type: "link", id: "settings", linkType: "internal" },
                { label: "Help", icon: <Icons.Home />, link: "/help", type: "link", id: "help", linkType: "internal" },
                { label: "Share Feedback", icon: <Icons.Home />, link: "/share-feedback", type: "link", id: "share-feedback", linkType: "internal" },
                { label: "About", icon: <Icons.Home />, link: "/about", type: "link", id: "about", linkType: "internal" },
            ]
        },

    ]
    return (
        <div className='flex flex-col gap-4 py-4 overflow-auto'>
            {menus?.map((menu) => {
                return <MenuItem key={menu?.id} menu={menu} isActive={activePage === menu?.id} />
            })}
        </div>
    )
}
const MenuItem = ({ menu, isActive }: { menu: HerkeyMenuItem, isActive: boolean }) => {
    if (menu?.type === "button") {
        return <button className="flex items-center gap-4 text-[18px] leading-[28px] font-[400] bg-green w-fit text-pureWhite min-w-[168px] rounded-[12px] py-[10px] px-5 my-2">
            <span>
                {menu?.icon}
            </span>
            <span>
                {menu?.label}
            </span>
        </button>
    }

    return <Link className={cn('flex items-center gap-4 text-[18px] leading-[28px] font-[400] text-darkGray', {
        "text-burgundy font-[500]": isActive
    })} href={menu?.link} target={menu?.linkType === "external" ? "_blank" : ""}>
        <span>
            {menu?.icon}
        </span>
        <span >
            {menu?.label}
        </span>
    </Link>
}
export default Menu