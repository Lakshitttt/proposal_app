"use client";
// src/app/PageClient.tsx

import { useSearchParams } from "next/navigation";
import MainApp from "@/components/MainApp";
import { siteConfig } from "@/config/siteConfig";

export default function PageClient() {
  const searchParams = useSearchParams();
  const name = searchParams.get(siteConfig.paramKey) ?? siteConfig.defaultName;

  return <MainApp name={name} />;
}
