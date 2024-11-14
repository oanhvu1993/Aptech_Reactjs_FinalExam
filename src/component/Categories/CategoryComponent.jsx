import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";

CategoryComponent.propTypes = {
    categoryData: PropTypes.object
}

export default function CategoryComponent({ categoryData }) {
    const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea
                onClick={() => {
                    navigate(`/Categories/${categoryData.documentId}`);
                    window.scrollTo(0, 0)
                }}
            >
                <CardMedia
                    component="img"
                    height="140"
                    image={import.meta.env.VITE_API_URL + categoryData.image.url}
                    alt={categoryData.name}
                />
                <CardContent sx={{
                    width: "100%",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                    <Typography textAlign={"center"} fontWeight={"600"} color="red" variant="h5" component="div">
                        {categoryData.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}