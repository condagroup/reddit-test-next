'use client'
import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button, buttonVariants } from "./ui/button"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {localStorage.getItem('token') ?
              <div>
                <Button
                  rel="noreferrer"
                  onClick={() => {
                    localStorage.removeItem('token')
                    window.location.href = "/"
                  }}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Logout
                </Button>
              </div> :
              <div className="flex gap-4">
                <Link
                  href={'/login'}
                  rel="noreferrer"
                  className={buttonVariants()}
                >
                  Login
                </Link>
                <Link
                  rel="noreferrer"
                  href={'/register'}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Register
                </Link>
              </div>}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
