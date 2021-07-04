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
        height: 580
    },
    {
        location: "search",
        debounce: false,
        Component: SearchMoive,
        height: 130
    },
    {
        cls: "page-section",
        location: "carouselHot",
        debounce: false,
        Component: CarouselHot,
        height: 650
    },
    {
        cls: "page-section",
        location: "thearter",
        debounce: false,
        Component: TheatersCluster,
        height: 680
    },
    {
        cls: "page-section",
        location: "news",
        debounce: false,
        Component: News,
        height: 1400
    },
]
export default pages