import { connectionService } from "@/services/connection.service";
import { useQuery } from "@tanstack/react-query";

export function useFollowings() {
    const { data, isLoading } = useQuery({
        queryKey: ['getAllFollowings'],
        queryFn: () => connectionService.getAllFollowings()
    })

    const followingData = data;
    const followingIsLoading = isLoading;

    return { followingData, followingIsLoading }
}