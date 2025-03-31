import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { AuthGuardService } from '../services/authguard.service';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { ListComponent } from '../components/list/list.component';

export const routes: Routes = [
    {   
        path:'' , 
        redirectTo:'/login', 
        pathMatch:'full'
    },
    {   
        path:'', 
        component:LayoutComponent,
        children: [
            { path: 'list', component: ListComponent }, // Default Route
            { path: 'add-task', component: AddTaskComponent },
          ],
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuardService],
    },
    {
        path:'add-task',
        component:AddTaskComponent,
        canActivate : [AuthGuardService]
    },
    {
        path:'edit-task/:id',
        component:AddTaskComponent,
        canActivate:[AuthGuardService]
    }
];
