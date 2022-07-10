import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoryChangeIcon } from "../../../5features/category-change-icon/category-change-icon";
import { CategoryRemove } from "../../../5features/category-remove/category-remove";
import { CategoryRename } from "../../../5features/category-rename/category-rename";
import { CategoryProps } from "../../../6entities/interfaces";
import { IconSelector } from "../../../7shared/ui/icon-selector/icon-selector";

import styles from "../menu.module.css";

interface MenuItemProps {
  category: CategoryProps;
}

export const MyMenuItem: FC<MenuItemProps> = ({ category }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { categoryid } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (evt: any) => {
    setIsOpen(true);
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  return (
    <Box
      component="li"
      sx={{
        ":not(:last-child)": { marginBottom: "10px" },
      }}
      onContextMenu={(evt: any) => {
        evt.preventDefault();
        handleOpen(evt);
      }}
    >
      <Link to={`/tasks/${category.id}`}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginRight: "10px",
            }}
          >
            <Box sx={{ marginRight: "10px" }}>
              <Box
                sx={{
                  width: "18px",
                  height: "18px",
                }}
              >
                <IconSelector name={category.icon} />
              </Box>
            </Box>
            <Typography
              sx={{
                fontFamily: "Nunito",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "22px",
                color: "#F9F9F9",
                width: "100%",
                wordBreak: "break-word",
              }}
            >
              {category.title}
            </Typography>
          </Box>

          {categoryid === category.id && (
            <Box
              sx={{
                width: "30px",
                height: "18px",
                background: "#3F88C5",
                borderRadius: "10px 0px 0px 10px",
              }}
            ></Box>
          )}
        </Box>
      </Link>
      <Menu
        open={true}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          maxWidth: "300px",
          display: isOpen ? "block" : "none",
        }}
      >
        <MenuItem onClick={() => setIsOpen(false)}>
          <CategoryChangeIcon category={category}>
            Изменить иконку
          </CategoryChangeIcon>
        </MenuItem>
        <MenuItem onClick={() => setIsOpen(false)}>
          <CategoryRename category={category}>
            Изменить имя категории
          </CategoryRename>
        </MenuItem>
        <MenuItem onClick={() => setIsOpen(false)}>
          <CategoryRemove category={category}>Удалить категорию</CategoryRemove>
        </MenuItem>
      </Menu>
    </Box>
  );
};
