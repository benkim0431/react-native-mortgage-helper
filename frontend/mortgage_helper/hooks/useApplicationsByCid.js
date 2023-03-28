import {useQuery} from 'react-query';
import {getApplicationsByCid} from '../api/application';

export default function useApplicationsByCid(cid) {
  // console.log('Run useQuery');
  return useQuery(
    ['applicatonsByCid', cid],
    () => getApplicationsByCid(cid),
    {},
  );
}
