import { Injectable } from '@angular/core';
import { Robot } from './model/robot.model';
import { Http, Response }  from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import './rxjs-operators';

@Injectable()
export class RobotService {

	// Observable navItem source
	private _singleRobotSource = new BehaviorSubject<any>({'operation': 0, 'id': 0});
	// Observable navItem stream
	_singleRobot$ = this._singleRobotSource.asObservable();

	constructor (private http: Http) {}

	getRobots(): Observable<Robot[]> {
		return this.http.get(`http://localhost:8080/robot`)
						.map((res:Response) => res.json());
	}

	getRobot(id): Observable<Robot> {
		return this.http.get(`http://localhost:8080/robot/`+id)
						.map((res:Response) => res.json());
	}

	updateRobot(robot){
		return this.http.put(`http://localhost:8080/robot/`+robot.id, robot)
						.map((res:Response) => { 
							res.json(); 
							this._singleRobotSource.next({'operation': 2, 'id': robot.id});});
	}

	createRobot(robot){
		return this.http.post(`http://localhost:8080/robot/`, robot)
						.map((res:Response) => { 
							res.json(); 
							this._singleRobotSource.next({'operation': 1});});
	}

	deleteRobot(id){
		return this.http.delete(`http://localhost:8080/robot/`+id)
						.map((res:Response) => { 
							res.json(); 
							this._singleRobotSource.next({'operation': 1});});
	}

}