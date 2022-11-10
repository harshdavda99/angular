import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/authorisation/login/login.component';
import { RegisterComponent } from './components/authorisation/register/register.component';
import { ChatWindowComponent } from './components/Messages/chat-window/chat-window.component';
import {DashboardComponent} from './components/dashboard/dashboard.component'
import { AuthguardGuard } from './components/shared/authguard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthguardGuard] },
  { path: 'chatbox/:id', component: ChatWindowComponent, canActivate: [AuthguardGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardGuard] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
