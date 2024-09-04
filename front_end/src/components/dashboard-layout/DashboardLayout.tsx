import { PropsWithChildren } from "react"
import Sidebar from "./sidebar/Sidebar"
import Searchbar from "./searchbar/Searchbar"

export default function DashboardLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="pl-24 w-full">{children}</main>
            <Searchbar />
        </div>
    )
}