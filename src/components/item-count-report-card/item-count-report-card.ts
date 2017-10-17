import { Component } from '@angular/core';
import { ReportServiceProvider } from '../../providers/report-service/report-service';

@Component({
  selector: 'item-count-report-card',
  templateUrl: 'item-count-report-card.html'
})
export class ItemCountReportCardComponent {

  data = {}
  
  constructor(
    private reportService: ReportServiceProvider
  ) {
    this.getItemCountReport()
  }

  getItemCountReport (location = '') {
    this.reportService.getItemCountReport(location).subscribe((response) => {
      console.log(response)
      
      if (response['_body']) {
        this.data = response.json()
      }
    })
  }

}
