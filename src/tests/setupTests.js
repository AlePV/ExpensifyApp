// Allows to configure the environment we are running in

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({
    adapter: new Adapter()
});

import DotEnv from "dotenv";
DotEnv.config({path: ".env.test"});