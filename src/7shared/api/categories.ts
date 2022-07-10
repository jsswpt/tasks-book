import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/config";

import {
  AddCategoryProps,
  ChangeIconProps,
  RemoveProps,
} from "../../6entities/categories/model";
import { getRandomId } from "../utils/getRandomId";
import { CategoryProps } from "../../6entities/interfaces";

import { RenameProps } from "../../6entities/categories/model";

export const getCategories = async (userid: string) => {
  const categoriesQuery = query(
    collection(firestore, "categories"),
    where("userid", "==", userid)
  );
  const categoriesDocs = await getDocs(categoriesQuery);
  const categories = categoriesDocs.docs.map((item) => item.data());
  return categories as CategoryProps[];
};

export const addCategory = async ({
  categoryIcon,
  categoryName,
  userid,
}: AddCategoryProps) => {
  const categoryLayout: CategoryProps = {
    icon: categoryIcon,
    id: getRandomId(),
    title: categoryName,
    userid: userid,
  };

  await setDoc(
    doc(firestore, "categories", categoryLayout.id.toString()),
    categoryLayout
  );

  return categoryLayout;
};

export const changeIcon = async ({ icon, categoryId }: ChangeIconProps) => {
  const categoryResp = await getDoc(doc(firestore, "categories", categoryId));
  const categorySnap = categoryResp.data() as CategoryProps;

  const newCategory: CategoryProps = {
    icon: icon,
    id: categorySnap.id,
    title: categorySnap.title,
    userid: categorySnap.userid,
  };

  await setDoc(
    doc(firestore, "categories", categorySnap.id.toString()),
    newCategory
  );

  return newCategory;
};

export const renameCategory = async ({ newName, category }: RenameProps) => {
  await updateDoc(doc(firestore, "categories", category.id.toString()), {
    title: newName,
  });
};

export const removeCategory = async ({ categoryId }: RemoveProps) => {
  await deleteDoc(doc(firestore, "categories", categoryId.toString()));

  const tasksQuery = query(
    collection(firestore, "tasks"),
    where("categoryid", "==", categoryId.toString())
  );

  const tasksResp = await getDocs(tasksQuery);

  const tasksSnap = tasksResp.docs.map((item) =>
    item.data()
  ) as CategoryProps[];

  tasksSnap.forEach(async (item) => {
    await deleteDoc(doc(firestore, "tasks", item.id.toString()));
  });
};
