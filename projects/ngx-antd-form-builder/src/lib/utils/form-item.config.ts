import { NgxAntdFormBuilder } from "../ngx-antd-form-builder.interface";

const inputComponent: NgxAntdFormBuilder.InputType = {
  type: "input",
  label: "Input", 
  options: {
    type: "text",
    width: "100%",
    defaultValue: "",
    placeholder: "", 
    clearable: false,
    maxLength: null,
    disabled: false 
  },
  key: "",
  help: "",
  rules: [
    {
      required: false, 
      message: "Field Required"
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
key: "",
help: "",
rules: [
  {
    required: false,
    message: "Field Required"
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
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Field Required"
    }
  ]
};

const selectComponent: NgxAntdFormBuilder.SelectType =   {
  type: "select", 
  label: "Select", 
  options: {
    width: "100%", 
    defaultValue: undefined, 
    multiple: false, 
    disabled: false, 
    clearable: false,
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
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Field Required"
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
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Field Required"
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
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Field Required"
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
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Field Required"
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
    key: "",
    help: "",
    rules: [
      {
        required: false,
        message: "Field Required"
      }
    ]
};

const dateComponent: NgxAntdFormBuilder.DateType = {
  type: "date",
  label: "Date",
  options: {
    width: '100%',
    placeholder: 'Select Date',
    disabled: false,
    defaultValue: undefined,
    mode: 'date',
  },
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Field Required"
    }
  ]
}

const switchComponent: NgxAntdFormBuilder.SwitchType =   {
  type: "switch",
  label: "Switch",
  options: {
    defaultValue: false, 
    disabled: false 
  },
  key: "",
  help: "",
  rules: [
    {
      required: false,
      message: "Field Required"
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
    showRequiredMark: false,
    color: "rgb(0, 0, 0)",
    fontFamily: "SimHei",
    fontSize: "16pt"
  },
  key: ""
};

export const ComponentList: Array<NgxAntdFormBuilder.AllComponentType> = [
  inputComponent, textareaComponent, numberComponent,selectComponent,checkBoxComponent,
  radioComponent,rateComponent, sliderComponent, alertComponent, textComponent, dateComponent
]


const dividerLayout: NgxAntdFormBuilder.DividerLayout =  {
  type: "divider",
  label: "Divider",
  options: {
    orientation: "left"
  },
  key: "",
};

const cardLayout: NgxAntdFormBuilder.CardLayout = 
{
  type: "card",
  label: "Card",
  list: [],
  key: "",
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
  "date",
  "switch",
  "alert",
  "text",
  "divider",
  "card",
  "tabs",
  "grid",
  "collapse",
]