import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { AuthGuardService } from './core/guards/authguard.service';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { ListComponent } from '../components/list/list.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';

export const routes: Routes = [
    {   
        path:'' , 
        component:LandingPageComponent, 
        pathMatch:'full',
        canActivate: [AuthGuardService] 
    },
    {   
        path:'', 
        component:LayoutComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'list', component: ListComponent }, // Default Route
            { path: 'add-task', component: AddTaskComponent },
            { path: 'edit-task/:id', component: AddTaskComponent}
          ],
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuardService],
    },
    {    path: '**', 
        component:PageNotFoundComponent
    }
];
