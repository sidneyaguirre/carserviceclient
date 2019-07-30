import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { OwnerService } from "../shared/owner/owner.service";
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
    private ownerService: OwnerService
  ) {}

  ngOnInit() {
    this.owners = [];
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        console.log('el id es ' + id);
        
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

  remove(href) {
    this.ownerService.remove(href).subscribe(
      result => {
        this.gotoList();
      },
      error => console.error(error)
    );
  }
}
