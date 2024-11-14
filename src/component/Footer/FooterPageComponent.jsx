import { Email, Phone } from "@mui/icons-material";
import { Box, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";

export default function FooterPageComponent() {
    return (
        <Box sx={{
            py: 5,
            background: "black",
            color: "white",
            "& .MuiSvgIcon-root": {
                fill: "white"
            }
        }}>
            <Container direction={"row"} spacing={6} component={Stack}>
                <Stack sx={{ width: "40%" }}>
                    <Typography component={"h1"} variant="h6">CÔNG TY TNHH KỸ THUẬT ĐIỆN HIPPO</Typography>
                    <Typography>MST: 0123456789</Typography>
                    <Typography>778/10 Đ. Nguyễn Kiệm, Phường 3, Phú Nhuận, Hồ Chí Minh 700990, Việt Nam</Typography>
                    <Box>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d823.8640895121207!2d106.67877700833256!3d10.81283088683973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752934c609c5bd%3A0x751f71739b98ebc4!2zQXB0ZWNoIENvbXB1dGVyIEVkdWNhdGlvbiAtIEjhu4cgdGjhu5FuZyDEkMOgbyB04bqhbyBM4bqtcCB0csOsbmggdmnDqm4gUXXhu5FjIHThur8gQXB0ZWNo!5e0!3m2!1svi!2s!4v1731070166145!5m2!1svi!2s" width="100%" height="auto" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </Box>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <Phone />
                            </ListItemIcon>
                            <ListItemText primary="Điện thoại: 0123483498" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Email />
                            </ListItemIcon>
                            <ListItemText primary="Email: sale@example.com" />
                        </ListItem>
                    </List>
                </Stack>
                <Stack sx={{ width: "20%" }}>
                    <Typography component={"h1"} variant="h6">Về chúng tôi</Typography>
                    <Divider color="grey" />
                    <List>
                        <ListItem>
                            <ListItemText primary="Trang chủ" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Về chúng tôi" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Tuyển dụng" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Liên hệ" />
                        </ListItem>
                    </List>
                </Stack>
                <Stack sx={{ width: "20%" }}>
                    <Typography component={"h1"} variant="h6">Thông tin</Typography>
                    <Divider color="grey" />
                    <List>
                        <ListItem>
                            <ListItemText primary="Bảng giá" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Tin tức" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Khuyến mãi" />
                        </ListItem>
                    </List>
                </Stack>
                <Stack sx={{ width: "20%" }}>
                    <Typography component={"h1"} variant="h6">Chính sách</Typography>
                    <Divider color="grey" />
                    <List>
                        <ListItem>
                            <ListItemText primary="Tra cứu đơn hàng" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Bảo hành đổi trả" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Ý kiến phản hồi" />
                        </ListItem>
                    </List>
                </Stack>
            </Container>
        </Box>
    )
}