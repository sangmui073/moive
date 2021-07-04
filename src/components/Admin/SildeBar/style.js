import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from "../../../templates/Admin/style"
const useStyles = makeStyles((theme) => ({

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },

    drawerPaper: {
        width: drawerWidth,
        background: "rgba(0,0,0,0.7)",
        color: "#fff",
        "& svg": {
            fill: "#fff"
        },
        "& .MuiButtonBase-root": {
            transition: "all 0.5s",
            "&:hover": {
                color: "black",
                "& svg": {
                    fill: "black"
                }
            },
        }
    },
    active: {
        background: "#f37520",
        color: "black",
        transition: "all 0.2s",
        "& svg": {
            fill: "black"
        }

    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    hide: {
        display: 'none',
    },
}));

export { useStyles }