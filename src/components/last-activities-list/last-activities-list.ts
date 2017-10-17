import { Component } from '@angular/core';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';

@Component({
  selector: 'last-activities-list',
  templateUrl: 'last-activities-list.html'
})
export class LastActivitiesListComponent {

  activities = []

  constructor(
    private activityService: ActivityServiceProvider
  ) {
    this.getActivities()
  }

  getActivities () {
    this.activityService.getActivities().subscribe((response) => {
      if (response['_body']) {
        this.activities = response.json()
      }
    })
  }

}
