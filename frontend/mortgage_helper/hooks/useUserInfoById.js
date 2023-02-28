import {useQuery} from 'react-query';
import {getUserById} from '../api/user';

export default function useUserInfoById(id) {
  return useQuery(['userInfoById', id], () => getUserById(id));
}
