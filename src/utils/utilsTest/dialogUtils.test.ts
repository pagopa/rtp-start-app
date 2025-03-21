import { i18nTestSetup } from 'src/__tests__/i18nTestSetup';
import DialogRtpDelete, { DialogRtpDeleteProps } from 'src/components/Dialogs/DialogRtpDelete';
import { describe, it, expect, beforeEach } from 'vitest';
import { getDialogData, DialogType } from '../dialog.utils';
import React from 'react';

describe('getDialogData', () => {
  beforeEach(() => {
    i18nTestSetup({
      'Dialogs.delete.title': 'Eliminazione in corso...',
    });
  });

  it('should return correct data for DELETE dialog type', () => {
    const rtpId = '123';
    const result = getDialogData(DialogType.DELETE, rtpId);

    expect(result.title).toBe('Eliminazione in corso...');
    
    const expectedProps: DialogRtpDeleteProps = { rtpId };
    expect(result.content).toEqual(React.createElement(DialogRtpDelete, expectedProps));
  });

  it('should throw an error for unsupported dialog type', () => {
    const invalidDialogType = 'unsupportedType';

    expect(() => getDialogData(invalidDialogType)).toThrowError(
      `Tipo di dialogo non supportato: ${invalidDialogType}`
    );
  });
});