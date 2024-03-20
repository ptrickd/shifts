import*as e from"react";
/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */function getValidReactChildren(t){return e.Children.toArray(t).filter((t=>e.isValidElement(t)))}export{getValidReactChildren as default};

