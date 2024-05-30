import React, { useContext, useEffect, useRef } from "react";
import UseDetailedContext from "../context/UseDetailedContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllPropertiesSold } from "../utils/api";

const usePropertiesSold = () => {
  const { userDetails, setUserDetails } = useContext(UseDetailedContext);
  const queryRef = useRef();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "AllPropertiesSold",
    queryFn: () => getAllPropertiesSold(),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, favourites: data })),
    staleTime: 30000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default usePropertiesSold;