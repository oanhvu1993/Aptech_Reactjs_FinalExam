import { Avatar, Box, List, ListItem, ListItemAvatar, Rating, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types"

CommentRatingListComponent.propTypes = {
    reviews: PropTypes.array
}

export default function CommentRatingListComponent({ reviews }) {
    return (
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
    )
}