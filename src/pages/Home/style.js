import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .LazyLoad": {
            opacity: 0,
            visibility: "hidden",
            transform: "scale(0.95)",
            transition: "all 1s ease-in-out",
        },
        "& .is-visible": {
            visibility: "visible",
            "& .carousel-text": {
                display: "block",
            },
            "& .carousel-img": {
                display: "block"
            },
            "& .silderAnim": {
                display: "block"
            },
            opacity: 1,
            transform: "scale(1)",
            transition: "all 1s  ease-in-out",
        },
        "& .ScrollableContainer": {
            height: "50px",
            overflow: "scroll",
            backgroundColor: "grey",

        }
    },


}))

export { useStyles }


// "@keyframes fade": {
//     "0%": {
//       opacity: 0
//     },
//     "50%": {
//       opacity: "0.2"
//     },
//     "75%": {
//       opacity: "0.5"
//     },
//     "100%": {
//       opacity: 1
//     }
//   }

//   "@keyframes tranX": {
//     "0%": {
//         transform: "translateX(-100%)",
//         opacity: 0
//     },
//     "75%": {
//         opacity: "0.3"
//     },
//     "100%": {
//         transform: "translateX(0%)",
//         opacity: 1
//     }
// },