import { Close, Delete, ProductionQuantityLimits } from "@mui/icons-material"
import { Avatar, Box, Button, ButtonGroup, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, Paper, Stack, TextField, Typography } from "@mui/material"
import PropTypes from "prop-types"
import { useContext } from "react"
import { DataContext, VND } from "../../Utils/Function"
import { toast } from "react-toastify"

CartDrawerComponent.propTypes = {
    drawerState: PropTypes.bool,
    toggleDrawerState: PropTypes.func
}


export default function CartDrawerComponent({ drawerState, toggleDrawerState }) {
    const { cartItem, setCartItem, handleUpdateQuantity, subTotal } = useContext(DataContext)
    const handleRemoveItem = (id, name) => {
        setCartItem(cartItem.filter((e) => e.data.documentId != id));
        toast.success((() =>
            <Typography>Đã xóa sản phẩm <b>{name}</b></Typography>
        ))
    }
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
                        <Stack justifyContent={"center"} spacing={3} alignItems={"center"}>
                            <ProductionQuantityLimits sx={{ width: "50%", height: "50%" }} color="warning" />
                            <Typography fontWeight={600}>Không có sản phẩm nào trong giỏ hàng</Typography>
                            <Button variant="contained" color="secondary">Return to shop</Button>
                        </Stack> :
                        <>
                            <Box sx={{ width: "100%" }}>
                                <List sx={{ p: 1 }}>
                                    {cartItem.map((item, key) => (
                                        <ListItem alignItems="flex-start" key={key}>
                                            <ListItemAvatar>
                                                <Avatar component={Paper} src={import.meta.env.VITE_API_URL + item.data.image.url} />
                                            </ListItemAvatar>
                                            <Stack spacing={1} direction={"column"} alignItems={"start"} flexGrow={"1"}>
                                                <Typography fontWeight={"bold"}>
                                                    {item.data.name}
                                                </Typography>
                                                <Stack alignItems={"start"}>
                                                    <Typography alignSelf={"end"}>
                                                        {item.quantity} x {VND.format(item.data.price)}
                                                    </Typography>
                                                    <ButtonGroup>
                                                        <Button onClick={() => handleUpdateQuantity("dec", item.data.documentId)}>-</Button>
                                                        <TextField
                                                            value={item.quantity}
                                                            size="small"
                                                            slotProps={{ input: { readOnly: true, } }}
                                                            sx={{ width: "6ch" }}
                                                        />
                                                        <Button onClick={() => handleUpdateQuantity("ins", item.data.documentId)}>+</Button>
                                                    </ButtonGroup>
                                                </Stack>
                                            </Stack>
                                            <IconButton sx={{ marginLeft: "auto", alignSelf: "center" }} onClick={() => handleRemoveItem(item.data.documentId, item.data.name)}>
                                                <Delete />
                                            </IconButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
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