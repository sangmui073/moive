const admin_domain = {
    manageUser: {
        get: "QuanLyNguoiDung/TimKiemNguoiDungPhanTrang?MaNhom=GP11&",
        post: "QuanLyNguoiDung/ThemNguoiDung",
        delete: "QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=",
        put: "QuanLyNguoiDung/CapNhatThongTinNguoiDung"

    },
    managerMoive: {
        get: "QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP11&",
        post: "QuanLyPhim/ThemPhimUploadHinh",
        put: "QuanLyPhim/CapNhatPhimUpload",
        delete: "QuanLyPhim/XoaPhim?MaPhim=",
    }
}

export { admin_domain }