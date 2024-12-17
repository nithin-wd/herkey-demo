export const dynamic = "force-dynamic";
export const maxDuration = 60;

import { Metadata } from "next";
import React from "react";
import { metadata as mainMeta } from "@/app/layout";
export const metadata: Metadata = {
  ...mainMeta,
  title: "Login:Herkey",
};
export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="">{children}</div>;
}
