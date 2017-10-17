import { NgModule } from '@angular/core';
import { ComputerDetailsCardComponent } from './computer-details-card/computer-details-card';
import { PrinterDetailsCardComponent } from './printer-details-card/printer-details-card';
import { BarcodePrinterDetailsCardComponent } from './barcode-printer-details-card/barcode-printer-details-card';
import { BarcodeReaderDetailsCardComponent } from './barcode-reader-details-card/barcode-reader-details-card';
import { UserDetailsCardComponent } from './user-details-card/user-details-card';
import { LastActivitiesListComponent } from './last-activities-list/last-activities-list';
import { ItemCountReportCardComponent } from './item-count-report-card/item-count-report-card';
@NgModule({
	declarations: [ComputerDetailsCardComponent,
    PrinterDetailsCardComponent,
    BarcodePrinterDetailsCardComponent,
    BarcodeReaderDetailsCardComponent,
    UserDetailsCardComponent,
    LastActivitiesListComponent,
    ItemCountReportCardComponent],
	imports: [],
	exports: [ComputerDetailsCardComponent,
    PrinterDetailsCardComponent,
    BarcodePrinterDetailsCardComponent,
    BarcodeReaderDetailsCardComponent,
    UserDetailsCardComponent,
    LastActivitiesListComponent,
    ItemCountReportCardComponent]
})
export class ComponentsModule {}
