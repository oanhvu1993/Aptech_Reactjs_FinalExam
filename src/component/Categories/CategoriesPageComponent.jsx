import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchData } from "../../Utils/Function";
import CategoriesComponent from "./CategoriesComponent";
import { useParams } from "react-router-dom";
import ProductsComponent from "../Products/ProductsComponent";

export default function CategoriesPageComponent() {
    const [categories, setCategories] = useState([])
    const { id } = useParams();
    useEffect(() => {
        fetchData("/api/categories?populate=*")
            .then(res => setCategories(res.data));
    }, [])



    // console.log(categories[0]?.name)
    return (
        <Container sx={{py: "2rem"}}>
            <CategoriesComponent data={categories} />
            {
                !id ?
                    categories?.map((item, key) =>
                        (< ProductsComponent key={key} showHeading={true} categoryFilter={item.documentId} heading={item.name} />)
                    )
                    :
                    <ProductsComponent showHeading={true} categoryFilter={id} />
            }
        </Container>
    )
}