import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../1app/store";
import Logo from "../../7shared/assets/Logo.svg";
import { Loader } from "../../7shared/ui/Loader";
import { MyMenuItem } from "./ui/my-menu-item";

import styles from "./menu.module.css";

import { CategoryAdd } from "../../5features/category-add/category-add";
import { getAuth, signOut } from "firebase/auth";
import { signOutThunk } from "../../6entities/session/model";
import { MdLogout } from "react-icons/md";

export const Menu = () => {
  const { categories, isLoading } = useAppSelector((state) => state.categories);

  const dispatch = useAppDispatch();

  const sessionSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      dispatch(signOutThunk());
    });
  };

  return (
    <nav className={styles.menu}>
      <div className={styles.menu_container}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.top}>
              <Link to="/">
                <div className={styles.top_container}>
                  <img src={Logo} alt="Logo" />
                  <p className={styles.logo_text}>Tasks Book</p>
                </div>
              </Link>
            </div>
            <div className={styles.main}>
              <p className={styles.categories_title}>Категории</p>
              <div className={styles.list_container}>
                <ul className={styles.categories_list}>
                  {categories.map((item) => (
                    <MyMenuItem category={item} key={item.id} />
                  ))}
                </ul>
              </div>
              <CategoryAdd />
            </div>
            <div className={styles.footer}>
              <Button
                sx={{ width: "fit-content" }}
                onClick={sessionSignOut}
                startIcon={<MdLogout />}
              >
                Выйти
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
