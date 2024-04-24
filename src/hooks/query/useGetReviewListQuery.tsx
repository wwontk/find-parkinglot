import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useQuery } from "@tanstack/react-query";

const fetchReviews = async (prkplceNo: string) => {
  const q = query(
    collection(db, "Reviews"),
    where("prkplceNo", "==", prkplceNo)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
};

const useGetReviewListQuery = (prkplceNo: string) => {
  const {
    data: reviewListData,
    isLoading: reviewListDataIsLoading,
    isError: reviewListDataIsError,
  } = useQuery({
    queryKey: ["reviews", prkplceNo],
    queryFn: () => fetchReviews(prkplceNo),
  });

  return {
    reviewListData,
    reviewListDataIsLoading,
    reviewListDataIsError,
  };
};

export default useGetReviewListQuery;
