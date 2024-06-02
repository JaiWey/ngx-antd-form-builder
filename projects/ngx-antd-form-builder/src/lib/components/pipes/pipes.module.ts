import { NgModule } from "@angular/core";
import { HasRulePipe } from "./has-rule.pipe";
import { InputNumberMinMaxPipe } from "./input-number-min-max.pipe";

@NgModule({
  exports: [
    InputNumberMinMaxPipe,HasRulePipe,
  ],
  declarations: [
    InputNumberMinMaxPipe,HasRulePipe,
  ]
})
export class PipesModule {
}