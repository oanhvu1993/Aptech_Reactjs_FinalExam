import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { fetchData } from "../../Utils/Function"
import { Container, Stack, Typography } from "@mui/material"
import ProductComponent from "./ProductComponent"

ProductsRelatedComponent.propTypes = {
    productId: PropTypes.string,
    categoryId: PropTypes.string
}

export default function ProductsRelatedComponent({ productId, categoryId }) {
    const [relatedProducts, setRelatedProducts] = useState([])
    useEffect(() => {
        const fetch = async () => {
            await fetchData(`/api/products?populate=*&filters[documentId][$ne]=${productId}&filters[category][documentId]=${categoryId}`)
                .then(res => setRelatedProducts(res.data.slice(0, 4)))
        }
        fetch();
    }, [productId, categoryId])

    return (
        <Container>
            <Typography marginBottom={2} variant={"h5"}>Sản phẩm liên quan</Typography>
            <Stack
                spacing={4}
                direction={"row"}
                useFlexGap
                sx={{ flexWrap: 'wrap' }}
            >
                {
                    relatedProducts.map((item, key) => (
                        <ProductComponent key={key} productData={item} cardWidth={200} cardImgHeight="200px" cardFontSize="1.5vw" />
                    ))
                }
            </Stack>
        </Container>
    )
}