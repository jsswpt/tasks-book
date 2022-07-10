import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";

export const getUser = async (userid: string) => {
  const usersRef = doc(firestore, "users", userid);
  const userDoc = await getDoc(usersRef);
  const user = userDoc.data();
  return user;
};
