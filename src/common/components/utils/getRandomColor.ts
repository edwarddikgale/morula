// utils/getRandomColor.ts
export const getRandomColor = () => {
    const colors = [
      '#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF3380', 
      '#33FFF3', '#F3FF33', '#FF8333', '#3380FF', '#8033FF'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  export const getContrastYIQ = (hexColor: string) => {
    hexColor = hexColor.replace("#", "");
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
  };
  