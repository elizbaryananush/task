import { useFollowers } from "./useFollowers";
import { useFollowings } from "./useFollowings";

export function useStatus(username: string) {
    const { followerData, followerIsLoading } = useFollowers()
    const { followingData, followingIsLoading } = useFollowings()

    if (followerData?.some(item => item.username === username)) {
        if (followingData?.some(item => item.username === username)) {
            return { status: 'following' }
        } else {
            return { status: 'follow back' }
        }
    } else if (followingData?.some(item => item.username === username)) {
        return { status: 'following' }
    } else {
        return { status: 'follow' }
    }
}