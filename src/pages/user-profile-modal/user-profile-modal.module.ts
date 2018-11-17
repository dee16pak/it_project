import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfileModalPage } from './user-profile-modal';

@NgModule({
  declarations: [
    UserProfileModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfileModalPage),
  ],
})
export class UserProfileModalPageModule {}
