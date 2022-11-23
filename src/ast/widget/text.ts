const CONTAINER = `
    Container(
       child: $child
    )
`;

const ROW = `
        Row(
            children:[
                $children
            ]
        )
`;

const TEXT = `
            Text("text")
`;

const ICONS = `
            Icon("text")
`;

const widgets:any = {
    "Container":CONTAINER,
    "Row":ROW,
    "Text":TEXT,
    "Icon":ICONS,
}

export default widgets;