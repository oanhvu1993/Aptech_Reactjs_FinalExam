import { Card, CardActionArea, CardContent, CardMedia, Rating, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types"
import { VND } from "../../Utils/Function";
import { useNavigate } from "react-router-dom";

ProductComponent.propTypes = {
    productData: PropTypes.object,
    cardWidth: PropTypes.number,
    cardImgHeight: PropTypes.string,
    cardFontSize: PropTypes.string
}

export default function ProductComponent({
    productData,
    cardWidth = 345,
    cardImgHeight = "300px",
    cardFontSize = "2vw"
}) {
    const navigate = useNavigate();
    return (
        <Card sx={{ width: cardWidth }}>
            <CardActionArea
                onClick={() => {
                    navigate(`/Products/${productData.documentId}`);
                    window.scrollTo(0, 0)
                }}
                sx={{ height: "100%" }}>
                <CardMedia
                    component="img"
                    height={cardImgHeight}
                    image={import.meta.env.VITE_API_URL + productData?.image?.url}
                    alt={productData.name}
                />
                <CardContent>
                    <Typography fontSize={cardFontSize} gutterBottom variant="h5" component="div">
                        {productData.name}
                    </Typography>
                    <Stack spacing={1} direction={"row"}>
                        <Rating
                            readOnly
                            value={
                                Math.round(productData.reviews.reduce((acc, curr) => acc + curr.rating, 0) / productData.reviews.length)
                            }
                        />
                        <Typography>{productData.reviews.length}</Typography>
                    </Stack>
                    <Typography variant="body1" color="info">
                        {VND.format(productData.price)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}