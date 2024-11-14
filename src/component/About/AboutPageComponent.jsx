import { Box, Container, Stack, Typography } from "@mui/material";

export default function AboutPageComponent() {
    return (
        <Container p={5} spacing={3} component={Stack}>
            <Stack alignItems={"center"}>
                <Typography variant="h4">Thiết Bị Điện Hippo</Typography>
                <Typography variant="h5">Nhà phân phối Thiết bị điện TOP #1 miền Nam</Typography>
            </Stack>
            <Stack spacing={10} direction={"row"} alignItems={"center"}>
                <Stack spacing={2} >
                    <Typography variant="h6">GIỚI THIỆU VỀ CÔNG TY</Typography>
                    <Typography sx={{
                        "& span": {
                            color: "Highlight",
                            fontWeight: "bold"
                        }
                    }} >
                        <span>Thiết bị điện Hippo</span>, thuộc Công ty TNHH Kỹ Thuật Điện Hippo, được thành lập vào năm 2013.
                        Qua gần <span>12 năm</span> hoạt động trong lĩnh vực cung cấp thiết bị điện dân dụng và công nghiệp tại khu vực miền Nam và toàn quốc.
                        Hiện tại, Thiết bị điện Đặng Gia Phát đang hợp tác với hơn <span>100 đối tác</span> là các thương hiệu lớn, các nhà sản xuất và nhập khẩu thiết bị điện hàng đầu tại Việt Nam.
                    </Typography>
                </Stack>
                <Box sx={{ width: "40%" }} component={"img"} src="/pic1.jpg" />
            </Stack>
            <Stack spacing={10} direction={"row"} alignItems={"center"}>
                <Box sx={{ width: "40%" }} component={"img"} src="/pic1.jpg" />
                <Stack spacing={2}>
                    <Typography variant="h6">TRIẾT LÝ KINH DOANH</Typography>
                    <Typography sx={{
                        "& span": {
                            color: "Highlight",
                            fontWeight: "bold"
                        }
                    }} >
                        Chúng tôi đang phấn đấu trở thành <span>Nhà cung cấp tốt nhất</span>, hiện chúng tôi đang thực hiện hợp tác cùng nhiều nhà sản xuất, nhà nhập khẩu thiết bị điện hàng đầu Việt Nam.
                        <span>Chất lượng sản phẩm</span> chúng tôi phân phối đến khách hàng được quản lý chặt chẽ từ khâu chọn sản phẩm, nhà sản xuất, nhà nhập khẩu đến khâu dịch vụ hậu mãi, bảo hành, bảo trì sản phẩm. .
                        Với phương châm <span>&quot;Uy Tín Là Danh Dự&quot;</span> Chúng tôi phấn đấu trở thành nhà cung cấp tốt nhất từ giám sát chất lượng sản phẩm đến dịch vụ hậu mãi như bảo hành và hỗ trợ, nhằm đảm bảo mang đến cho khách hàng dịch vụ tốt nhất.
                    </Typography>
                </Stack>

            </Stack>

        </Container >
    )
}