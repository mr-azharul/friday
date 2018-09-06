import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';

import {Flist} from "../data/flist.interface";
import examples from "../data/functions";
import {CommandsPage} from "../pages/commands/commands";

@Component({
  templateUrl: 'app.html'
})
export class MyApp{
  rootPage:any = HomePage;
  commandCollection: {category: string, example: string, examples: Flist[], icon: string}[];

  @ViewChild('sidemenu') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, private menuCtrl: MenuController ) {
            this.commandCollection = examples; }

  onGoToCommand(commands: Flist) {
    this.nav.push(CommandsPage, commands);
    this.menuCtrl.close();
  }

}

