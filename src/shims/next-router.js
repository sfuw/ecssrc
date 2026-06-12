import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';

export const useRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const query = Object.fromEntries(searchParams.entries());
  // merge URL params into query
  Object.assign(query, params);

  return {
    pathname: location.pathname,
    query,
    push: (href) => navigate(href),
    replace: (href) => navigate(href, { replace: true }),
    back: () => navigate(-1),
    asPath: location.pathname + location.search,
  };
};

export default { useRouter };
