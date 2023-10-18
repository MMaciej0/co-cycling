import { useSearchParams, useRouter } from 'next/navigation';
import qs from 'query-string';

type Param = {
  [key: string]: string | number | null;
};

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const parseQuery = () => qs.parse(searchParams.toString());

  const updateQuery = (url: string, newParam: Param) => {
    const currentQuery = parseQuery();
    let updatedQuery = {};

    if (currentQuery) {
      updatedQuery = {
        ...currentQuery,
        ...newParam,
      };
    }

    const newUrl = qs.stringifyUrl(
      {
        url,
        query: updatedQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(newUrl);
  };

  const deleteParam = (url: string, param: string) => {
    const currentQuery = parseQuery();
    if (currentQuery) {
      delete currentQuery[param];
    }
    const newUrl = qs.stringifyUrl(
      {
        url,
        query: currentQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(newUrl);
  };

  return { parseQuery, updateQuery, deleteParam };
};

export default useQueryParams;
