import {Component, OnInit} from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage implements OnInit{
  get: any;
  constructor(private navParams: NavParams) {}

  ngOnInit() {
    this.get = this.navParams.data;
  }


}
