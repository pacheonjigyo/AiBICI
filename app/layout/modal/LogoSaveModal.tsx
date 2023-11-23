import * as React from "react";

import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Modal,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

import { Close } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../stores/index.js";

export default function LogoSaveModal(): JSX.Element {
  const navigate = useNavigate();

  const { commonStore, engineDataStore, engineStore, identityDataStore } =
    React.useContext(AppContext);

  return useObserver(() => (
    <Modal
      open={engineStore.logoSaveModal}
      onClose={() => {
        engineStore.setLogoSaveModal(false);
      }}
    >
      <Paper
        sx={{
          borderRadius: "1rem",
          position: "fixed",

          top: "50%",
          left: "50%",

          transform: "translate(-50%, -50%)",

          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>의견 제출</h3>

          <IconButton
            onClick={() => {
              engineStore.setLogoSaveModal(false);
            }}
          >
            <Close />
          </IconButton>
        </Box>

        <Paper
          variant="outlined"
          sx={{
            width: 500,

            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                mb: 1,
              }}
            >
              (선택) 브랜드 생성 결과를 평가해주세요.
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Rating
                name="disabled"
                value={engineDataStore.brandInfo.rating}
                sx={{
                  fontSize: 36,
                }}
                onChange={(e: any) => {
                  engineDataStore.setBrandInfo({
                    ...engineDataStore.brandInfo,

                    rating: Number(e.target.value),
                  });
                }}
              />

              <Chip
                color={
                  engineDataStore.brandInfo.rating === 1
                    ? "error"
                    : engineDataStore.brandInfo.rating === 2
                    ? "error"
                    : engineDataStore.brandInfo.rating === 3
                    ? "warning"
                    : engineDataStore.brandInfo.rating === 4
                    ? "success"
                    : engineDataStore.brandInfo.rating === 5
                    ? "success"
                    : "default"
                }
                label={
                  engineDataStore.brandInfo.rating === 1
                    ? "매우 불만족"
                    : engineDataStore.brandInfo.rating === 2
                    ? "불만족"
                    : engineDataStore.brandInfo.rating === 3
                    ? "보통"
                    : engineDataStore.brandInfo.rating === 4
                    ? "만족"
                    : engineDataStore.brandInfo.rating === 5
                    ? "매우 만족"
                    : "미평가"
                }
              />
            </Box>

            <Divider
              sx={{
                my: 3,
              }}
            />

            <Typography
              sx={{
                mb: 1,
              }}
            >
              (선택) 보완되어야 할 점이 있다면 자유롭게 입력해주세요.
            </Typography>

            <TextField
              id="LogoSave_Feedback"
              label="평가 사유"
              multiline
              rows={3}
              value={engineDataStore.brandInfo.ratingFeedback}
              fullWidth
              onChange={(e) => {
                engineDataStore.setBrandInfo({
                  ...engineDataStore.brandInfo,

                  ratingFeedback: e.target.value,
                });
              }}
              sx={{
                mb: 3,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              color="inherit"
              variant="contained"
              onClick={() => {
                const accept = confirm(
                  commonStore.appInfo.language === "ko"
                    ? "생성된 결과는 삭제되며 이전 단계로 다시 되돌릴 수 없게 됩니다.\n계속 진행하시려면 [확인] 버튼을 클릭해주세요."
                    : "The generated results are deleted and cannot be returned to the previous step. Click the OK button to continue.",
                );

                if (!accept) {
                  return;
                }

                engineStore.setStep(1);
              }}
              fullWidth
              sx={{
                height: 60,
              }}
            >
              <Box>
                <Typography>
                  {commonStore.appInfo.language === "ko"
                    ? "처음부터 다시만들기"
                    : "Recreate from scratch"}
                </Typography>
              </Box>
            </Button>
            &nbsp;
            <Button
              color="primary"
              variant="contained"
              onClick={async () => {
                await identityDataStore.updateDetailedData(
                  `${engineDataStore.brandInfo.id}`,
                  {
                    userData: engineDataStore.brandInfo.engineIndex.userData,
                    indexLogo_selected: engineDataStore.brandInfo.selected.logo,
                    indexLogo:
                      engineDataStore.brandInfo.engineIndex.logo[
                        engineDataStore.brandInfo.resulted.logo
                      ],
                    logo: engineDataStore.brandInfo.logo,
                  },
                  "logo",
                );

                await identityDataStore.updateDetailedData(
                  `${engineDataStore.brandInfo.id}`,
                  {
                    userData: engineDataStore.brandInfo.engineIndex.userData,
                    indexSlogan_selected:
                      engineDataStore.brandInfo.selected.slogan,
                    indexSlogan:
                      engineDataStore.brandInfo.engineIndex.slogan[
                        engineDataStore.brandInfo.resulted.slogan
                      ],
                    slogan: engineDataStore.brandInfo.slogan,
                  },
                  "slogan",
                );

                await identityDataStore.updateDetailedData(
                  `${engineDataStore.brandInfo.id}`,
                  {
                    userData: engineDataStore.brandInfo.engineIndex.userData,
                    indexCoreValue_selected:
                      engineDataStore.brandInfo.selected.coreValue,
                    indexCoreValue:
                      engineDataStore.brandInfo.engineIndex.coreValue[
                        engineDataStore.brandInfo.resulted.coreValue
                      ],
                    coreValue: engineDataStore.brandInfo.coreValue,
                  },
                  "coreValue",
                );

                await identityDataStore.updateDetailedData(
                  `${engineDataStore.brandInfo.id}`,
                  {
                    userData: engineDataStore.brandInfo.engineIndex.userData,
                    name: engineDataStore.brandInfo.name,
                  },
                  "name",
                );

                await identityDataStore.updateDetailedData(
                  `${engineDataStore.brandInfo.id}`,
                  {
                    userData: engineDataStore.brandInfo.engineIndex.userData,
                    font_family: engineDataStore.brandInfo.fontFamily,
                  },
                  "font",
                );

                await identityDataStore.updateDetailedData(
                  `${engineDataStore.brandInfo.id}`,
                  {
                    userData: engineDataStore.brandInfo.engineIndex.userData,
                    rating: engineDataStore.brandInfo.rating,
                    comment: engineDataStore.brandInfo.ratingFeedback,
                  },
                  "aiengine",
                );

                await identityDataStore.updateDetailedData(
                  `${engineDataStore.brandInfo.id}`,
                  {
                    userData: engineDataStore.brandInfo.engineIndex.userData,
                    story: engineDataStore.brandInfo.story,
                  },
                  "story",
                );

                await identityDataStore.updateDetailedData(
                  `${engineDataStore.brandInfo.id}`,
                  {
                    userData: engineDataStore.brandInfo.engineIndex.userData,
                    mission: engineDataStore.brandInfo.mission,
                  },
                  "mission",
                );

                await identityDataStore.updateDetailedData(
                  `${engineDataStore.brandInfo.id}`,
                  {
                    userData: engineDataStore.brandInfo.engineIndex.userData,
                    vision: engineDataStore.brandInfo.vision,
                  },
                  "vision",
                );

                const accept = confirm(
                  "브랜드 정보가 변경되었어요.\n생성된 브랜드는 [마이페이지]에서 계속 관리할 수 있어요.\n\n[확인] 버튼을 클릭하시면 해당 브랜드의 프로필로 이동할게요.",
                );

                if (!accept) {
                  return;
                }

                navigate(`/identity/${engineDataStore.brandInfo.id}`);
              }}
              fullWidth
              sx={{
                height: 60,
              }}
            >
              <Box>
                <Typography>제출하기</Typography>
              </Box>
            </Button>
          </Box>
        </Paper>
      </Paper>
    </Modal>
  ));
}
