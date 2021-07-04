import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 300;
const useStyle = makeStyles((theme) => {
  return {
    main: {
      paddingTop: "60px",
      marginTop: "60px"
    }
  };
});
export { useStyle, drawerWidth };
