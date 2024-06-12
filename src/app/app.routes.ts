import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: "", loadChildren: () => import('./features/home/home.module').then(x => x.HomeModule) },
    { path: "login", loadChildren: () => import('./features/login/login.module').then(x => x.LoginModule) },
    { path: "**", loadChildren: () => import('./features/not-found/not-found.module').then(x => x.NotFoundModule) },
];
