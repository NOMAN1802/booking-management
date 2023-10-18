import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
const useHost = () => {
    const {user,loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: isHost, isLoading: isHostLoading} = useQuery({
        queryKey: ['isHost', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/host/${user?.email}`);
            console.log('is host response', res);
            return res.data.host;
        }
    })
    return [isHost, isHostLoading]
};
export default useHost;