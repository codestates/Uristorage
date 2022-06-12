import React, { useState, useEffect } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import axios from "axios";
import { useSelector } from "react-redux";

function Locationmap () {
  const userInfo = useSelector((state) => state.userInfo);
  const users_id = userInfo.id;

  const [locationWord, setLocationWord] = useState([])
  useEffect(() => {
    async function getLocationWords() {
      await axios.get(`${process.env.REACT_APP_URL}/words/user/${users_id}`)
    .then ((res) => setLocationWord(res.data))}
    getLocationWords()
  }, [])
  const markerInfo = []
  for (let i = 0; i < locationWord.length; i++) {
    if (locationWord[i].type === 'place' && locationWord[i].map !== "") { // 두번째 조건은 차후에 삭제
      markerInfo.push(locationWord[i].map)
    }
  }
  // console.log(markerInfo)
   console.log(locationWord)

  const decodeMarkerInfo = []
  for (let i = 0; i < markerInfo.length; i++) {
     if (decodeMarkerInfo[i] !== 0 || decodeMarkerInfo[i] !== '') {
     let el = markerInfo[i].split(',')
     decodeMarkerInfo.push({ lat: el[0], lng: el[1] })
    }
  }

  console.log(decodeMarkerInfo)

  const popUpInfo = []
  for (let i = 0; i < locationWord.length; i++) {
    if (locationWord[i].type === 'place' && locationWord[i].map !== "") { // 두번째 조건은 차후에 삭제
      popUpInfo.push([locationWord[i].word, locationWord[i].summary])
    }
  }
  console.log(popUpInfo)

  const clickMarkerHandler = () => {
    alert(popUpInfo)
  }

  //const navermaps = window.naver.maps;
  //console.log(window.naver.maps)

  return (
    <div>
      <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_MAP_CLIENT_ID}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
      >
        <NaverMap
        className='Location_map'
        mapDivId={"naver-map"}
        defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
        defaultZoom={16}
        zoomControl={true} // 지도 zoom 허용
        draggable={true}
        >
        {decodeMarkerInfo.map((address) => {
          return (
           <Marker
           position={address}
           onClick={clickMarkerHandler}
           //animation={navermaps.Animation. DROP}
           />)
          })
        }
        </NaverMap>
      </RenderAfterNavermapsLoaded>
    </div>
  )
}

export default Locationmap;