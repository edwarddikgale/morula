export const getVariantByPercentage = (percentage: number): 'success' | 'danger' | 'warning' | 'info' => {
    if (percentage >= 0 && percentage <= 10) {
      return 'danger';
    } else if (percentage > 70) {
      return 'success';
    } else {
      return 'warning';
    }
  };
  