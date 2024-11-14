import { Button, Container, Rating, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { postData } from "../../Utils/Function";
import PropTypes from "prop-types"

ReviewFormComponent.propTypes = {
    productId: PropTypes.string,
    handleSumitComment: PropTypes.func
}

export default function ReviewFormComponent({ productId, handleSumitComment }) {
    const [inputForm, setInputForm] = useState({
        name: "",
        rating: 5,
        comment: ""
    })
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInputForm(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleChangeRating = (e, newRating) => {
        setInputForm(prev => ({
            ...prev,
            rating: newRating
        }))
    }
    const handleSendForm = (e) => {
        e.preventDefault();
        postData("/api/reviews", {
            data: {
                reviewer: inputForm.name,
                comment: inputForm.comment,
                rating: inputForm.rating,
                product: {
                    connect: [productId]
                }
            }
        })
        handleSumitComment();
    }

    return (
        <Container sx={{ p: 2 }}>
            <Stack onSubmit={handleSendForm} spacing={1} component="form">
                <TextField sx={{ width: "20ch" }} size="small" label="Họ và tên" placeholder="Vui lòng nhập tên" name="name" value={inputForm.name} onChange={handleChangeInput} />
                <Typography>Chấm sao</Typography>
                <Rating onChange={handleChangeRating} value={inputForm.rating} />
                <TextField
                    name="comment"
                    sx={{ width: "50ch" }}
                    label="Đánh giá"
                    multiline
                    rows={4}
                    value={inputForm.comment}
                    onChange={handleChangeInput}
                />
                <Button type="submit">Gửi đánh giá</Button>
            </Stack>
        </Container>
    )
}