import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { UserProps } from "../../6entities/session/model";
import { firestore } from "../firebase/config";
import { getUser } from "./user";

const auth = getAuth();

export const signup = async (
  email: string,
  login: string,
  password: string
) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  const userLayout: UserProps = {
    login: login,
    email: email,
    id: user.uid,
    img: "",
  };

  await setDoc(doc(firestore, "users", user.uid), userLayout);

  return userLayout;
};

export const signin = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  const currentUser = await getUser(user.uid);
  return currentUser;
};
