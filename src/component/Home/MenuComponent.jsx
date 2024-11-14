import { Favorite, Search, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, Container, IconButton, Stack, Typography, useScrollTrigger } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"
import { cloneElement, useContext, useState } from "react";
import { DataContext } from "../../Utils/Function";
import SearchMenuComponent from "../Search/SearchMenuComponent";
// import styled from "@emotion/styled";

MenuComponent.propTypes = {
    toggleCartDrawer: PropTypes.func
}
ElevationScroll.propTypes = {
    children: PropTypes.element,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return children
        ? cloneElement(children, {
            style: {
                position: trigger ? "fixed" : "static",

            },
            elevation: trigger ? 4 : 0,
        })
        : null;
}

export default function MenuComponent({ toggleCartDrawer }, props) {
    const [searchAnchor, setSearchAnchor] = useState(null)
    const { totalQuantity, favoriteItems } = useContext(DataContext);
    const page = ["Home", "About", "Categories"];
    const navigate = useNavigate();

    const handleSearchOnClick = (e) => {
        setSearchAnchor(e.target)
    }
    const handleSearchClose = () => {
        setSearchAnchor(null)
    }

    return (
        <ElevationScroll {...props}>
            <AppBar sx={{ zIndex: 999 }} position="static">
                <Container sx={{ py: "0.5rem" }} maxWidth="xl">
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}>
                        <Stack direction={"row"}>
                            {page.map((item) => (
                                <Button
                                    key={item}
                                    sx={{ color: 'white', display: 'block' }}
                                    onClick={() => {
                                        navigate(item == "Home" ? "/" : item);
                                        window.scroll(0, 0)
                                    }}
                                >
                                    {item}
                                </Button>
                            ))}
                        </Stack>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 3,
                                display: 'block',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Tiệm Điện Hippo
                        </Typography>
                        <Stack direction={"row"}>
                            <IconButton
                                onClick={handleSearchOnClick}
                                sx={{ color: "white" }}>
                                <Search />
                            </IconButton>
                            <SearchMenuComponent anchorSearch={searchAnchor} handleCloseSearch={handleSearchClose} />
                            <IconButton
                                sx={{ color: "white" }}
                                onClick={() => {
                                    navigate("/Favorites");
                                    window.scrollTo(0, 0)
                                }}
                            >
                                <Badge badgeContent={favoriteItems.length} color="secondary">
                                    <Favorite />
                                </Badge>
                            </IconButton>
                            <IconButton
                                sx={{ color: "white" }}
                                onClick={toggleCartDrawer(true)}
                            >
                                <Badge badgeContent={totalQuantity} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </Stack>
                    </Box>
                </Container>
            </AppBar >
        </ElevationScroll>
    )
}