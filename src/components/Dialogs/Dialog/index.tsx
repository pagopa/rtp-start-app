import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useId } from "react";
import { useDialogStore } from "src/stores/dialog.store";

export default function DialogComponent() {

  const { dialog, closeDialog } = useDialogStore();
  const ariaLabelId = useId();
  const ariaDescriptionId = useId();

  return(
    <Dialog 
      open={!!dialog} 
      aria-labelledby={ariaLabelId}
      aria-describedby={ariaDescriptionId}
      role="dialog"
      aria-modal="true"
      onClose={closeDialog}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle variant="h6" fontWeight={700} id={ariaLabelId} sx={{m: 0, pt: '32px', px: '32px', pb: '16px'}}>
        {dialog?.title}
      </DialogTitle>

      <DialogContent id={ariaDescriptionId} sx={{px: '32px', pb: '32px'}}>
        {dialog?.content}
      </DialogContent>

    </Dialog>
  );

}