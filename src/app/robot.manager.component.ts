import { Component, ViewChild } from '@angular/core';
import { Robot } from './model/robot.model';
import { ModalComponent } from './modal.component';

import { RobotService } from './service.robot';
import { FileService } from './service.file';

@Component({
  selector: 'robot-manager',
  templateUrl: './views/robot.manager.component.html'
})

export class RobotManagerComponent {

	@ViewChild(ModalComponent) modal: ModalComponent;

	constructor (private _robotService : RobotService, private _fileService : FileService) {}

	public robots : Robot[];

	public createRobot() {
		this.modal.show(new Robot, 'C');
	}

	public uploadRobot() {
	}

	public downloadRobot() {
		this._robotService.getRobots().subscribe(robotData => {
			this._fileService.exportFileTxt(robotData, null);
		});
	}

}