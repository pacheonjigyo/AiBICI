import * as React from "react";

import {
  Box,
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { Language } from "../../../common/Language.js";
import { AppContext } from "../../../stores/index.js";

export default function IdentityChallenge(): JSX.Element {
  const { identityDataStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box>
        {identityDataStore.detailedData && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 3,
              }}
            >
              <Typography
                fontSize={18}
                sx={{
                  mb: 3,
                }}
              >
                <Language label="도전과제를 선택해주세요." />
              </Typography>

              <RadioGroup>
                <FormControlLabel
                  control={<Radio color="secondary" value="1" />}
                  label={
                    <Typography>
                      <Language label="스타터" />{" "}
                      <Chip
                        size="small"
                        color="success"
                        label={<Language label="쉬움" />}
                        sx={{
                          ml: 1,
                        }}
                      />
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={<Radio color="secondary" disabled value="2" />}
                  label={
                    <Typography>
                      <Language label="마케터" />{" "}
                      <Chip
                        size="small"
                        color="warning"
                        label={<Language label="보통" />}
                        sx={{
                          ml: 1,
                        }}
                      />
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={<Radio color="secondary" disabled value="3" />}
                  label={
                    <Typography>
                      <Language label="카피라이터" />{" "}
                      <Chip
                        size="small"
                        color="error"
                        label={<Language label="어려움" />}
                        sx={{
                          ml: 1,
                        }}
                      />
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={<Radio color="secondary" disabled value="4" />}
                  label={
                    <Typography>
                      <Language label="벤처 브랜드" />{" "}
                      <Chip
                        size="small"
                        color="error"
                        label={<Language label="어려움" />}
                        sx={{
                          ml: 1,
                        }}
                      />
                    </Typography>
                  }
                />
              </RadioGroup>
            </Box>
          </>
        )}
      </Box>
    </>
  ));
}
