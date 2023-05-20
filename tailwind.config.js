/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      "black":{
        900: "black"
      },
      "lime_green": {
    
        50: "#d0f34e",
    
        100: "#a5dd31",
    
        200: "#7dc621",
    
        300: "#5bae15",
    
        400: "#3f950d",
    
        500: "#2a7c08",
    
        600: "#1a6404",
    
        700: "#0e4c02",
    
        800: "#073601",
    
        900: "#022100",
      },
      "sap_green": {
    
        50: "#88ff77",
    
        100: "#41e930",
    
        200: "#2dce20",
    
        300: "#1fb315",
    
        400: "#15980e",
    
        500: "#0d7e09",
    
        600: "#086505",
    
        700: "#044d03",
    
        800: "#023601",
    
        900: "#012100",
      },
      "turquoise": {
    
        50: "#5bffcb",
    
        100: "#30e79a",
    
        200: "#1fcc71",
    
        300: "#14b251",
    
        400: "#0c9738",
    
        500: "#077e24",
    
        600: "#046516",
    
        700: "#024d0c",
    
        800: "#013606",
    
        900: "#002002",
      },
      "cornflower_blue": {
    
        50: "#c2ebff",
    
        100: "#88d4ff",
    
        200: "#54bbff",
    
        300: "#399ff5",
    
        400: "#2b84e3",
    
        500: "#2069cf",
    
        600: "#164fb8",
    
        700: "#0e369d",
    
        800: "#07207d",
    
        900: "#030e56",
      },
      "indigo": {
    
        50: "#ebe0ff",
    
        100: "#d7c1ff",
    
        200: "#c2a2ff",
    
        300: "#ab83ff",
    
        400: "#9363ff",
    
        500: "#7642fe",
    
        600: "#552be2",
    
        700: "#3619be",
    
        800: "#1c0c91",
    
        900: "#0b0460",
      },
      "heliotrope": {
    
        50: "#fbdafe",
    
        100: "#f6b5fc",
    
        200: "#ef8ef7",
    
        300: "#e466ef",
    
        400: "#d040e0",
    
        500: "#a82ed0",
    
        600: "#801fbb",
    
        700: "#5913a2",
    
        800: "#350982",
    
        900: "#18045b",
      },
      "raspberry": {
    
        50: "#ffdbec",
    
        100: "#ffb6d9",
    
        200: "#ff8ec2",
    
        300: "#ff60a4",
    
        400: "#f03578",
    
        500: "#cf2052",
    
        600: "#aa1233",
    
        700: "#84091c",
    
        800: "#60040e",
    
        900: "#3d0105",
      },
      "orange": {
    
        50: "#ffe0b5",
    
        100: "#ffbf72",
    
        200: "#fb9c3f",
    
        300: "#e87e2f",
    
        400: "#d16221",
    
        500: "#b84816",
    
        600: "#9c300d",
    
        700: "#7c1d07",
    
        800: "#5b0f03",
    
        900: "#3a0601",
      },
    } ,
    extend: {
      screens:{
        'xs': '580px',
        '850': '850px',
      },
      minWidth:{
        'mobile': '360px',
        '54': '258px',
      },
      maxWidth:{
        'qhd': '1440px',
      },
      gridAutoColumns: {
        'min-48': 'minmax(192px, 1fr)',
        'min-54': 'minmax(258px, 1fr)',
      },
      gridTemplateRows: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        'fill-48': 'repeat(auto-fit, minmax(192px,1fr))',
        'fill-40': 'repeat(auto-fill, 192px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily:{
      'font-int': 'Inter'
      }
    },
  },
  plugins: [],
}
