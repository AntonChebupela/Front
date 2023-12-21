import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const NavItem = ({ path, title }: { path: string, title: string }) => {
    return ( 
        <Button variant="link" className="text-base text-gray-600 hover:text-gray-900">
            <Link to={path}>
                {title}
            </Link>
        </Button>
     );
}

export default NavItem;