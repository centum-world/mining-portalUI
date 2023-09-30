import { Injectable } from '@angular/core';
import { Subject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShareService {


  public data:any;
  constructor() { }

   userid = new Subject<any>();

 setUserId(response:any){
   localStorage.setItem('userdetail',response);
 }
 setRefferID(response:any){
   localStorage.setItem('mrefferid',response);
 }

 setMiningPartnerRefferId(response:any){
  localStorage.setItem('prefferid',response);
}

setMiningPartnerLiquidity(response:any){
  localStorage.setItem('pliquidity',response);
}

setPartnerId(response:any){
  localStorage.setItem('partnerdetails',response);
}
 
setPartnerUserId(response:any){
  localStorage.setItem('partnerUserId',response);
}

setToken(response:any){
  localStorage.setItem('token',response);
}

setStateToken(response:any){
  localStorage.setItem('stateToken',response);
}

setFranchiseToken(response:any){
  localStorage.setItem("franchiseToken",response)
}

 
}
