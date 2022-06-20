import React, { useState, useEffect } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

function Locationmap({ worddata }) {

  console.log(worddata)

  const markerInfo = [];
  for (let i = 0; i < worddata.length; i++) {
    if (worddata[i].type === "place" && worddata[i].map !== "") {
      // 두번째 조건은 차후에 삭제
      markerInfo.push(worddata[i].map);
    }
  }

  const decodeMarkerInfo = [];
  for (let i = 0; i < markerInfo.length; i++) {
    if (decodeMarkerInfo[i] !== 0 || decodeMarkerInfo[i] !== "") {
      let el = markerInfo[i].split(",");
      decodeMarkerInfo.push({ lat: el[0], lng: el[1] });
    }
  }

  const popUpInfo = [];
  for (let i = 0; i < worddata.length; i++) {
    if (worddata[i].type === "place" && worddata[i].map !== "") {
      // 두번째 조건은 차후에 삭제
      popUpInfo.push([worddata[i].word, worddata[i].summary]);
    }
  }

  const [infoBelowMap, SetInfoBelowMap] = useState("");
  const clickMarkerHandler = (index) => {
    SetInfoBelowMap(popUpInfo[index][0] + " - " + popUpInfo[index][1]);
  };

  return (
    <div>
      <RenderAfterNavermapsLoaded ncpClientId={process.env.REACT_APP_MAP_CLIENT_ID} error={<p>Maps Load Error</p>} loading={<p>Maps Loading...</p>}>
        <NaverMap
          className="Location_map"
          mapDivId={"naver-map"}
          defaultCenter={decodeMarkerInfo[0]}
          defaultZoom={16}
          zoomControl={true} // 지도 zoom 허용
          draggable={true}
        >
          {decodeMarkerInfo.map((address, index) => {
            return (
              <Marker
                key={index}
                position={address}
                onClick={() => clickMarkerHandler(index)}
              />
            );
          })}
        </NaverMap>
        <div className="Map-info">{infoBelowMap}</div>
      </RenderAfterNavermapsLoaded>
    </div>
  );
}

export default Locationmap;