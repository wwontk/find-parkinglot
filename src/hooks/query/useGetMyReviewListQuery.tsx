import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useQuery } from "@tanstack/react-query";

const fetchReviews = async (useruid: string) => {
  const q = query(collection(db, "Reviews"), where("useruid", "==", useruid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
};

const useGetMyReviewListQuery = (useruid: string) => {
  const {
    data: myReviewListData,
    isLoading: myReviewListDataIsLoading,
    isError: myReviewListDataIsError,
  } = useQuery({
    queryKey: ["reviews", useruid],
    queryFn: () => fetchReviews(useruid),
  });

  return {
    myReviewListData,
    myReviewListDataIsLoading,
    myReviewListDataIsError,
  };
};

export default useGetMyReviewListQuery;
