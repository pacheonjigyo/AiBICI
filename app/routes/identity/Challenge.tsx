import * as React from "react";
import Image from "../../common/Image.js";

import {
  Box,
  Checkbox,
  Table,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";
import { Link as NavLink } from "../../common/Link.js";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

import { BigButton } from "../../common/BigButton.js";
import { ProductTableCell } from "../../common/ProductTableCell.js";
import "./prezi.css";

export default function BrandChallenge(): JSX.Element {
  const navigate = useNavigate();

  const { id } = useParams();
  const { commonStore, identityDataStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["프로필"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    if (!id) {
      return;
    }

    identityDataStore.getDetailedData(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            // mt: 10,
            my: 10,
          }}
        >
          {identityDataStore.detailedData && (
            <>
              <Box
                sx={{
                  px: 3,
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: 80,
                    }}
                  >
                    <Typography
                      fontSize={24}
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      브랜드 챌린지
                    </Typography>
                  </Box>
                </Box>

                <Table>
                  <TableRow>
                    <ProductTableCell width={100}></ProductTableCell>

                    <ProductTableCell width={100}>로고</ProductTableCell>

                    <ProductTableCell width={250}>브랜드명</ProductTableCell>

                    <ProductTableCell width={150}>판매가격</ProductTableCell>

                    <ProductTableCell width={100}>거래구분</ProductTableCell>

                    <ProductTableCell width={100}>판매상태</ProductTableCell>

                    <ProductTableCell width={100}>등급</ProductTableCell>

                    <ProductTableCell>비고</ProductTableCell>
                  </TableRow>

                  <TableRow>
                    <ProductTableCell>
                      <Checkbox />
                    </ProductTableCell>

                    <ProductTableCell>
                      <Box
                        href={`/identity/${identityDataStore.detailedData.id}`}
                        component={NavLink}
                      >
                        <Image
                          src={identityDataStore.detailedData.serviceCore.logo}
                          alt="정보이미지1"
                          style={{
                            width: 56,
                            height: 56,
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    </ProductTableCell>

                    <ProductTableCell>
                      <TextField
                        id="BrandChallengeName"
                        value={identityDataStore.detailedData.name}
                        fullWidth
                        inputProps={{
                          style: { fontSize: 14 },
                        }}
                      />
                    </ProductTableCell>

                    <ProductTableCell align="right">5,000,000</ProductTableCell>

                    <ProductTableCell>임대</ProductTableCell>

                    <ProductTableCell>판매중</ProductTableCell>

                    <ProductTableCell>GOLD</ProductTableCell>

                    <ProductTableCell>-</ProductTableCell>
                  </TableRow>
                </Table>
              </Box>
            </>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: "#f5f5f5",

          position: "fixed",
          left: 80,
          top: 0,

          width: commonStore.baseInfo.width - 80,
          height: 80,

          display: "flex",

          justifyContent: "right",
          alignItems: "center",

          border: 1,
          borderColor: "divider",

          p: 3,
        }}
      >
        <BigButton color="error" variant="contained">
          판매중지
        </BigButton>

        <BigButton
          color="info"
          variant="contained"
          sx={{
            ml: 1,
          }}
        >
          판매시작
        </BigButton>
      </Box>
    </>
  ));
}
