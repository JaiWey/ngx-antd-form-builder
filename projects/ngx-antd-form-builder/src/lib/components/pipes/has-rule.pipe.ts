import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ standalone: true, name: 'hasRule' })
export class HasRulePipe implements PipeTransform {
  transform(rules: any[]) {
    return rules.filter(rule => rule.pattern || rule.required).length > 0;
  }
}