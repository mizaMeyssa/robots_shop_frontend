/*
 * Inspired from modal window component suggested by Stephan Paul [https://stackoverflow.com/users/1087131/stephen-paul]
 * https://stackoverflow.com/questions/34513558/angular-2-0-and-modal-dialog
 */

import { Component, Input, Output } from '@angular/core';
import { Robot } from './model/robot.model';
import { RobotService } from './service.robot';

@Component({
  selector: 'modal-window',
  templateUrl: './views/modal.component.html'
})

export class ModalComponent{

  public modal_robot : Robot;
  public operation : string;
  public editMode : boolean;
  public visible : boolean = false;
  public visibleAnimate : boolean = false;

  constructor(private _robotService : RobotService) {};

  public show(robot : Robot, operation : string): void {
    this.operation = operation? operation : 'R';
    this.editMode = ( this.operation === 'E' || this.operation === 'C' )? true : false;
    this.visible = true;
    // deep copy of robot
    this.modal_robot = Object.assign({}, robot);
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public save(): void {
    if (this.operation === 'E') {
      this._robotService.updateRobot(this.modal_robot).subscribe(); 
    } else if (this.operation === 'C') {
      delete this.modal_robot['id'];
      this._robotService.createRobot(this.modal_robot).subscribe(); 
    }
    this.hide();
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}