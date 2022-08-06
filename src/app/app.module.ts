import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire/compat';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ModalBaseComponent } from './widgets/Popups/modal-base/modal-base.component';
import { DialogService } from './services/dialog.service';
import { WidgetsModule } from './widgets/widgets.module';
import { PortalModule } from '@angular/cdk/portal';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AccountSingleComponent } from './pages/accounts/account-single/account-single.component';
import { environment } from 'src/environments/environment';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionSingleComponent } from './pages/transactions/transaction-single/transaction-single.component';
import { CounterPartiesComponent } from './pages/counter-parties/counter-parties.component';
import { CounterPartiesSingleComponent } from './pages/counter-parties/counter-parties-single/counter-parties-single.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    WidgetsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
