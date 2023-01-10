# React Native to Flutter Widgets

![alt text](https://github.com/GeekyAnts/react-native-to-flutter/blob/main/banner/Cover.png?raw=true)

The goal of `React Native to Flutter Widgets` is to convert an any React Native Component to Flutter Widget. This could really help the newbies of flutter who has a web knowledge to understand the css to flutter equivalent code snippet.


This tool will take the React Native styling props on the left hand side editor and convert that to the flutter widget on the right hand side.The entire checklist of which props are being already supported is [here](https://github.com/GeekyAnts/nativebase-theme-to-flutter/blob/main/README_API_CHECKLIST.md) 

### Working Example
<img src="https://github.com/GeekyAnts/react-native-to-flutter/blob/dev/banner/example.gif?raw=true" height="400" >

### Folder Structure

```
.
├── LICENSE
├── README.md
├── README_API_CHECKLIST.md
├── package-lock.json
├── package.json
├── src
│   ├── addProperty.tsx
│   ├── buildDartASTfromAST.tsx
│   ├── clearProperties.tsx
│   ├── config
│   │   ├── flutter-widgets.ts
│   │   ├── index.ts
│   │   ├── layout-props.ts
│   │   └── text-props.ts
│   ├── index.tsx
│   └── utils
│       ├── arr.js
│       ├── camel.ts
│       ├── converter.tsx
│       ├── getAlignmentAxis.tsx
│       ├── getBorder.tsx
│       ├── getBorderRadius.tsx
│       ├── getExpanded.tsx
│       ├── getFlex.tsx
│       ├── getFlexDirection.tsx
│       ├── getFontFamily.tsx
│       ├── getFontStyle.tsx
│       ├── getFontWeight.tsx
│       ├── getMargin.tsx
│       ├── getPadding.tsx
│       ├── getPositioned.tsx
│       ├── getTextAlign.tsx
│       ├── num.ts
│       ├── pos.js
│       ├── pushPropToWidget.tsx
│       ├── str.js
│       └── unit.ts
├── test
│   └── blah.test.tsx
├── tsconfig.json
└── yarn.lock

```


