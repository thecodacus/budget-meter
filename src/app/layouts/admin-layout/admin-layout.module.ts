import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetsModule } from 'src/app/widgets/widgets.module';
import { AccountSingleComponent } from 'src/app/pages/accounts/account-single/account-single.component';
import { AccountsComponent } from 'src/app/pages/accounts/accounts.component';
import { CounterPartiesComponent } from 'src/app/pages/counter-parties/counter-parties.component';
import { CounterPartiesSingleComponent } from 'src/app/pages/counter-parties/counter-parties-single/counter-parties-single.component';
import { TransactionSingleComponent } from 'src/app/pages/transactions/transaction-single/transaction-single.component';
import { TransactionsComponent } from 'src/app/pages/transactions/transactions.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    WidgetsModule
  ],
  declarations: [
    DashboardComponent,
    AccountsComponent,
    AccountSingleComponent,
    TransactionsComponent,
    TransactionSingleComponent,
    CounterPartiesComponent,
    CounterPartiesSingleComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule { }
