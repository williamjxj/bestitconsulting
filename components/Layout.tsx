"use client"

import { useState } from "react"
import Header from "./Header"
import Footer from "./Footer"

const languages = {
  en: {},
  fr: {},
  es: {},
  cn: {},
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [currentLang, setCurrentLang] = useState<keyof typeof languages>("en")

  return (
    <div className="min-h-screen bg-white">
      <Header currentLang={currentLang} setCurrentLang={setCurrentLang} />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  )
}
