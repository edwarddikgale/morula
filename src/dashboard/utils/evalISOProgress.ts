export const evalISOProgress = (data: any): number => {
    if (!data && !data.sdgs) return 0;
    return data.sdgs.length === 3? 100: 0;
}