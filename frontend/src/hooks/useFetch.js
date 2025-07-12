import {useQuery} from '@tanstack/react-query'
import axiosInstance from '../api/axios';

const useFetch = (key, url) => {
    return useQuery({
        queryKey:[key,url],
        queryFn:async()=>{
            const response = await axiosInstance.get(url)
            return response.data;
        },
    });
};

export default useFetch;

