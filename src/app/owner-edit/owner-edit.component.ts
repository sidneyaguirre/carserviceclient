import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { OwnerService } from "../shared/owner/owner.service";
import { CarService } from "../shared/car/car.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-owner-edit",
  templateUrl: "./owner-edit.component.html",
  styleUrls: ["./owner-edit.component.css"]
})

export class OwnerEditComponent implements OnInit {
  owners: Array<any>;
  owner: any = {};
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private carService: CarService
  ) {}

  ngOnInit() {
    this.owners = [];
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        this.ownerService.getAll().subscribe((data: any) => {
          this.owners = data._embedded.owners;
          for (let element of this.owners) {
            if (element.dni == id) {
              this.owner = element;
              this.owner.href = element._links.self.href;
            }
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(["/owner-list"]);
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }

  remove(owner) {
    this.ownerService.remove(owner.href).subscribe(
      result => {
        this.carService.getAll().subscribe((data: any) => {
          for (let element of data) {
            if (element.ownerDni == owner.dni) {
              element.ownerDni = null;
              this.carService.save(element).subscribe(result => {
                this.gotoList();
              }
            )}else {
              console.log(`No se encuentra el owner ${owner.dni}`);
            }
          }
        });
      },
      error => console.error(error)
    );
  }
}
