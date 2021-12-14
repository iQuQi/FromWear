import { useParams } from "react-router";
import UserPage from "./UserPage.jsx";

function UserPagePath() {
    const {userid} = useParams();
    
    return (
      <div>
          <UserPage userid = {userid}/>
      </div>  
    );
        
}

export default UserPagePath;