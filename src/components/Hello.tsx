// Declare the styles for this component as a dependency so that it
// gets loaded into the css bundle when this component is used
require("components/Hello.less");

const src_helloworld = require("components/helloworld.jpg") as string;

import * as React from "react";

// Declare the shape of this component"s props
export interface Props {
    who: string;
}

// Declare the React component class.
// We only call it "Component" because we expect the import to look like 
//      import * as Hello from "components/Hello"
export class Component extends React.Component<Props, {}> {
    static displayName = "Hello";

    render() {
        return <div className="Hello">
            <h1 className="Hello-message">Hello, {this.props.who}!</h1>
            <img className="Hello-picture" src={src_helloworld} />
        </div>;
    }
}
