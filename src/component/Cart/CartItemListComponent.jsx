import { Avatar, Box, Button, ButtonGroup, IconButton, List, ListItem, ListItemAvatar, Paper, Stack, TextField, Typography } from "@mui/material";
import { DataContext, VND } from "../../Utils/Function";
import { useContext } from "react";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";


export default function CartItemListComponent() {
    const { handleUpdateQuantity, setCartItem, cartItem } = useContext(DataContext)
    const handleRemoveItem = (id, name) => {
        setCartItem(cartItem.filter((e) => e.data.documentId != id));
        toast.success((() =>
            <Typography>Đã xóa sản phẩm <b>{name}</b></Typography>
        ))
    }
    return (
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
    )
}