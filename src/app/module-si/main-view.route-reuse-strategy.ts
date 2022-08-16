import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";

export class MainViewRouteReuseStrategy implements RouteReuseStrategy{
    
    
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log("HOlaaa")
        return false;    
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
         return null;   
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig=== curr.routeConfig
    }
}