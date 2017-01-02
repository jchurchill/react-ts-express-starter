import * as React from "react";
import { assert } from "chai";
import * as Enzyme from "enzyme";

import * as Hello from "components/Hello";

suite("Hello", () => {

    function render(attr: {
        who: string;
    }) {
        return Enzyme.shallow(<Hello.Component
            who={attr.who}
        />);
    }

    test("renders message", () => {
        const root = render({ who: "friend" });
        const text = root.find(".Hello-message").text();
        assert.equal(text, "Hello, friend!");
    });

    test("renders image", () => {
        const root = render({ who: "world" });
        const image = root.find(".Hello-picture");
        assert.isNotTrue(image.isEmpty(), "Expect image to exist");
    });
});