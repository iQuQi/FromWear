import { API } from 'aws-amplify';
import { listUsers } from '../graphql/queries.js';

export default function searchSameTagUsers(profileUser) {
    //console.log(profileUser);
    let same3=[],same2=[],same1=[];
	let result_user=[];

    API.graphql({
        query: listUsers
    }).then(res=>{
        res.data.listUsers.items.map((user)=>{

            //console.log(user);
        
            // 지금 user와 비교
            if (user.id == profileUser.id) return false;

            //태그 필터링
            let same = 0;
            user.my_tag_list.map((user_tag)=>{
                profileUser.my_tag_list.map(tag=>{
                    if(user_tag == tag) same++;
                })
            })

            //console.log("same: "+ same);
            if(same == 3) same3=[...same3,user]
            else if(same==2) same2=[...same2,user]
            else if(same==1) same1=[...same1,user]
            return true;

        })
        
        same3=same3.sort(function(a,b){return b.follower_num-a.follower_num});
        same2=same2.sort(function(a,b){return b.follower_num-a.follower_num});
        same1=same1.sort(function(a,b){return b.follower_num-a.follower_num});

        result_user=[...same3,...same2,...same1];
        return result_user;
    })
    .catch(e=>console.log(e))
	  
}