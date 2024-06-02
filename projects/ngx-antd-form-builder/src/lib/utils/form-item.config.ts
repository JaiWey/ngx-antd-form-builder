import { NgxAntdFormBuilder } from "../ngx-antd-form-builder.interface";

const inputComponent: NgxAntdFormBuilder.InputType = {
  type: "input",
  label: "Input", // 标题文字
  options: {
    type: "text",
    width: "100%",
    defaultValue: "",
    placeholder: "", 
    clearable: false,
    maxLength: null,
    disabled: false 
  },
  model: "", // 数据字段
  key: "",
  help: "",
  rules: [
    {
      required: false, 
      message: "Required"
    }
  ]
}

const textareaComponent: NgxAntdFormBuilder.TextareaType = { 
  type: "textarea",
label: "Textarea", 
options: {
  width: "100%",
  minRows: 4,
  maxRows: 6,
  maxLength: null,
  defaultValue: "",
  clearable: false,
  disabled: false,
  placeholder: ""
},
model: "", // 数据字段
key: "",
help: "",
rules: [
  {
    required: false,
    message: "Required"
  }
]}

const numberComponent: NgxAntdFormBuilder.NumberType =   {
  type: "number",
  label: "Number",
  options: {
    width: "100%",
    defaultValue: 0, 
    min: undefined, 
    max: undefined, 
    precision: undefined,
    step: 1, 
    disabled: false, 
    placeholder: ""
  },
  model: "", 
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Required"
    }
  ]
};

const selectComponent: NgxAntdFormBuilder.SelectType =   {
  type: "select", 
  label: "Select", 
  options: {
    width: "100%", // 宽度
    defaultValue: undefined, // 下拉选框请使用undefined为默认值
    multiple: false, // 是否允许多选
    disabled: false, // 是否禁用
    clearable: false, // 是否显示清除按钮
    placeholder: "", 
    dynamicKey: "",
    options: [
      {
        value: "1",
        label: "Option 1"
      },
      {
        value: "2",
        label: "Option 2"
      }
    ],
  },
  model: "",
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Required"
    }
  ]
};

const checkBoxComponent: NgxAntdFormBuilder.CheckboxType =  {
  type: "checkbox",
  label: "Checkbox",
  options: {
    disabled: false, 
    defaultValue: [],
    dynamicKey: "",
    options: [
      {
        value: "1",
        label: "Option 1"
      },
      {
        value: "2",
        label: "Option 2"
      },
    ]
  },
  model: "",
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Required"
    }
  ]
};

const radioComponent: NgxAntdFormBuilder.RadioType = {
  type: "radio",
  label: "Radio ", 
  options: {
    disabled: false, 
    defaultValue: "", 
    dynamicKey: "",
    options: [
      {
        value: "1",
        label: "Option 1"
      },
      {
        value: "2",
        label: "Option 2"
      },
    ]
  },
  model: "",
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Required"
    }
  ]
};

const rateComponent: NgxAntdFormBuilder.RateType =   {
  type: "rate", 
  label: "Rate", 
  options: {
    defaultValue: 0,
    max: 5, 
    disabled: false, 
    allowHalf: false
  },
  model: "",
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Required"
    }
  ]
};

const sliderComponent: NgxAntdFormBuilder.SliderType = {
  type: "slider",
    label: "Slider", 
    options: {
      width: "100%",
      defaultValue: 0,
      disabled: false,
      min: 0, 
      max: 100, 
      step: 1, 
      showInput: false
    },
    model: "",
    key: "",
    help: "",
    rules: [
      {
        required: false,
        message: "必填项"
      }
    ]
};

const switchComponent: NgxAntdFormBuilder.SwitchType =   {
  type: "switch",
  label: "Switch",
  options: {
    defaultValue: false, 
    disabled: false 
  },
  model: "",
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "必填项"
    }
  ]
};

const alertComponent: NgxAntdFormBuilder.AlertType = {
  type: "alert",
  label: "Alert",
  options: {
    type: "success",
    description: "",
    showIcon: false,
    banner: false,
    closable: false
  },
  key: ""
};

const textComponent: NgxAntdFormBuilder.TextType =   {
  type: "text",
  label: "Text",
  options: {
    textAlign: "left",
    hidden: false, // 是否隐藏，false显示，true隐藏
    showRequiredMark: false,
    color: "rgb(0, 0, 0)",
    fontFamily: "SimHei",
    fontSize: "16pt"
  },
  key: ""
};

export const ComponentList: Array<NgxAntdFormBuilder.AllComponentType> = [
  inputComponent, textareaComponent, numberComponent,selectComponent,checkBoxComponent,
  radioComponent,rateComponent, sliderComponent, alertComponent, textComponent
]


const dividerLayout: NgxAntdFormBuilder.DividerLayout =  {
  type: "divider",
  label: "Divider",
  options: {
    orientation: "left"
  },
  key: "",
  model: ""
};

const cardLayout: NgxAntdFormBuilder.CardLayout = 
{
  type: "card",
  label: "Card",
  list: [],
  key: "",
  model: ""
}

const tabsLayout: NgxAntdFormBuilder.TabsLayout =
{
  type: "tabs",
  label: "Tabs",
  options: {
    tabBarGutter: null,
    type: "line",
    tabPosition: "top",
    size: "default",
    animated: true
  },
  columns: [
    {
      value: "1",
      label: "Tab 1",
      list: []
    },
    {
      value: "2",
      label: "Tab 2",
      list: []
    }
  ],
  key: "",
  model: ""
};

const gridLayout: NgxAntdFormBuilder.GridLayout = {
  type: "grid",
  label: "Grid",
  columns: [
    {
      span: 12,
      list: []
    },
    {
      span: 12,
      list: []
    }
  ],
  options: {
    gutter: 0
  },
  key: "",
  model: ""
};

const collapseLayout: NgxAntdFormBuilder.CollapseLayout ={
  type: "collapse",
  label: "Collapse",
  options: {
    accordion: null,
    bordered: "line",
    ghost: false,
    expandIconPosition: "default",
    //animated: true
  },
  columns: [
    {
      value: "1",
      label: "Panel 1",
      list: []
    },
    {
      value: "2",
      label: "Panel 2",
      list: []
    }
  ],
  key: "",
  model: ""
};

export const LayoutList: Array<NgxAntdFormBuilder.AllLayout> = [
 dividerLayout, cardLayout, tabsLayout, gridLayout, collapseLayout
];

export const DefaultFields = [
  "input",
  "textarea",
  "number",
  "select",
  "checkbox",
  "radio",
  "rate",
  "slider",
  "switch",
  "alert",
  "text",
  "divider",
  "card",
  "tabs",
  "grid",
  "collapse",
]