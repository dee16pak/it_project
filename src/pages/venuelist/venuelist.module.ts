import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VenuelistPage } from './venuelist';

@NgModule({
  declarations: [
    VenuelistPage,
  ],
  imports: [
    IonicPageModule.forChild(VenuelistPage),
  ],
})
export class VenuelistPageModule {}
