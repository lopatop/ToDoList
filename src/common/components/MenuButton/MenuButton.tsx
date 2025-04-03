import { Button, styled } from "@mui/material"

type Props = {
  background?: string
}

export const MenuButton = styled(Button)<Props>(({ background, theme }) => ({
  minWidth: "110px",
  fontWeight: "bold",
  borderRadius: "5px",
  textTransform: "capitalize",
  margin: "0 10px",
  padding: "8px 24px",
  color: "#ffffff",
  background: background || theme.palette.primary.light,
  transition: "transform 0.5s ease, box-shadow 0.2s ease",

  "&:hover": {
    background: "#035363",
    transform: "translateY(-2px)",
    opacity: "1",
  },
}))
