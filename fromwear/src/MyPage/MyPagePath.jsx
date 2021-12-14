import { useParams } from "react-router";
import MyPage from "./MyPage.jsx";

function MyPagePath() {
    const {userid} = useParams();
    
    return (
      <div>
          <MyPage userid = {userid}/>
      </div>  
    );
        
}

export default MyPagePath;