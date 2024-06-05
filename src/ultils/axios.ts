// Importing InstanceData as a named export
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const InstanceData = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getDataPlaceHolder = async () => {
    const res = await InstanceData.get('posts/1');
    return res.data;
};

export const useUserData = (autoRun: boolean = true) => {
    return useQuery({
        queryKey: ['userData'],
        queryFn: getDataPlaceHolder,
        enabled: autoRun,
        refetchInterval: autoRun ? 10000 : false,
    });
};
