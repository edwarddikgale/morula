import { useLocation } from 'react-router-dom';

const useQueryParameter = (parameterName: string) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  return queryParams.get(parameterName);
};

export default useQueryParameter;
