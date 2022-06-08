import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";

function Locationmap () {
  return (
    <div>
      <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_MAP_CLIENT_ID}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
      >
      <div className="naver_map">
        <NaverMap
        mapDivId={"naver-map"}
        style={{
          left: '400px',
          top: '170px',
          width: '35%',
          height: '350px',
        }}
        defaultCenter={{ lat: 37.49988, lng: 127.03856 }}
        defaultZoom={16}
        zoomControl={true} // 지도 zoom 허용
        />
      </div>
      </RenderAfterNavermapsLoaded>
    </div>
  )
}

export default Locationmap;