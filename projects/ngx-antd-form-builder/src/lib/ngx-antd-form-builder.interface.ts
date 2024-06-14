export declare namespace NgxAntdFormBuilder {
  type rule = ({ required: boolean } | { pattern: string }) & { message: string }
  type rules = Array<rule>
  type option = Record<'value' | 'label', string>

  type CommonProperty = Record<'label' | 'key' | 'help', string>

  export type InputType = {
    type: 'input',
    options: Record<'type' | 'width' | 'defaultValue' | 'placeholder', string> &
    Record<'clearable' | 'disabled', boolean> &
    { maxLength: number | null }
    rules: Array<rule>
  } & CommonProperty

  export type TextareaType = {
    type: 'textarea',
    options: Record<'width' | 'defaultValue' | 'placeholder', string> &
    Record<'clearable' | 'disabled', boolean> &
    Record<'minRows' | 'maxRows', number> &
    { maxLength: number | null }
    rules: Array<rule>
  } & CommonProperty

  export type NumberType = {
    type: 'number',
    options: Record<'width' | 'placeholder', string> &
    Record<'disabled', boolean> &
    Record<'min' | 'max' | 'precision' | 'defaultValue', number | undefined> &
    { step: number }
    rules: Array<rule>
  } & CommonProperty

  export type SelectType = {
    type: 'select',
    options: Record<'width' | 'placeholder' | 'dynamicKey', string> & Partial<Record<'dynamicInjectFuncToken' | 'dynamicEvalFuncToken', string>> &
    Record<'multiple' | 'disabled' | 'clearable', boolean> &
    { options: Array<option>, defaultValue: undefined }
    rules: Array<rule>
  } & CommonProperty

  export type CheckboxType = {
    type: 'checkbox',
    options: Record<'dynamicKey', string> & Partial<Record<'dynamicInjectFuncToken' | 'dynamicEvalFuncToken', string>> &
    Record<'disabled', boolean> &
    { options: Array<option>, defaultValue: unknown[] }
    rules: Array<rule>
  } & CommonProperty

  export type RadioType = {
    type: 'radio',
    options: Record<'dynamicKey', string> & Partial<Record<'dynamicInjectFuncToken' | 'dynamicEvalFuncToken', string>> &
    Record<'disabled', boolean> &
    { options: Array<option>, defaultValue: undefined | string }
    rules: Array<rule>
  } & CommonProperty

  export type RateType = {
    type: 'rate',
    options:
    Record<| 'disabled' | 'allowHalf', boolean> &
    { defaultValue: undefined | number, max: number }
    rules: Array<rule>
  } & CommonProperty

  export type SliderType = {
    type: 'slider',
    options:
    Record<| 'disabled' | 'showInput', boolean> &
    Record<| 'min' | 'max' | 'step', number> &
    { width: string, defaultValue: undefined | number }
    rules: Array<rule>
  } & CommonProperty

  export type DateType = {
    type: 'date',
    options: Record<| 'width' | 'placeholder', string> &
    { disabled: boolean, mode: 'date'|'week'|'month'|'year', defaultValue: undefined | Date }
    rules: Array<rule>
  } & CommonProperty

  export type SwitchType =
    {
      type: 'switch',
      options: Record<'defaultValue' | 'disabled', boolean>,
      rules: Array<rule>
    }

    & CommonProperty;
  export type AlertType =
    {
      type: 'alert',
      options: Record<'description', string> & { type: "error" | "success" | "info" | "warning" }
      & Record<'showIcon' | 'banner' | 'closable', boolean>
    } &
    Record<'label' | 'key', string>

  export type TextType =
    {
      type: 'text',
      options: Record<'textAlign' | 'color' | 'fontFamily' | 'fontSize', string>
      & Record<'showRequiredMark', boolean>
    } &
    Record<'label' | 'key', string>

  export type AllComponentType = InputType | TextareaType | NumberType | SelectType | CheckboxType | RadioType
    | DateType | RateType | SliderType | SwitchType | AlertType | TextType;

  export type DividerLayout =
    { type: 'divider', options: { orientation: "left" | "right" | "center" } }
    & Omit<CommonProperty, 'help'>

  export type CardLayout =
    { type: 'card', list: Array<AllType> }
    & Omit<CommonProperty, 'help'>

  export type TabsLayout =
    {
      type: 'tabs',
      options: { animated: boolean, tabBarGutter: number | null } &
      Record<'tabPosition' | 'type' | 'size', string>,
      columns: Array<option & { list: Array<AllType> }>
    }
    & Omit<CommonProperty, 'help'>

  export type GridLayout =
    {
      type: 'grid',
      options: { gutter: number | null },
      columns: Array<{ span: number, list: Array<AllType> }>
    }
    & Omit<CommonProperty, 'help'>

  export type CollapseLayout =
    {
      type: 'collapse',
      options: Record<'bordered' | 'expandIconPosition', string>
      & { accordion: unknown, ghost: boolean },
      columns: Array<option & { list: Array<AllType> }>
    }
    & Omit<CommonProperty, 'help'>

  export type AllLayout = DividerLayout | CardLayout |
    TabsLayout | GridLayout | CollapseLayout

  export type AllType = AllComponentType | AllLayout

  export type Config = {
    list: Array<AllType>,
    config: Record<'labelWidth', number> &
      Record<'labelCol'| 'wrapperCol', Record<'xs'|'sm'|'md'|'lg'|'xl'|'xxl', number>> & {
        labelLayout: 'flex' | 'Grid',
        layout: 'horizontal' | 'vertical' | 'inline'
    }
  }
}