import { Component, OnInit } from '@angular/core';
import { Robot } from './model/robot.model';
import { RobotService } from './service.robot';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'robot-list',
  templateUrl: './views/list.component.html'
})

export class ListComponent {

	subscription : Subscription;

	constructor (private _robotService : RobotService) {}

	public robots : Robot[];

	ngOnInit() {
		// This will fire twice, once with 0 and once with 1
		this.subscription = this._robotService._singleRobot$.subscribe(eventObj => {
			this.getListData();
			if (eventObj && (( eventObj.operation === 0) || (eventObj.operation === 1))) {
				this.getListData();
			}
		});
	}

	public getListData() {
		this._robotService.getRobots().subscribe( (robotData) => {this.robots = robotData;});
	}

}