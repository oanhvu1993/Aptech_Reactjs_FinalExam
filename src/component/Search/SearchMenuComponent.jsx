import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Menu, Paper, TextField } from "@mui/material";
import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import { convertVie, fetchData, VND } from "../../Utils/Function";
import { useNavigate } from "react-router-dom";

SearchMenuComponent.propTypes = {
    anchorSearch: PropTypes.object,
    handleCloseSearch: PropTypes.func
}

export default function SearchMenuComponent({ anchorSearch = null, handleCloseSearch }) {
    const [products, setProucts] = useState([])
    const openSearch = Boolean(anchorSearch);
    const [searchInput, setSearchInput] = useState("")
    const ITEM_HEIGHT = 50;
    const navigate = useNavigate();
    useEffect(() => {
        fetchData("/api/products?populate=*&pagination[pageSize]=999")
            .then(res => setProucts(res.data))
    }, [])

    return (
        <Menu
            anchorEl={anchorSearch}
            open={openSearch}
            onClose={handleCloseSearch}
            slotProps={{
                paper: {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem",
                        maxHeight: ITEM_HEIGHT * 5,
                        width: "50ch",
                        flexDirection: "column",
                        textAlign: "center"
                    }
                }
            }}
        >
            <TextField
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                label="Nhập từ khóa để tìm"
                size="small"
            />
            <List>
                {
                    products?.filter((e) => convertVie(e.name).toLowerCase().includes(convertVie(searchInput).toLocaleLowerCase())).length <= 0 ?
                        <ListItem>
                            <ListItemText primary="Không có kết quả phù hợp" />
                        </ListItem> :
                        products?.filter((e) => convertVie(e.name).toLocaleLowerCase().includes(convertVie(searchInput).toLocaleLowerCase())).map((item, key) => (
                            <ListItem key={key}>
                                <ListItemButton onClick={() => {
                                    navigate(`/Products/${item.documentId}`);
                                    handleCloseSearch();
                                    window.scrollTo(0, 0)
                                }}>
                                    <ListItemAvatar>
                                        <Avatar component={Paper} src={import.meta.env.VITE_API_URL + item.image.url} />
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary={VND.format(item.price)} />
                                </ListItemButton>
                            </ListItem>
                        ))
                }
            </List>
        </Menu>
    )
}