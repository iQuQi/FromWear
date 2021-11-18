import * as React from 'react';
import {API, Auth} from 'aws-amplify';
import {getTagList, getStyleTag,listTagLists,listStyleTags} from '../graphql/queries.js';
import { ratingClasses } from '@mui/material';


//최대 4글자
export const static_tag_Data = [
 {
   id: "1",
   name: "캐주얼"
 },
 {
  id: "2",
  name: "댄디"
},
{
  id: "3",
  name: "깔끔한"
},
{
  id: "4",
  name: "클래식"
},
{
  id: "5",
  name: "귀여운"
},
{
  id: "6",
  name: "세련된"
},
{
  id: "7",
  name: "정장"
},
{
  id: "8",
  name: "청순한"
},
{
  id: "9",
  name: "섹시한"
},
{
  id: "10",
  name: "스트릿"
},
{
  id: "11",
  name: "오피스"
},
{
  id: "12",
  name: "파자마"
},
{
  id: "13",
  name: "하객룩"
},
{
  id: "14",
  name: "단정한"
},
{
  id: "15",
  name: "화려한"
},
{
  id: "16",
  name: "소개팅"
},
{
  id: "17",
  name: "꾸안꾸"
},
{
  id: "18",
  name: "운동복"
},
{
  id: "19",
  name: "남친룩"

},
{
  id: "20",
  name: "러블리"
},
{
  id: "21",
  name: "10대"
},
{
  id: "22",
  name: "20대"
},
{
  id: "23",
  name: "30대"
},
{
  id: "24",
  name: "40대"
},
{
  id: "25",
  name: "힙합"
},
{
  id: "26",
  name: "시크"
},
{
  id: "27",
  name: "봄코디"
},
{
  id: "28",
  name: "여름코디"
},
{
  id: "29",
  name: "가을코드"
},
{
  id: "30",
  name: "겨울코드"
},
{
  id: "31",
  name: "빈티지"
},
{
  id: "32",
  name: "모던"
},
{
  id: "33",
  name: "레이어드"
},
{
  id: "34",
  name: "스포티"
},
{
  id: "35",
  name: "복고풍"
},
{
  id: "36",
  name: "박시핏"
}
];



export let get_rank_tag =(handle_rank_tag_data)=>{
    var style_tags;
    API.graphql({
      query: listStyleTags,
    })
    .then(res=>{
      style_tags = res.data.listStyleTags.items;
      //a.sort(function (a, b) { return b - a }) - javascript sorting 방법
      return style_tags.sort(function(a,b){return b.num-a.num});

    })
    .then((res)=>
       handle_rank_tag_data(res.slice(0,10))
    )
    .catch(e=>console.log(e))

}

