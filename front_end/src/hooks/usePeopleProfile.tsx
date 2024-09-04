import { actService } from "@/services/act.service";
import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function usePeopleProfile(username: string) {
    const thisData = {
        username ,
    }
    const { data, isLoading } = useQuery({
        queryKey: ['getActById'],
        queryFn: () => userService.getByUsername(thisData)
    })

    return { data, isLoading }
}