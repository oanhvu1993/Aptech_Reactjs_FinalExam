import { Badge, Box, Breadcrumbs, CircularProgress, Container, Divider, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext, fetchData } from "../../Utils/Function";
import ProductsRelatedComponent from "./ProductsRelatedComponent";
import CommentRatingComponent from "../Comment/CommentRatingComponent";
import ProductDetailContentComponent from "./ProductDetailContentComponent";


export default function ProductDetailPageComponent() {
    const { update } = useContext(DataContext)
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetch = () => {
            fetchData(`/api/products/${id}?populate=*`)
                .then(res => {
                    setProduct(res.data);
                    setLoading(false);
                })
        }
        fetch();
    }, [id, update])

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
                        {/* Render Product detail */}
                        <ProductDetailContentComponent product={product} />
                        <Divider sx={{ marginBottom: 3 }} />
                        {/* Render Product Rating and Comment */}
                        <CommentRatingComponent productId={id} />
                        <Divider sx={{ marginBottom: 3 }} />
                        {/* render Product related */}
                        <ProductsRelatedComponent productId={product?.documentId} categoryId={product?.category?.documentId} />
                    </Paper>
                </Container >
            }
        </>
    )
}