import ProfileLayout from "@/components/profile-layout/ProfileLayout"
import { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren<unknown>) {
    return <ProfileLayout>{children}</ProfileLayout>
}