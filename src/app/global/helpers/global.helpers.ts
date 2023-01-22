import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { Category, CategoryTree } from "src/app/interfaces/category";
import { Payment } from "src/app/interfaces/payment";
import { environment } from "src/environments/environment";

export class GlobalHelpers{

    static subString(s:string, length:number){
        let r=s
        if(s && s.length>length){
          r=s.substring(0, length)+'...'
        }
        return r
    }

    static formatDateAndHour(date:Date){
      let datepipe=new DatePipe('en-US');
      let t = ''
      if (date) {
        t = datepipe.transform(new Date(date), 'dd/MM/yyyy hh:mm:ss a') || '';
      }
      return t;
    }
    static formatDate(date:Date, format:string='dd/MM/yyyy'){
      let datepipe=new DatePipe('en-US');
      let t = ''
      if (date) {
        t = datepipe.transform(new Date(date), format) || '';
      }
      return t;
    }

    static downloadProofOfPayment(p:Payment){
      if(p.payToken)
        window.open(environment.API_URL+"/v1/payments/"+p.payToken+"/proof-of-payment");
    } 
    
    static diffBetweenDate(dateMinor:Date, dateMajor:Date){
      let diffMs = dateMajor.getTime()/1000;
      //let diffMs = (dateMajor.getTime()-dateMinor.getTime());
      //let diffDays = Math.floor(diffMs / 86400000); 
      //let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
      //let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); 
      //return diffDays + " dias, " + diffHrs + " horas, " + diffMins + " minutos";
      return String(diffMs)
    }
   

    static convertSecondsToHHMMSS(s:number){
      let hours: number = 0
      let minutes: number = 0
      let seconds: number = 0
      let nameLong:string='00:00:00'
  

      s=Math.trunc(s)
      hours=Math.floor(s/3600);
      s%= 3600;
      minutes = Math.floor(s / 60);
      s = s % 60;
      seconds=s

      return nameLong=(hours > 9 ? hours : "0" + hours)
      + ":" + (minutes > 9 ? minutes : "0" + minutes)
      + ":" + (seconds > 9 ? seconds : "0" + seconds);
  
    }

  
    public static openInNewWindow(urls:string, router:Router){

      const url = router.serializeUrl(
        router.createUrlTree([urls])
    );
      
      window.open(url, '_blank');
    }

    
    public static monthBefore (){
      let year=new Date().getFullYear()
      let month=new Date().getMonth()+1
      let day=1;
      
      if(month==1){
        year-=1
        month=12
      }

      return new Date(year, month-1,1)
    }

    public static openWindowWithPost(url:any, data:any) {
      var form = document.createElement("form");
      form.target = "_blank";
      form.method = "POST";
      form.action = url;
      form.style.display = "none";
    
      for (var key in data) {
          var input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = data[key];
          form.appendChild(input);
      }
    
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }
   

}