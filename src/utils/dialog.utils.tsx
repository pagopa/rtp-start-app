import i18next from "i18next";
import { ReactNode } from "react";
import DialogRtpDelete from "src/components/Dialogs/DialogRtpDelete";

export enum DialogType {
  DELETE = 'delete',
}

export type DialogData = {
  title: string;
  content: ReactNode;
};

export function getDialogData(dialogType: string, rtpId?: string): DialogData {
  switch (dialogType) {
  case DialogType.DELETE:
    return {
      title: i18next.t('Dialogs.delete.title'),
      content: <DialogRtpDelete rtpId={rtpId!} />,
    };
  default:
    throw new Error(`Tipo di dialogo non supportato: ${dialogType}`);
  }
};