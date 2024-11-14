import { Facebook, Favorite, FavoriteBorder, Instagram, LinkedIn, Pinterest, ShoppingCart, Twitter } from "@mui/icons-material";
import { Badge, Box, Breadcrumbs, Button, ButtonGroup, CircularProgress, Container, Divider, IconButton, Paper, Rating, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext, fetchData, VND } from "../../Utils/Function";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import ProductsRelatedComponent from "./ProductsRelatedComponent";
import { toast } from "react-toastify";
import CommentRatingComponent from "../Comment/CommentRatingComponent";


export default function ProductDetailPageComponent() {
    const { update, cartItem, setCartItem, favoriteItems, setFavoriteItems } = useContext(DataContext)
    const [loading, setLoading] = useState(true);
    const [ratingClick, setRatingClick] = useState(false);
    const [quantityInput, setQuantityInput] = useState(1);
    const [product, setProduct] = useState({});
    const [favorited, setFavorited] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        favoriteItems.find((e) => e.documentId == product.documentId) == null
            ? setFavorited(false) : setFavorited(true)
    }, [favoriteItems, product])

    useEffect(() => {
        const fetch = () => {
            fetchData(`/api/products/${id}?populate=*`)
                .then(res => {
                    setProduct(res.data);
                    setLoading(false);
                })
        }
        fetch();
    }, [id, ratingClick, update])

    const handleAddToCard = () => {
        if (cartItem.length == 0 || cartItem.find((e) => e.data.documentId == product.documentId) == null) {
            setCartItem(prev => [...prev,
            {
                data: product,
                quantity: quantityInput
            }])
            toast.info("Đã thêm sản phẩm vào giỏ hàng")
        } else {
            const nextCart = cartItem.map((item) => {
                if (item.data.documentId != product.documentId) {

                    return item
                } else {
                    return {
                        ...item, quantity: item.quantity + quantityInput
                    }
                }

            });
            setCartItem(nextCart);
            toast.info("Giỏ hàng đã cập nhật")
        }
    }

    const handleAddFavorite = () => {
        if (favoriteItems.length == 0 || favoriteItems.find((e) => e.documentId == product.documentId) == null) {
            setFavoriteItems(prev => [...prev, product])
        }
    }
    const handleUpdateComment1 = () => {
        setRatingClick(!ratingClick)
    }
    return (
        <>
            {loading ?
                <Box sx={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100vh", display: 'flex' }}>
                    <CircularProgress />
                </Box> :
                < Container >
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">
                            <Badge>Trang chủ</Badge>
                        </Link>
                        <Link
                            to="/Categories"
                        >
                            Categories
                        </Link>
                        <Link
                            to={`/ Categories / ${product?.category?.documentId}`}
                            aria-current="page"
                        >
                            {product?.category?.name}
                        </Link>
                    </Breadcrumbs>
                    <Paper sx={{ p: 8 }}>
                        <Stack spacing={10} justifyContent={"center"} direction={"row"}>
                            <Box
                                component={"img"}
                                sx={{
                                    width: "500px",
                                    height: "500px"
                                }}
                                src={import.meta.env.VITE_API_URL + product?.image?.url}
                            >
                            </Box>
                            <Stack spacing={3}>
                                <Stack spacing={1}>
                                    <Typography variant="h4">{product?.name}</Typography>
                                    <Stack spacing={1} direction={"row"}>
                                        <Rating
                                            readOnly
                                            value={
                                                Math.round(product?.reviews?.reduce((acc, curr) => acc + curr.rating, 0) / product?.reviews?.length)
                                            }
                                        />
                                        <Typography>{product.reviews?.length}</Typography>
                                    </Stack>
                                    <Typography color="info" variant="span">{VND.format(product?.price)}</Typography>
                                    <Typography variant="p">
                                        {product?.desc != null && <BlocksRenderer content={product?.desc} />}
                                    </Typography>
                                </Stack>
                                <Stack spacing={2} direction={"row"}>
                                    <ButtonGroup>
                                        <Button
                                            onClick={() => quantityInput > 1 && setQuantityInput(quantityInput - 1)}
                                        >-</Button>
                                        <TextField
                                            slotProps={
                                                {
                                                    htmlInput: {
                                                        style: {
                                                            textAlign: "center"
                                                        }
                                                    }
                                                }
                                            }
                                            value={quantityInput}
                                            sx={{ width: "6ch" }}
                                            size="small"
                                        />
                                        <Button
                                            onClick={() => setQuantityInput(quantityInput + 1)}
                                        >+</Button>
                                    </ButtonGroup>
                                    <IconButton
                                        onClick={() => {
                                            handleAddFavorite();
                                            toast.info(favorited ? "Đã có trong yêu thích" : "Đã thêm vào yêu thích")
                                        }}
                                        color="primary">
                                        {favorited ? <Favorite /> : < FavoriteBorder />}
                                    </IconButton>
                                    <Button onClick={handleAddToCard} variant="contained" startIcon={<ShoppingCart />}>Add To Card</Button>
                                </Stack>
                                <Divider />
                                <Stack>
                                    <Typography>
                                        <strong>Category: </strong>
                                        <span>{product?.category?.name}</span>
                                    </Typography>
                                    <Typography>
                                        <strong>Share: </strong>
                                        <IconButton>
                                            <Facebook />
                                        </IconButton>
                                        <IconButton>
                                            <Instagram />
                                        </IconButton>
                                        <IconButton>
                                            <LinkedIn />
                                        </IconButton>
                                        <IconButton>
                                            <Twitter />
                                        </IconButton>
                                        <IconButton>
                                            <Pinterest />
                                        </IconButton>
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Divider sx={{ marginBottom: 3 }} />
                        <CommentRatingComponent handleUpdateComment={handleUpdateComment1} productId={id} />
                        <Divider sx={{ marginBottom: 3 }} />
                        <ProductsRelatedComponent productId={product?.documentId} categoryId={product?.category?.documentId} />

                    </Paper>
                </Container >
            }
        </>
    )
}