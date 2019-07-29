import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class OwnerService {

  ownerApi = 'https://thawing-chamber-47973.herokuapp.com/owners';

  constructor(public http: HttpClient) {
  }

  
  getAll(): Observable<any>{
    return this.http.get(this.ownerApi);
  }

  get(id: string) {
    return this.http.get(this.ownerApi + '/' + id);
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
      result = this.http.post(this.ownerApi, owner);
    }    
    return result;
  }

}
