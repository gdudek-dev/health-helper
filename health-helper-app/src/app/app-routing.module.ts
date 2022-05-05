import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SelectLanguageComponent } from './components/user-settings/select-language/select-language.component';
import { SettingsComponent } from './components/user-settings/settings/settings.component';
import { AdminAuthGuard } from './services/authorization/admin.auth.guard';
import { AuthGuard } from './services/authorization/auth.guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'user',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'home', component: HomeComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {
            path: 'language',
            component: SelectLanguageComponent
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
