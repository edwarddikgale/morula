let recentColors: string[] = []; // A list to store recently used colors
const MAX_RECENT_COLORS = 5; // Maximum number of recent colors to track

export const getRandomColor = () => {
  const colors = [
    '#FFB3B3', '#B3FFB3', '#B3B3FF', '#FFB3FF', '#FFB3D9', 
    '#B3FFFF', '#FFFFB3', '#FFC299', '#99C2FF', '#D699FF',
    '#FFE0B3', '#B3E0FF', '#E0B3FF', '#FFCCE5', '#CCFFE5',
    '#F5FFB3', '#B3FFF5', '#E5B3FF', '#FF99CC', '#B3CCFF'
  ];

  // Filter out recently used colors
  const availableColors = colors.filter(color => !recentColors.includes(color));

  // If no available colors remain, reset recentColors and use all colors again
  const colorPool = availableColors.length > 0 ? availableColors : colors;

  // Pick a random color
  const selectedColor = colorPool[Math.floor(Math.random() * colorPool.length)];

  // Update the recentColors list
  recentColors.push(selectedColor);
  if (recentColors.length > MAX_RECENT_COLORS) {
    recentColors.shift(); // Remove the oldest color to keep the list within the max limit
  }

  return selectedColor;
};

export const getContrastYIQ = (hexColor: string) => {
  hexColor = hexColor.replace("#", "");
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};
