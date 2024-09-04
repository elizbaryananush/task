import { actService } from "@/services/act.service";
import { useQuery } from "@tanstack/react-query";

export function useAct(id: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['getActById'],
        queryFn: () => actService.getActById(id)
    })

    return { data, isLoading }
}