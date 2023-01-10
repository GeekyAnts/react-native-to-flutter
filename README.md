# React Native to Flutter Widgets

![alt text](https://github.com/GeekyAnts/react-native-to-flutter/blob/main/banner/Cover.png?raw=true)

The goal of `React Native to Flutter Widgets` is to convert any React Native Component to Flutter Widget. This could really help the newbies of flutter who has web knowledge to understand the CSS to flutter equivalent code snippet.


This tool will take the React Native styling props on the left hand side editor and convert that to the flutter widget on the right hand side.


### List of Working React Native Props

The entire checklist of which props are being already supported is [here](https://github.com/GeekyAnts/nativebase-theme-to-flutter/blob/main/README_API_CHECKLIST.md) 

### Working Example

<img src="https://github.com/GeekyAnts/react-native-to-flutter/blob/main/banner/example.gif?raw=true" height="400" >

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


### Run this project

Clone the repo, run

``` 
git clone https://github.com/GeekyAnts/react-native-to-flutter.git 

```

### Dependencies 

```
@babel/parser
@babel/preset-react

```

Install Dependencies
```
yarn install
```

Run the below command in root folder of the project

```
yarn start
```
Now to run the example, open new terminal and change your pwd to example folder

```
cd example
```
and then run
```
yarn start
````
Now head to ```http://localhost:1234/``` app should be working fine.

### Know Issues
❌ Deep Nesting of Tags might not work as expected.
### How to Contribute

Thank you for your interest in contributing to React Native to Flutter Widgets ! We are lucky to have you 🙂 Head over to [Contribution](https://github.com/GeekyAnts/react-native-to-flutter/blob/main/CONTRIBUTION.md) Guidelines and learn how you can be a part of a wonderful, growing community.

### Contributors 

<a href="https://github.com/GeekyAnts/react-native-to-flutter/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=GeekyAnts/react-native-to-flutter" />
</a>

### License

Licensed under the [MIT](https://github.com/GeekyAnts/react-native-to-flutter/blob/main/LICENSE) License, Copyright © 2023 GeekyAnts. See LICENSE for more information.


Made with ❤️ by <a href="https://geekyants.com/" ><img src="https://s3.ap-southeast-1.amazonaws.com/cdn.elitmus.com/sy0zfezmfdovlb4vaz6siv1l7g30" height="17"/></a>
