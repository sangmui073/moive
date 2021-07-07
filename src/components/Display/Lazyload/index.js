import CarouselMain from "../CarouselMain"
import SearchMoive from "../SearchMoive";
import CarouselHot from "../CarouselHot";
import TheatersCluster from "../TheaterCluster";
import News from "../News"
const pages = [
    {
        cls: "page-section",
        location: "navCarousel",
        debounce: false,
        Component: CarouselMain,

    },
    {
        location: "search",
        cls: "page-section",
        debounce: false,
        Component: SearchMoive,

    },
    {
        cls: "page-section",
        location: "carouselHot",
        debounce: false,
        Component: CarouselHot,

    },
    {
        cls: "page-section",
        location: "thearter",
        debounce: false,
        Component: TheatersCluster,

    },
    {
        cls: "page-section",
        location: "news",
        debounce: false,
        Component: News,

    },
]
export default pages