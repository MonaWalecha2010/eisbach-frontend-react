//generates random colours and puts them in string
export const getRandomColor =(colourCount:number)=>{ 
    var colors = [];
    for (var i = 0; i < colourCount; i++) {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var x = 0; x < 6; x++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
    }
    return colors;
}
export const generateRandomColor = () => {
  const h = 246;
  const s = Math.floor(Math.random() * 50) + 60;
  const l = Math.floor(Math.random() * 50) + 60;  
  return (`hsl(${h}, ${s}%, ${l}%)`);
};

export const largeValReducer = (accumulator:any, currentValue:any) => {
  if (accumulator[0] < currentValue[0]) {
    accumulator = currentValue;
  }
  return accumulator[1];
};