import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SearchPipe } from './pipes/search';
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from  '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AuthenticationGuard } from './services/authentication.guard';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { RequestComponent } from './modals/request/request.component';
import { CommonModule } from '@angular/common';
import '@angular/compiler';
import { ContactComponent } from './contact/contact.component'

 const  appRoutes: Routes  = [
   { path: '', component: HomeComponent},
   { path: 'home', component: HomeComponent, canActivate: [ AuthenticationGuard ]},
   { path: 'login', component: LoginComponent},
   { path: 'conversation/:uid', component: ConversationComponent},
   { path: 'profile', component: ProfileComponent},
 ]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    RequestComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // los módulos extienden la funcionalidad de nuestra application
    RouterModule.forRoot(appRoutes),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    ImageCropperModule,
    NgbModule,
    // BootstrapModalModule.forRoot({ container: document.body }),
    FormsModule,
    CommonModule,
  ],
  providers: [AngularFireStorage,],
  bootstrap: [AppComponent],
  entryComponents: [RequestComponent]
})
export class AppModule { 

  
}
