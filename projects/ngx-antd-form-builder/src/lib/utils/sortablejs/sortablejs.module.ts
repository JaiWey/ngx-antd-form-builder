import {ModuleWithProviders, NgModule} from '@angular/core';
import {SortablejsDirective} from './sortablejs.directive';
import {Options} from 'sortablejs';

@NgModule({
  declarations: [SortablejsDirective],
  exports: [SortablejsDirective],
})
export class SortablejsModule {
}
