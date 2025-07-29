import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuardService } from './core/guards/authguard.service';
import { ListComponent } from '../components/task/list/list.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';


export const routes: Routes = [
    {   
        path:'' , 
        loadComponent: () => import('./core/components/landing-page/landing-page.component').then(m => m.LandingPageComponent), 
        pathMatch:'full',
        canActivate: [AuthGuardService] 
    },
    {   
        path:'', 
        component:LayoutComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'list',
              loadComponent : () => import('../components/task/task-wrapper/task-wrapper.component').then(m => m.TaskWrapperComponent), 
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
                loadComponent: () => import('../components/add-task/add-task.component').then(m => m.AddTaskComponent)
            },
            {  
                path: 'list/edit-task/:id',
                loadComponent: () => import('../components/add-task/add-task.component').then(m => m.AddTaskComponent)
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
