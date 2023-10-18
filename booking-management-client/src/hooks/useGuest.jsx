import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
const useGuest = () => {
    const {user,loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: isGuest, isLoading: isGuestLoading} = useQuery({
        queryKey: ['isGuest', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/guest/${user?.email}`);
            console.log('is guest response', res);
            return res.data.guest;
        }
    })
    return [isGuest, isGuestLoading]
};
export default useGuest;