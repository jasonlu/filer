import blue from '@material-ui/core/colors/blue';
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

export default theme;
