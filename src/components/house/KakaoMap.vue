/* eslint-disable */
<template>
  <section class="test">
    <div id="map"></div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      markers: [],
      latitude: 0,
      longitude: 0,
    };
  },
  created() {
    if (!("geolocation" in navigator)) {
      return;
    }

    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;

        if (window.kakao && window.kakao.maps) {
          this.initMap();
        } else {
          const script = document.createElement("script");
          /* global kakao */
          script.onload = () => kakao.maps.load(this.initMap);
          script.src =
            "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
            process.env.VUE_APP_KAKAO_MAP_API_KEY;
          document.head.appendChild(script);
        }
      },
      (err) => {
        alert(err.message);
        // eslint-disable-next-line
      }
    );
  },
  computed: {
    ...mapState(["houses", "isOK"]),
  },
  watch: {
    isOK() {
      this.setAptsOnMap();
    },
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
      this.displayMarker([[this.latitude, this.longitude]]);
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map(
        // eslint-disable-next-line
        (position) => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
              // eslint-disable-next-line
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          // eslint-disable-next-line
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    // setAptsOnMap() {
    //   // 주소-좌표 변환 객체를 생성합니다
    //   var geocoder = new kakao.maps.services.Geocoder();

    //   // 주소로 좌표를 검색합니다
    //   geocoder.addressSearch(
    //     "제주특별자치도 제주시 첨단로 242",
    //     function (result, status) {
    //       // 정상적으로 검색이 완료됐으면
    //       if (status === kakao.maps.services.Status.OK) {
    //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

    //         // 결과값으로 받은 위치를 마커로 표시합니다
    //         var marker = new kakao.maps.Marker({
    //           map: map,
    //           position: coords,
    //         });

    //         // 인포윈도우로 장소에 대한 설명을 표시합니다
    //         var infowindow = new kakao.maps.InfoWindow({
    //           content:
    //             '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
    //         });
    //         infowindow.open(map, marker);

    //         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    //         map.setCenter(coords);
    //       }
    //     },
    //   );
    // },
  },
};
</script>

<style scoped>
#map {
  width: 500px;
  height: 400px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
/* eslint-enable */
