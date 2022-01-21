import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrivacyComponent } from './privacy.component';

/**
 * Privacy route
 */
const route = {
    path: '',
    component: PrivacyComponent
};

/**
 * Routes
 */
const routes = [route];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrivacyRoutingModule {}
