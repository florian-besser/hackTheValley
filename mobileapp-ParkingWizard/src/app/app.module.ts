import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SettingsPage } from '../pages/settings/settings';
import { FindPage } from '../pages/find/find';
import { ProvideSlotsPage } from '../pages/provide-slots/provide-slots';
import { OpenPage } from '../pages/open/open';
import { TabsPage } from '../pages/tabs/tabs';
import { Blockchain } from '../providers/blockchain';
import { HttpClient } from '../providers/http-client';

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    FindPage,
    ProvideSlotsPage,
    OpenPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    FindPage,
    ProvideSlotsPage,
    OpenPage,
    TabsPage
  ],
  providers: [
    Blockchain,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
