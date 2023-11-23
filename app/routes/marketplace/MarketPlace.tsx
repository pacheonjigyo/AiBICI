import * as React from "react";
import ImageCreateModal from "../../layout/modal/ImageCreateModal.js";
import NoticeModal from "../../layout/modal/NoticeModal.js";

import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { ShoppingCart, Verified } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Language } from "../../common/Language.js";
import { Token } from "../../common/Token.js";
import { usePageEffect } from "../../core/page.js";
import { AppContext } from "../../stores/index.js";

export default function MarketPlace(): JSX.Element {
  const navigate = useNavigate();

  const { commonStore, identityDataStore } = React.useContext(AppContext);

  usePageEffect({
    title: "Marketplace",
  });

  React.useEffect(() => {
    identityDataStore.getProductList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      {commonStore.userInfo ? (
        <>
          <Box
            sx={{
              my: "60px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: commonStore.isDesktop ? "row" : "column",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      mb: 5,
                    }}
                  >
                    <Swiper
                      centeredSlides={true}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      loopedSlides={true}
                      keyboard={true}
                      scrollbar={{ draggable: true }}
                      spaceBetween={1000}
                    >
                      <SwiperSlide
                        style={{
                          background: "transparent",
                          textAlign: "center",
                        }}
                      >
                        <Box
                          sx={{
                            backgroundImage: `url("/resources/pictures/materials/3D Blender.jpg")`,
                            backgroundSize: "cover",
                            backgroundPosition: "0% 30%",
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            height: 500,
                            position: "relative",
                            color: "white",
                          }}
                        >
                          <Container maxWidth="lg"></Container>
                        </Box>
                      </SwiperSlide>

                      <SwiperSlide
                        style={{
                          background: "transparent",
                          textAlign: "center",
                        }}
                      >
                        <Box
                          sx={{
                            backgroundImage: `url("/resources/pictures/materials/3D Blender.jpg")`,
                            backgroundSize: "cover",
                            backgroundPosition: "0% 30%",
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            height: 500,
                            position: "relative",
                            color: "white",
                          }}
                        >
                          <Container maxWidth="lg"></Container>
                        </Box>
                      </SwiperSlide>

                      <SwiperSlide
                        style={{
                          background: "transparent",
                          textAlign: "center",
                        }}
                      >
                        <Box
                          sx={{
                            backgroundImage: `url("/resources/pictures/materials/3D Blender.jpg")`,
                            backgroundSize: "cover",
                            backgroundPosition: "0% 30%",
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            height: 500,
                            position: "relative",
                            color: "white",
                          }}
                        >
                          <Container maxWidth="lg"></Container>
                        </Box>
                      </SwiperSlide>
                    </Swiper>
                  </Box>
                </Box>

                <Container maxWidth="lg">
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",

                        mb: 3,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 24,
                          fontWeight: "bold",
                        }}
                      >
                        <Language label="판매중인 브랜드" />
                      </Typography>

                      <TextField
                        size="small"
                        color="secondary"
                        id="commercerShopSearch"
                        label={<Language label="검색어를 입력해주세요." />}
                        sx={{
                          width: 300,
                        }}
                      />
                    </Box>

                    <Grid container spacing={commonStore.isDesktop ? 3 : 1}>
                      {identityDataStore.productData?.collect.pagination.map(
                        (v) => {
                          return (
                            <>
                              <Grid item xs={commonStore.isDesktop ? 3 : 12}>
                                <Button
                                  fullWidth
                                  sx={{
                                    display: "block",
                                    textAlign: "left",

                                    p: 0,
                                  }}
                                  onClick={() => {
                                    navigate(`/product/${v.id}`);
                                  }}
                                >
                                  <Box
                                    sx={{
                                      bgcolor: "background.paper",
                                      borderRadius: "1rem",

                                      p: 1,
                                    }}
                                  >
                                    <CardMedia
                                      component="img"
                                      image={
                                        v.agProductOnBoard[0].agProduct
                                          .agService.agServiceCore.logo
                                      }
                                      width={268}
                                      height={268}
                                      sx={{
                                        background: "white",
                                        // background:
                                        //   "linear-gradient(#e66465, #9198e5)",

                                        // border: 1,
                                        borderColor: "divider",
                                        borderRadius: "1rem",

                                        objectFit: "contain",
                                      }}
                                      alt="정보이미지2"
                                    />

                                    <CardContent
                                      sx={{
                                        p: 0,
                                        mt: 2,
                                      }}
                                    >
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                          mb: 1,
                                          fontSize: 12,
                                          // fontWeight: "bold",
                                        }}
                                      >
                                        @{v.author}
                                      </Typography>

                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Typography
                                            variant="body2"
                                            color="text.primary"
                                            noWrap
                                            sx={{
                                              mr: 1,
                                            }}
                                          >
                                            {v.title}
                                          </Typography>
                                        </Box>

                                        <Verified
                                          sx={{
                                            color: "gold",
                                            // fontSize: 32,
                                          }}
                                        />
                                      </Box>
                                    </CardContent>
                                  </Box>
                                </Button>

                                <Box
                                  sx={{
                                    mt: 1,
                                    // display: "flex",
                                    // alignItem: "center",
                                    // justifyContent: "space-between",
                                  }}
                                >
                                  <Button
                                    color="secondary"
                                    variant="contained"
                                    fullWidth
                                    // endIcon={<CreditCard />}
                                    sx={
                                      {
                                        // border: 1,
                                      }
                                    }
                                  >
                                    <Language label={"구매하기"} />

                                    <Box
                                      sx={{
                                        ml: 1,

                                        bgcolor: "background.paper",
                                        borderRadius: "1rem",

                                        px: 1,
                                      }}
                                    >
                                      <Token
                                        sx={{}}
                                        value={
                                          v.agProductOnBoard[0].agProduct.price
                                        }
                                        fontSize={14}
                                      />
                                    </Box>
                                  </Button>
                                  <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    endIcon={<ShoppingCart />}
                                    sx={{
                                      // ml: 1,
                                      mt: 1,
                                    }}
                                  >
                                    <Language label={"장바구니"} />
                                  </Button>
                                </Box>
                              </Grid>
                            </>
                          );
                        },
                      )}
                    </Grid>
                  </Box>
                </Container>
              </Box>
            </Box>
          </Box>
        </>
      ) : null}

      <ImageCreateModal />
      <NoticeModal />
    </>
  ));
}
