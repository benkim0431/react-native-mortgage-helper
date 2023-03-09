import {useQuery} from 'react-query';
import {getApplicationsByCid} from '../api/application';

export default function useApplicationsByCid(cid) {
  return useQuery(['applicatonsByCid', cid], () => getApplicationsByCid(cid));
}
