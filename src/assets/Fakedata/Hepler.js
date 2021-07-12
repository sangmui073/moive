import cinemas from "./Cinemas.json";

class Helper {
  formatDataCine = (maHeThong, listCumRap) => {
    const listFormatCine = [];

    const heThong = cinemas.find((item) => {
      return item.maHeThong === maHeThong;
    });

    const { heThongRap } = heThong;
    if (!listCumRap) return
    for (let item of listCumRap) {
      const rap = heThongRap.find((value) => {
        return value.maCumRap === item.maCumRap;
      });

      listFormatCine.push({ ...item, ...rap });
    }

    return listFormatCine;
  };
}

export default Helper;
