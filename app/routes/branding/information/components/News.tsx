import * as React from "react";

import { useObserver } from "mobx-react";
import { Link as NavLink } from "../../../../common/Link.js";
import { wordList } from "../../../../data/words.js";
import { AppContext } from "../../../../stores/index.js";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";

export default function News(): JSX.Element {
  const { commonStore, boardStore } = React.useContext(AppContext);

  React.useEffect(() => {
    boardStore.getBoardData("info", 8, 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            lineHeight: 1.2,
            mb: 3,
          }}
          align="center"
          fontSize={
            commonStore.isDesktop
              ? 55
              : commonStore.appInfo.language === "ko"
              ? 40
              : 32
          }
          fontWeight="bold"
        >
          늘 새로운 브랜딩 소식을 공유해드릴게요.
        </Typography>

        <Typography
          sx={{
            lineHeight: 1.2,
            mb: 16,
          }}
          align="center"
          fontSize={commonStore.isDesktop ? 18 : 16}
        >
          {
            wordList["AI가 만드는 브랜드 아이덴티티 생성 서비스"][
              commonStore.appInfo.language
            ]
          }
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 1200,
          }}
        >
          <Grid
            container
            spacing={2}
            padding={2}
            sx={{
              mb: 3,
            }}
          >
            {boardStore.boardNewsData?.pagination.map((v: any) => (
              <>
                <Grid item xs={commonStore.isDesktop ? 6 : 12}>
                  <Button href={`/branding/info/${v.id}`} component={NavLink}>
                    <Card
                      sx={{
                        border: "none",
                        borderRadius: "1em",
                        boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
                        maxWidth: "100%",
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          width="200"
                          image={v.thumbnail}
                          alt="정보이미지2"
                        />

                        <CardContent>
                          <Typography gutterBottom variant="h3" component="div">
                            {v.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {v.author}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Button>
                </Grid>
              </>
            ))}
          </Grid>

          <Pagination
            count={boardStore.boardNewsData?.totalPage}
            color="primary"
            onChange={(e, page) => {
              boardStore.getBoardData("info", 8, page);
            }}
          />
        </Box>
      </Box>
    </>
  ));
}
