import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { useRouter } from "next/navigation"
import React from "react"
import { LuPencil } from "react-icons/lu"

interface Props {
    header: string,
    description: string,
    username: string,
    created_at: Date
    id: string,
    isMine: boolean,
}

const Act: React.FC<Props> = ({ header, description, username, created_at, id, isMine }) => {
    const { push } = useRouter()

    return (
        <div
            className='w-full h-52 shadow-s flex flex-col justify-between'
        >
            <div className="top p-3 border-b border-gray-200 flex justify-between items-center">
                <p>{username}</p>
                {
                    isMine && <LuPencil
                        onClick={() => push(`${DASHBOARD_PAGES.HOME}/edit/${id}`)}
                        className="cursor-pointer"
                    />
                }
            </div>
            <div className="middle h-full p-3">
                <h1>{header}</h1>
                <p>{description}</p>
            </div>
            <div className="bottom p-3">
                <p>{created_at.toString().slice(0, 10)}</p>
            </div>
        </div>
    )
}

export default Act