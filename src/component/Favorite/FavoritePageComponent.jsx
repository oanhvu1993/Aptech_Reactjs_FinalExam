import { Delete } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, IconButton, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { DataContext, VND } from "../../Utils/Function";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useNavigate } from "react-router-dom";

export default function FavoritePageComponent() {
    const navigate = useNavigate();
    const { favoriteItems, setFavoriteItems } = useContext(DataContext);
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const handleRemoveItem = (item) => {
        setFavoriteItems(favoriteItems.filter((e) => e.documentId != item))
    }
    return (
        <Container
            sx={{ display: "flex", flexDirection: "column", p: 6, gap: 3 }}
        >
            <Typography variant="h4">Sản phẩm yêu thích</Typography>
            <Container>
                {favoriteItems.length <= 0 ? <Typography>Chưa có sản phẩm yêu thích</Typography> :
                    favoriteItems.map((item, key) => (
                        <Accordion key={key} expanded={expanded === item.documentId} onChange={handleChange(item.documentId)}>
                            <AccordionSummary
                                sx={{ '& .MuiAccordionSummary-content': { alignItems: "center" } }}
                            >
                                <IconButton onClick={() => handleRemoveItem(item.documentId)} >
                                    <Delete />
                                </IconButton>
                                <Typography variant="h6" sx={{ ml: 2, width: '33%', flexShrink: 0 }}>
                                    {item.name}
                                </Typography>
                                <Typography sx={{ marginLeft: 4, color: 'text.secondary' }}>{VND.format(item.price)}</Typography>

                                <Button
                                    onClick={() => navigate(`/Products/${item.documentId}`)}
                                    variant="contained" sx={{ marginLeft: "auto" }}>
                                    Chi tiết
                                </Button>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{ display: "flex" }}
                            >
                                <Box
                                    sx={{ width: "33%", height: "100%", boxShadow: "1px 1px 5px grey" }}
                                    component={"img"}
                                    src={import.meta.env.VITE_API_URL + item.image.url}
                                />
                                <Box
                                    sx={{ width: "66%", marginLeft: 5 }}
                                >
                                    <BlocksRenderer content={item.desc} />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </Container>

        </Container>
    )
}