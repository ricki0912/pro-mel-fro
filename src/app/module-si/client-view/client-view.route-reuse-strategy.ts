import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";
/*
export class ClientViewRouteReuseStrategy implements RouteReuseStrategy{
    
    
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
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
}*/

export class ClientViewRouteReuseStrategy implements RouteReuseStrategy {
    routesToCache: string[] = [];
    storedRouteHandles = new Map<string, DetachedRouteHandle>();
   
    // Decides if the route should be stored
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log("ShouldDetach",route.routeConfig?.path)
       return this.routesToCache.indexOf(route.routeConfig?.path || '') > -1;
    }
   
    //Store the information for the route we're destructing
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        console.log("store", route.routeConfig?.path)
       this.storedRouteHandles.set(route.routeConfig?.path || '', handle);
    }
   
   //Return true if we have a stored route object for the next route
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log("shouldAtach", route.routeConfig?.path)
       return this.storedRouteHandles.has(route.routeConfig?.path || '');
    }
   
    //If we returned true in shouldAttach(), now return the actual route data for restoration
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle |null {
        console.log("retrieve", route.routeConfig?.path)
       /* const id: string = route.snapshot.params.id;
        const url: string = route.snapshot.url.join('');
        const user = route.snapshot.data.user;
        return this.storedRouteHandles.get(route.routeConfig?['path']);

        return null*/
        let path=null
        if(route.routeConfig){
           path=route.routeConfig.path || ''
           let r=this.storedRouteHandles.get(path);
           return r?r:null

        }else {
            return null;
            
        }
    }
   
    //Reuse the route if we're going to and from the same route
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
       return future.routeConfig === curr.routeConfig;
    }
   }