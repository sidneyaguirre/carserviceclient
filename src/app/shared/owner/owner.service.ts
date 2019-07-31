import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class OwnerService {

  API = 'https://thawing-chamber-47973.herokuapp.com'; 

  constructor(public http: HttpClient) {
  }

  
  getAll(): Observable<any>{
    return this.http.get(this.API + '/owners');
  }

  get(id: string) {
    return this.http.get(this.API + '/owner/?dni=' + id);
  };

  remove(href: string) {
    return this.http.delete(href);
  }

  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    console.log(owner);
    
    if (owner['href']) {
      result = this.http.put(owner.href, owner); 
      console.log(`el resultado es: ${result}`);     
    } else {
      result = this.http.post(this.API + '/owners', owner);
    }    
    return result;
  }

}
