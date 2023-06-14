import axios from "axios";


export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bl_lat ? bl_lat : "-8.155500405678184",
          tr_latitude:  tr_lng ? tr_lng:"-7.931122013418221",
          bl_longitude:bl_lng?bl_lng: "-35.00780075482615",
          tr_longitude:tr_lat?tr_lat:"-34.86063327899268",
          limit: '30',
          currency: 'USD',
          open_now: 'false',
          lunit: 'km',
          lang: 'pt_BR'
        },
        headers: {
          'X-RapidAPI-Key': '05c605478emshcab7f8025e40532p1312bfjsnf345724c0503',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};
