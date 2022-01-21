import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImprintComponent } from './imprint.component';

/**
 * Imprint route
 */
const route = {
    path: '',
    component: ImprintComponent
};

/**
 * Routes
 */
const routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImprintRoutingModule {}
