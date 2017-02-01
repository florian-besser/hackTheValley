import { Component } from '@angular/core';

import { FindPage } from '../find/find';
import { SettingsPage } from '../settings/settings';
import { ProvideSlotsPage } from '../provide-slots/provide-slots';
import { OpenPage } from '../open/open';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = FindPage;
  tab2Root: any = OpenPage;
  tab3Root: any = SettingsPage;
  tab4Root: any = ProvideSlotsPage;

  constructor() {

  }
}
