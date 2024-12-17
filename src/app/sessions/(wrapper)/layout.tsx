
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Metadata } from "next";
import Image from "next/image";

import { metadata as rootMetaData } from "@/app/layout"

export const metadata: Metadata = {
  ...rootMetaData,
  title: "Join HerKey Sessions To Power Your Career Forward",
  description: "Explore HerKey sessions: Unlock growth, learn from experts, and connect with a community committed to your success!",
};
export default function SessionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      <Header />
      <ScrollArea className="bg-pureWhite md:bg-bgGray rounded-t-[40px] shadow pt-4 md:pt-8  h-[calc(100dvh-64px)] overflow-auto">
        <div className="container grid grid-cols-1 md:grid-cols-[248px_auto_248px] gap-x-9 " >
          <div className="h-fit sticky top-0 hidden md:flex">
            <Menu activePage="sessions" />
          </div>
          <div className="md:rounded-[16px] md:shadow overflow-hidden mb-[20px]">
            {children}
          </div>
          <div className="text-black bg-pureWhite rounded-[16px] shadow flex-col p-4 gap-y-4 h-fit sticky top-0  hidden md:flex">
            <Image src={"/placeholder-ad-image.png"} width={210} height={116} alt='' />
            <div className="text-burgundy">
              Campus to Corporate Program by HerStart Academy
            </div>
            <button className="bg-green text-[14px] h-[40px] w-[100px] rounded-[8px] text-pureWhite">
              Enroll Now!
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
