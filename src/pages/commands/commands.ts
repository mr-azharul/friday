import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {Flist} from "../../data/flist.interface";
@Component({
  selector: 'page-commands',
  templateUrl: 'commands.html'
})
export class CommandsPage implements OnInit{
  commands: {category: string, example: string, examples: Flist[], icon: string};
  constructor(private navParams: NavParams){}

  ngOnInit(){
    this.commands = this.navParams.data;
  }

}
