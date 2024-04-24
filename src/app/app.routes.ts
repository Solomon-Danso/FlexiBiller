import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';

export const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'access-denied',
    component:AccessDeniedComponent
  },
  {
    path: 'dashboard',
    component:DashboardComponent
  },

  {
    path: 'payment-history',
    component:PaymentHistoryComponent
  },

  {
    path: '**',
    redirectTo: 'access-denied'
  }

];
