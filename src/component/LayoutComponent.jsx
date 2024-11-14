import { Outlet } from "react-router-dom";
import MenuComponent from "./Home/MenuComponent";
import CartDrawerComponent from "./Cart/CartDrawerComponent";
import { useState } from "react";
import FooterPageComponent from "./Footer/FooterPageComponent";
import { Box } from "@mui/material";

export default function LayoutComponent() {
    const [cartOpen, setCartOpen] = useState(false)
    const toggleCartDrawer = (value) => () => {
        setCartOpen(value);
    }
    return (
        <div>
            <MenuComponent toggleCartDrawer={toggleCartDrawer} />
            <CartDrawerComponent drawerState={cartOpen} toggleDrawerState={toggleCartDrawer} />
            <Box sx={{ minHeight: "100vh" }} component={"main"}>
                <Outlet />
            </Box>
            <FooterPageComponent />
        </div>
    )
}