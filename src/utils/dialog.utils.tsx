import i18next from "i18next";
import { ReactNode } from "react";
import DialogRtpDelete from "src/components/Dialogs/DialogRtpDelete";
import { CancelReason } from "generated/apiClient";

export enum DialogType {
  DELETE = 'delete',
}

export type DialogData = {
  title: string;
  content: ReactNode;
};

export function getDialogData(dialogType: string, rtpId?: string, reason?: CancelReason): DialogData {
  switch (dialogType) {
  case DialogType.DELETE:
    return {
      title: i18next.t('Dialogs.delete.title'),
      content: <DialogRtpDelete rtpId={rtpId!} reason={reason!} />,
    };
  default:
    throw new Error(`Tipo di dialogo non supportato: ${dialogType}`);
  }
};