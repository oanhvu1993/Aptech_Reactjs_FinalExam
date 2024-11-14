import { Close, ProductionQuantityLimits } from "@mui/icons-material"
import { Box, Button, Divider, Drawer, IconButton, Paper, Stack, Typography } from "@mui/material"
import PropTypes from "prop-types"
import { useContext } from "react"
import { DataContext, VND } from "../../Utils/Function"
import CartItemListComponent from "./CartItemListComponent"

CartDrawerComponent.propTypes = {
    drawerState: PropTypes.bool,
    toggleDrawerState: PropTypes.func
}


export default function CartDrawerComponent({ drawerState, toggleDrawerState }) {
    const { cartItem,
        subTotal
    } = useContext(DataContext)
    return (
        <Drawer
            anchor="right"
            open={drawerState}
            onClose={toggleDrawerState(false)}
            variant="temporary"
        >
            <Box sx={{ display: "flex", flexDirection: "column", width: 350, height: "100%" }}>
                <Stack
                    sx={{
                        position: "sticky",
                        background: "white",
                        top: 0,
                        zIndex: 3,
                    }}
                >
                    <IconButton
                        onClick={toggleDrawerState(false)}
                        sx={{ position: "absolute" }}
                    >
                        <Close />
                    </IconButton>
                    <Typography
                        fontSize={24}
                        fontWeight={600}
                        textAlign={"center"}
                        component={"h3"}
                        color="primary"
                    >
                        Cart
                    </Typography>
                    <Divider />
                </Stack>
                {
                    cartItem.length == 0 ?
                        // *********************If cart has no item**********************
                        <Stack justifyContent={"center"} spacing={3} alignItems={"center"}>
                            <ProductionQuantityLimits sx={{ width: "50%", height: "50%" }} color="warning" />
                            <Typography fontWeight={600}>Không có sản phẩm nào trong giỏ hàng</Typography>
                            <Button variant="contained" color="secondary">Return to shop</Button>
                        </Stack> :
                        //*********************If cart has item ******************************/
                        <>
                            <CartItemListComponent />
                            {/* **********Order button**************** */}
                            <Stack
                                component={Paper}
                                sx={{
                                    marginTop: "auto",
                                    position: "sticky",
                                    bottom: 0,
                                    background: "white",
                                    p: 2
                                }}
                                spacing={1}>
                                <Stack justifyContent={"space-between"} direction={"row"}>
                                    <Typography>
                                        <b>Tổng:</b>
                                    </Typography>
                                    <Typography>
                                        {VND.format(subTotal)}
                                    </Typography>
                                </Stack>
                                <Button variant="contained">Đặt hàng</Button>
                            </Stack>
                        </>
                }
            </Box>
        </Drawer >
    )
}