import { PropsWithChildren } from "react"
import Navbar from "./navbar/Navbar"

export default function ProfileLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <>
            <Navbar />
            <main className="w-full p-6">{children}</main>
        </>
    )
}