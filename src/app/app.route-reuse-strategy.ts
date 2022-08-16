import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

export class AppRouteReuseStrategy implements RouteReuseStrategy{
    
    
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log("HOlaaa")
        return false;    
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        console.log("HOlaaa")

    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log("HOlaaa")

        return false;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        console.log("HOlaaa")
 
        return null;   
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        console.log("HOlaaa")

        return future.routeConfig=== curr.routeConfig
    }
}