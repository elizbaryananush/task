import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
    const { data, isLoading } = useQuery({
        queryKey: ['myprofileinfo'],
        queryFn: () => userService.getProfile()
    })

    return { data, isLoading }
}