import { connectionService } from "@/services/connection.service";
import { useQuery } from "@tanstack/react-query";

export function useFollowers() {
    const { data, isLoading } = useQuery({
        queryKey: ['getAllFollowers'],
        queryFn: () => connectionService.getAllFollowers()
    })

    const followerData = data;
    const followerIsLoading = isLoading;

    return { followerData, followerIsLoading }
}