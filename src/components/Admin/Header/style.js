import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from "../../../templates/Admin/style"
const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "#545353"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolBar: {
        justifyContent: "space-between",
        "& h3": {
            margin: "10px 0px 10px 30px"
        }
    },
    accout: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& h6": {
            margin: "0px 10px"
        }
    }
}));

export { useStyles }