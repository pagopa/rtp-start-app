import { Paper, Typography } from "@mui/material";
import { CopyToClipboardButton } from "@pagopa/mui-italia";

type IPropsBtn = {
    textToCopy: string
}

export default function CopyClipboard({ textToCopy }: IPropsBtn) {

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        border: "1px solid #BDBDBD",
        borderRadius: "4px",
        px: "12px",
        maxWidth: "242px",
        userSelect: "none",
        maxHeight: "54px",
        background: "transparent",
        width: "242px",
      }}
    >
      <Typography
        variant="body2"
        fontWeight={600}
        color="primary"
        flexGrow={1}
        py={'15px'}
      >
        {textToCopy}
      </Typography>
      <CopyToClipboardButton 
        size="small" 
        sx={{ p: 0, m: 0 }} 
        value={textToCopy} 
        onFocusVisible={function noRefCheck() { }}
      />
    </Paper>
  );
}