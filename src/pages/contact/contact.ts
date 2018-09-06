import {Component, OnInit} from "@angular/core";
import {NavParams} from "ionic-angular";
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [
    CallNumber
  ]
})

export class ContactPage implements OnInit{
  list: any;
  constructor(private navParams: NavParams, private callNumber: CallNumber) {}

  ngOnInit() {
    this.list = this.navParams.data;
  }

  dial(number) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log("Dialing"))
      .catch(() => console.log('Error launching dialer'));
  }
}
