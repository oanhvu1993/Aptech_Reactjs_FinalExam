import { Button, Container, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ReviewFormComponent from "./ReviewFormComponent";
import { DataContext, fetchData } from "../../Utils/Function";
import PropTypes from "prop-types"
import CommentRatingListComponent from "./CommentRatingListComponent";

CommentRatingComponent.propTypes = {
    productId: PropTypes.string,
    handleUpdateComment: PropTypes.func
}

export default function CommentRatingComponent({ productId }) {
    const [reviews, setReviews] = useState([])
    const { update, setUpdate } = useContext(DataContext)
    const [openReview, setOpenReview] = useState(false)
    const handleSumitComment1 = () => {
        setOpenReview(!openReview);
        setUpdate(!update);
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
                    // Open review form
                    openReview ? <ReviewFormComponent handleSumitComment={handleSumitComment1} productId={productId} /> :
                        // Open review section
                        <Container>
                            {reviews.length <= 0 ?
                                // if there is no review yet
                                <Typography>Chưa có đánh giá nào</Typography> :
                                // if there are some reviews
                                <CommentRatingListComponent reviews={reviews} />
                            }
                        </Container>
                }


            </Container>
        </Container >
    )
}