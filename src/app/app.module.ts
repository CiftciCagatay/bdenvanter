import { NgModule, ErrorHandler } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//PAGES
import { HomePage } from '../pages/home/home';

import { NewUserFormPage } from '../pages/new-user-form/new-user-form';
import { UsersListPage } from '../pages/users-list/users-list';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserFormPage } from '../pages/user-form/user-form';

import { ComputersListPage } from '../pages/computers-list/computers-list';
import { ComputerDetailsPage } from '../pages/computer-details/computer-details';
import { ComputerFormPage } from '../pages/computer-form/computer-form';

import { PrintersListPage } from '../pages/printers-list/printers-list';
import { PrinterDetailsPage } from '../pages/printer-details/printer-details';
import { PrinterFormPage } from '../pages/printer-form/printer-form';

import { BarcodeReadersListPage } from '../pages/barcode-readers-list/barcode-readers-list';
import { BarcodeReaderDetailsPage } from '../pages/barcode-reader-details/barcode-reader-details';
import { BarcodeReaderFormPage } from '../pages/barcode-reader-form/barcode-reader-form';

import { BarcodePrintersListPage } from '../pages/barcode-printers-list/barcode-printers-list';
import { BarcodePrinterDetailsPage } from '../pages/barcode-printer-details/barcode-printer-details';
import { BarcodePrinterFormPage } from '../pages/barcode-printer-form/barcode-printer-form';

import { TabsPage } from '../pages/tabs/tabs';

//Providers
import { UserServiceProvider } from '../providers/user-service/user-service';
import { GlobalsProvider } from '../providers/globals/globals';
import { ComputerServiceProvider } from '../providers/computer-service/computer-service';
import { PrinterServiceProvider } from '../providers/printer-service/printer-service';
import { BarcodeReaderServiceProvider } from '../providers/barcode-reader-service/barcode-reader-service';
import { BarcodePrinterServiceProvider } from '../providers/barcode-printer-service/barcode-printer-service';
import { CitiesProvider } from '../providers/cities/cities';
import { ActivityServiceProvider } from '../providers/activity-service/activity-service';

import { OrderStringsPipe } from '../pipes/order-strings/order-strings';
import { OrderUsersPipe } from '../pipes/order-users/order-users';

import { ComputerDetailsCardComponent } from '../components/computer-details-card/computer-details-card';
import { PrinterDetailsCardComponent } from '../components/printer-details-card/printer-details-card';
import { BarcodePrinterDetailsCardComponent } from '../components/barcode-printer-details-card/barcode-printer-details-card';
import { BarcodeReaderDetailsCardComponent } from '../components/barcode-reader-details-card/barcode-reader-details-card';
import { UserDetailsCardComponent } from '../components/user-details-card/user-details-card';
import { LastActivitiesListComponent } from '../components/last-activities-list/last-activities-list';
import { FormatDatePipe } from '../pipes/format-date/format-date';
import { ItemCountReportCardComponent } from '../components/item-count-report-card/item-count-report-card';
import { ReportServiceProvider } from '../providers/report-service/report-service';


@NgModule({
  declarations: [
    MyApp,
    
    HomePage,
    NewUserFormPage,
    UsersListPage,
    UserDetailsPage,
    UserFormPage,

    ComputersListPage,
    ComputerDetailsPage,
    ComputerFormPage,

    PrintersListPage,
    PrinterDetailsPage,
    PrinterFormPage,

    BarcodeReadersListPage,
    BarcodeReaderDetailsPage,
    BarcodeReaderFormPage,

    BarcodePrintersListPage,
    BarcodePrinterDetailsPage,
    BarcodePrinterFormPage,
    
    TabsPage,

    OrderStringsPipe,
    OrderUsersPipe,
    FormatDatePipe,

    UserDetailsCardComponent,
    ComputerDetailsCardComponent,
    PrinterDetailsCardComponent,
    BarcodePrinterDetailsCardComponent,
    BarcodeReaderDetailsCardComponent,
    
    LastActivitiesListComponent,
    ItemCountReportCardComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
    HomePage,
    NewUserFormPage,
    UsersListPage,
    UserDetailsPage,
    UserFormPage,

    ComputersListPage,
    ComputerDetailsPage,
    ComputerFormPage,

    PrintersListPage,
    PrinterDetailsPage,
    PrinterFormPage,

    BarcodeReadersListPage,
    BarcodeReaderDetailsPage,
    BarcodeReaderFormPage,

    BarcodePrintersListPage,
    BarcodePrinterDetailsPage,
    BarcodePrinterFormPage,

    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    GlobalsProvider,
    ComputerServiceProvider,
    PrinterServiceProvider,
    BarcodeReaderServiceProvider,
    BarcodePrinterServiceProvider,
    CitiesProvider,
    ActivityServiceProvider,
    ReportServiceProvider
  ]
})
export class AppModule {}
