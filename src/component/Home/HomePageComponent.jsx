import { useEffect, useState } from "react";
import CategoriesComponent from "../Categories/CategoriesComponent";
import ProductsComponent from "../Products/ProductsComponent";
import { fetchData } from "../../Utils/Function";
import BannerComponent from "./BannerComponent";
import { Box, CircularProgress } from "@mui/material";

export default function HomePageComponent() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetch = async () => {
            await fetchData("/api/categories?populate=*")
                .then(res => setCategories(res.data));
            await fetchData("/api/products?populate=*")
                .then(res => setProducts(res.data));
            setLoading(false);
        }
        fetch();
    }, [])

    return (
        <>
            {loading ?
                <Box sx={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100vh", display: 'flex' }}>
                    <CircularProgress />
                </Box> :
                <>
                    <BannerComponent />
                    <CategoriesComponent data={categories} />
                    <ProductsComponent showHeading={true} productsData={products} />
                </>
            }

        </>
    )
}