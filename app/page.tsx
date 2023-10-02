'use client'
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Hi,
          Tyrell
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          This is the clone of Reddit. Check it out
        </p>
      </div>
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
    </section>
  )
}
