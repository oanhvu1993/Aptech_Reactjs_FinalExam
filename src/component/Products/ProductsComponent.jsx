import { Container, Divider, Stack } from "@mui/material";
import PropTypes from "prop-types"
import ProductComponent from "./ProductComponent";
import { useEffect, useState } from "react";
import { fetchData } from "../../Utils/Function";

ProductsComponent.propTypes = {
    heading: PropTypes.string,
    categoryFilter: PropTypes.string,
    showHeading: PropTypes.bool,
    productsData: PropTypes.array
}


export default function ProductsComponent({ productsData, heading = "Sản phẩm nổi bật", categoryFilter, showHeading = false }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        categoryFilter && fetchData(`/api/products?populate=*&filters[category][documentId]=${categoryFilter}`)
            .then(res => setProducts(res.data));

        productsData && setProducts(productsData);
    }, [productsData, categoryFilter])


    return (
        <Container sx={{ marginBottom: "40px" }}>
            {
                showHeading &&
                <Divider
                    sx={{ marginBottom: "20px" }}
                    component={"h1"}
                    textAlign="left"
                >
                    {!categoryFilter ? heading : products[0]?.category.name}
                </Divider>
            }
            <Stack
                spacing={4}
                direction={"row"}
                useFlexGap
                sx={{ flexWrap: 'wrap' }}
            >
                {
                    products?.map((item, key) => (
                        <ProductComponent key={key} productData={item} />
                    ))
                }

            </Stack>
        </Container>
    )
}