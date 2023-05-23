import { createTheme } from "@mui/material";

export const useMuiTheme = () => {
  const theme = createTheme({
    typography: {
      //  "fontFamily": ["Poppins"].join(','),
      //  "fontSize": 14,
      //  "fontWeightLight": 300,
      //  "fontWeightRegular": 400,
      //  "fontWeightMedium": 500
    },
    palette: {
      // mode: 'dark',

			background: {
				default: "#fbfbfb"
			},
      primary: {
        main: "#FF715B",
				light: "#ffeeed",
				contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#6C757D",
      },
      text: {
				primary: "#212529",
        disabled: "#6C757D",
				secondary: "#FF715B",
      },
      // error: {
      //     main: COLORS.red,
      // }
    },
  });

  return theme;
};
