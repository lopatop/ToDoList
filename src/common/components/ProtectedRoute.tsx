import {Navigate, Outlet} from "react-router";
import {Path} from "@/common/routing/Routing.tsx";
import {ReactNode} from "react";

type ProtectedRouteProps = {
    children?: ReactNode;
    isAllowed: boolean
    redirectPath?: string

}


export const ProtectedRoute =({children, isAllowed, redirectPath = Path.Login}: ProtectedRouteProps)=>{


    if (!isAllowed) {
        return <Navigate to={redirectPath} />
    }
    return children? children: <Outlet/>
}