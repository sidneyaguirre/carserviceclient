import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { CarService } from "../shared/car/car.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-owner-detele',
  templateUrl: './owner-detele.component.html',
  styleUrls: ['./owner-detele.component.css']
})
export class OwnerDeteleComponent implements OnInit {

  owners: Array<any>
  public OwnerstoDelete: Array<any>;


  constructor(private ownerService: OwnerService,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,) {
  }

  ngOnInit() {
    this.ownerService.getAll().subscribe((data:any) => { 
      this.owners = data._embedded.owners;
      // for(const owner of this.owners){

      // }
    })	
  }


  gotoList() {
    this.router.navigate(["/owner-list"]);
  }


  getChecked(owner){
    this.OwnerstoDelete.push(owner);
  }

  remove() {
    for (const owner of this.OwnerstoDelete) {
      this.ownerService.remove(owner._links.self.href).subscribe(result => {
        const dni = owner.dni;
        this.carService.getAll().subscribe((data) => {
          for (const car of data) {
            if (car.ownerDni === dni) {
              car.ownerDni = null;
              this.carService.save(car).subscribe(() => {
              });
            }
          }
        });
        this.gotoList();
      });
    }
  }

}
