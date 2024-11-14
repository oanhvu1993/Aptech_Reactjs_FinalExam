import { Container, Typography } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../Utils/Function";
import FavoriteItemListComponent from "./FavoriteItemListComponent";

export default function FavoritePageComponent() {
    const { favoriteItems } = useContext(DataContext);
    return (
        <Container
            sx={{ display: "flex", flexDirection: "column", p: 6, gap: 3 }}
        >
            <Typography variant="h4">Sản phẩm yêu thích</Typography>
            <Container>
                {favoriteItems.length <= 0 ?
                    // If there is no favorite item
                    <Typography>Chưa có sản phẩm yêu thích</Typography> :
                    // If there are some favorite items
                    <FavoriteItemListComponent />
                }
            </Container>

        </Container>
    )
}