import { Component, ViewChild } from '@angular/core';
import { Robot } from './model/robot.model';
import { RobotService } from './service.robot';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'robot-manager',
  templateUrl: './views/robot.manager.component.html'
})

export class RobotManagerComponent {

	@ViewChild(ModalComponent) modal: ModalComponent;

	constructor (private _robotService : RobotService) {}

	public robots : Robot[];

	public createRobot(robot) {
		this.modal.show(robot, 'C');
	}

}