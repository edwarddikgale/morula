export const evalEventProgress = (data: any): number => {
    if (!data) return 0;
    return data.eventCount >= 1? 100: 0;
}