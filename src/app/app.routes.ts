import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuardService } from './core/guards/authguard.service';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { ListComponent } from '../components/list/list.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { LandingPageComponent } from './core/components/landing-page/landing-page.component';

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
            { path: 'list', 
              component: ListComponent,
            },
            {
                path: 'dashboard',
                component : ListComponent,
            },
            {
                path : 'analytics',
                component : ListComponent
            },
            { 
                path: 'list/add-task', 
                component: AddTaskComponent 
            },
            {  
                path: 'edit-task/:id',
                component: AddTaskComponent
            }
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
