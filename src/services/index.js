import AuthService from "./authServices";
import MoiveService from "./movieServices";
import CinemaService from "./cinemaServices";
import Booking from "./bookingServices";
import AdminService from "./adminService";
const movieService = new MoiveService();
const authService = new AuthService();
const cinemaService = new CinemaService();
const bookingService = new Booking();
const adminService = new AdminService();
export { adminService, movieService, authService, cinemaService, bookingService };
