import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router";
import UserPage from "./UserPage.jsx";

function UserPagePath() {
    const {userid} = useParams();
    const isMobile = useMediaQuery({maxWidth: 391});

    return (
      <div>
          <UserPage userid = {userid} is_mobile={isMobile}/>
      </div>  
    );
        
}

export default UserPagePath;