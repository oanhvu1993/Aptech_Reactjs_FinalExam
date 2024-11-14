import { Stack } from "@mui/material";
import CategoryComponent from "./CategoryComponent";
import PropTypes from "prop-types"

CategoriesComponent.propTypes = {
    data: PropTypes.array
}


export default function CategoriesComponent({ data }) {
    return (
        <Stack marginBottom={"40px"} justifyContent={"space-around"} direction={"row"}>
            {
                data?.map((item, key) => (
                    <CategoryComponent
                        key={key}
                        categoryData={item}
                    />
                ))
            }
        </Stack>
    )
}