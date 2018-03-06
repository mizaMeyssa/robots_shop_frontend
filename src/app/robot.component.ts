import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Robot } from './model/robot.model';
import { RobotService } from './service.robot';
import { ModalComponent } from './modal.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'robot-card',
  templateUrl: './views/robot.component.html'
})

export class RobotComponent {

	@Input() robot : Robot;
	@ViewChild(ModalComponent) modal: ModalComponent;

	subscription : Subscription;

	constructor(private _robotService : RobotService) {};

	ngOnInit() {
		// This will fire twice, once with 0 and once with 1
		this.subscription = this._robotService._singleRobot$.subscribe(eventObj => {
			if (eventObj && eventObj.operation === 2 && eventObj.id === this.robot.id) {
				this.loadRobot(this.robot.id);
			}
		});
	}

	public loadRobot(id) {
		this._robotService.getRobot(id).subscribe(res => this.robot = res);
	}

	public zoomRobot(robot) {
		this.modal.show(robot, 'R');
	}

	public buyRobot(id) {
	}

	public editRobot(robot) {
		this.modal.show(robot, 'E');
	}

	public sellRobot(robot) {
		robot.sold = true;
		this._robotService.updateRobot(robot).subscribe();	
	}

	public deleteRobot(id) {
		if(confirm("Are you sure to delete This Robot?")) {
			this._robotService.deleteRobot(id).subscribe();	
		}
	}

	public cloneRobot(robot) {
		this.modal.show(robot, 'C');
	}

}
