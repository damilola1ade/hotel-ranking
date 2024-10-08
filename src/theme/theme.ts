import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./globalStyles";
import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./components/button";

export default extendTheme({ breakpoints }, globalStyles, buttonStyles);
