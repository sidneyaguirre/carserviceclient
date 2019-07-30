import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { OwnerService } from "../shared/owner/owner.service";
import { CarService } from "../shared/car/car.service";
import { GiphyService } from "../shared/giphy/giphy.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-owner-car-list",
  templateUrl: "./owner-car-list.component.html",
  styleUrls: ["./owner-car-list.component.css"]
})
export class OwnerCarListComponent implements OnInit {
  owners: Array<any>;
  cars: Array<any>;
  result: Array<any>;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private carService: CarService,
    private giphyService: GiphyService
  ) {}

  ngOnInit() {
    this.result = [];
    this.owners = [];
    this.ownerService.getAll().subscribe((result: any) => {
      this.owners = result._embedded.owners;
      this.carService.getAll().subscribe(data => {
        for (const car of data) {
          if (car.ownerDni) {
            this.giphyService.get(car.name).subscribe(url => {
              car.giphyUrl = url;
              for (const owner of this.owners) {
                if (car.ownerDni === owner.dni) {
                  this.result.push({
                    carName: car.name,
                    ownerDni: car.ownerDni,
                    ownerName: owner.name,
                    profession: owner.profession,
                    giphyUrl: car.giphyUrl
                  });
                }
              }
            });
          }
        }
      });
    });
  }
}
