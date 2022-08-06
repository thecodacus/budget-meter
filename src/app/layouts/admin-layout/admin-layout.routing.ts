import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AccountsComponent } from 'src/app/pages/accounts/accounts.component';
import { AccountSingleComponent } from 'src/app/pages/accounts/account-single/account-single.component';
import { TransactionsComponent } from 'src/app/pages/transactions/transactions.component';
import { TransactionSingleComponent } from 'src/app/pages/transactions/transaction-single/transaction-single.component';
import { CounterPartiesComponent } from 'src/app/pages/counter-parties/counter-parties.component';
import { CounterPartiesSingleComponent } from 'src/app/pages/counter-parties/counter-parties-single/counter-parties-single.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'accounts', component: AccountsComponent },
    { path: 'accounts/:id', component: AccountSingleComponent },
    { path: 'transactions', component: TransactionsComponent },
    { path: 'transactions/:id', component: TransactionSingleComponent },
    { path: 'counterparties', component: CounterPartiesComponent },
    { path: 'counterparties/:id', component: CounterPartiesSingleComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent }
];
