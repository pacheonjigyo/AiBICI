import * as React from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

import { ChatOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useParams } from "react-router-dom";
import { BigButton } from "../../common/BigButton.js";
import Image from "../../common/Image.js";
import { Language } from "../../common/Language.js";
import { stringAvatar } from "../../common/StringAvatar.js";
import { Token } from "../../common/Token.js";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function Product(): JSX.Element {
  const theme = useTheme();

  const { id } = useParams();
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["템플릿"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    if (!id) {
      return;
    }

    identityDataStore.getProductDetailedData(id);
    // identityDataStore.productDetailedData.view.board.description;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          my: 16,
        }}
      >
        {identityDataStore.productDetailedData && (
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      bgcolor: "white",

                      borderRadius: "1rem",
                      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      width: 564,
                      height: 564,
                    }}
                  >
                    <Image
                      src={
                        identityDataStore.productDetailedData.view.board
                          .agProductOnBoard[0].agProductBoard.thumbnail
                      }
                      width="100%"
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box
                    sx={{
                      p: 3,

                      mb: 3,
                    }}
                  >
                    <Typography
                      fontSize={48}
                      fontWeight="bold"
                      sx={{
                        mb: 3,
                      }}
                    >
                      {
                        identityDataStore.productDetailedData.view.board
                          .agProductOnBoard[0].agProductBoard.title
                      }
                    </Typography>

                    <Typography
                      fontSize={16}
                      // fontWeight="bold"
                      sx={{
                        mb: 3,
                      }}
                    >
                      <Language label="상세설명" />
                    </Typography>

                    <Typography
                      fontSize={36}
                      sx={{
                        mb: 5,
                      }}
                      // fontWeight="bold"
                      // color="text.secondary"
                    >
                      <Token
                        value={
                          identityDataStore.productDetailedData.view.board.price
                        }
                        fontSize={24}
                      />
                    </Typography>

                    <BigButton color="secondary" variant="contained">
                      <Language label="구매하기" />
                    </BigButton>

                    <BigButton
                      color="info"
                      variant="contained"
                      sx={{
                        ml: 1,
                      }}
                    >
                      <Language label="장바구니" />
                    </BigButton>
                  </Box>
                </Grid>

                <Grid item xs={12}></Grid>

                <Grid item xs={12}>
                  <Typography
                    color="text.secondary"
                    fontSize={18}
                    fontWeight="bold"
                    sx={{
                      mb: 3,
                    }}
                  >
                    <Language label="상세설명" />
                  </Typography>

                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        identityDataStore.productDetailedData.view.board
                          .descriptionHTML,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    color="text.secondary"
                    fontSize={18}
                    fontWeight="bold"
                    sx={{
                      mb: 3,
                    }}
                  >
                    <Language label="댓글" />
                  </Typography>

                  <Card
                    sx={{
                      // border: 1,
                      // borderColor: "divider",
                      borderRadius: "1em",
                      // boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",

                      boxShadow: "none",

                      // display: "flex",

                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {commonStore.userInfo ? (
                        <Avatar {...stringAvatar("user")} />
                      ) : (
                        <Avatar />
                      )}

                      <Typography
                        variant="body2"
                        color="secondary"
                        sx={{
                          ml: 2,
                          my: 1,
                          fontSize: 14,
                        }}
                      >
                        @user
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        my: 3,
                      }}
                    >
                      <Typography
                        noWrap
                        // variant="body2"
                        // color="text.secondary"
                        sx={{
                          fontSize: 14,
                        }}
                      >
                        Content
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItem: "center",
                      }}
                    >
                      <Button>
                        <FavoriteBorderOutlined color="secondary" />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            ml: 1,
                          }}
                        >
                          99+
                        </Typography>
                      </Button>

                      <Button
                        sx={{
                          ml: 1,
                        }}
                      >
                        <ChatOutlined color="secondary" />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            ml: 1,
                          }}
                        >
                          99+
                        </Typography>
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}
      </Box>
    </>
  ));
}
