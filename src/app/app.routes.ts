import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuardService } from './core/guards/authguard.service';
import { ListComponent } from '../components/task/list/list.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { TaskWrapperComponent } from '../components/task/task-wrapper/task-wrapper.component';
import { KanbanComponent } from '../components/task/kanban/kanban.component';


export const routes: Routes = [
    {   
        path:'' , 
        loadComponent: () => import('./core/components/landing-page/landing-page.component').then(m => m.LandingPageComponent), 
        pathMatch:'full'
    },
    {   
        path:'', 
        component:LayoutComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'tasks',
              component : TaskWrapperComponent,
              children : [
                {
                    path : 'list',
                    component : ListComponent
                },
                {
                    path : 'kanban',
                    component : KanbanComponent,
                },
                {
                    path : '',
                    redirectTo: 'list',
                    pathMatch: 'full'
                }
              ] 
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
                path: 'tasks/add-task', 
                loadComponent: () => import('../components/add-task/add-task.component').then(m => m.AddTaskComponent)
            },
            {  
                path: 'tasks/edit-task/:id',
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
