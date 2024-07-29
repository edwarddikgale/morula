
import { IOrgSettingsData } from 'settings/types/IOrgSettingsData';
import { hasChars } from './hasChars';
  
export const evalOrgSettingsProgress = (data: IOrgSettingsData | null | undefined): number => {
    if (!data) return 0;

    const fields = [
        'year',
        'companyPurpose',
        'iso20121Scope'
    ];

    const filledFields = fields.filter(field => hasChars(data[field as keyof IOrgSettingsData] as string));
    const progress = (filledFields.length / fields.length) * 100;

    return Math.round(progress);
};
  