import { Avatar, Box, Button, Container, List, ListItem, ListItemAvatar, Rating, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ReviewFormComponent from "./ReviewFormComponent";
import { DataContext, fetchData } from "../../Utils/Function";
import PropTypes from "prop-types"

CommentRatingComponent.propTypes = {
    productId: PropTypes.string,
    handleUpdateComment: PropTypes.func
}

export default function CommentRatingComponent({ productId, handleUpdateComment }) {
    const [reviews, setReviews] = useState([])
    const { update } = useContext(DataContext)
    const [openReview, setOpenReview] = useState(false)
    const handleSumitComment1 = () => {
        setOpenReview(!openReview);
        handleUpdateComment();
    }
    useEffect(() => {
        const fetch = async () => {
            await fetchData(`/api/reviews?populate=*&sort[0]=createdAt:desc&filters[product][documentId]=${productId}`)
                .then(res => {
                    setReviews(res.data);
                })
        }
        fetch();
    }, [productId, update])
    const toggleReviewForm = () => {
        setOpenReview(!openReview)
    }
    return (
        <Container>
            <Typography marginBottom={2} variant={"h5"}>Khách hàng đánh giá</Typography>
            <Container direction={"column"} component={Stack}>
                <Button onClick={toggleReviewForm} sx={{ alignSelf: "end" }}>Viết đánh giá</Button>
                {
                    openReview ? <ReviewFormComponent handleSumitComment={handleSumitComment1} productId={productId} /> :
                        <Container>
                            {reviews.length <= 0 ? <Typography>Chưa có đánh giá nào</Typography> :
                                < Box >
                                    <List sx={{ overflow: "auto", width: "100%", maxHeight: "300px" }} >
                                        {reviews.map((item, key) => (
                                            <ListItem key={key} alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar src="..." />
                                                </ListItemAvatar>
                                                <Stack>
                                                    <Typography variant="h6">
                                                        {item.reviewer == null || item.reviewer == "" ? "Anonymous" : item.reviewer}
                                                    </Typography>
                                                    <Rating
                                                        size="small"
                                                        readOnly
                                                        value={item.rating}
                                                    />
                                                    <Typography>
                                                        {item.comment}
                                                    </Typography>
                                                </Stack>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            }
                        </Container>
                }


            </Container>
        </Container >
    )
}