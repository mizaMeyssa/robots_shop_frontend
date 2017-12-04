import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RobotManagerComponent } from './robot.manager.component';
import { ListComponent } from './list.component';
import { RobotComponent } from './robot.component';
import { ModalComponent } from './modal.component';

import {RobotService} from './service.robot';

@NgModule({
  declarations: [
    RobotManagerComponent,
    ListComponent,
    RobotComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [RobotService],
  bootstrap: [RobotManagerComponent, ListComponent]
})
export class AppModule { }
