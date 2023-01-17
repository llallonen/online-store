export const createElement = <T extends HTMLElement>(node: string, ...classNames: string[]): T => {
    const element = document.createElement(node) as T;
    if (classNames.length > 0) {
        element.classList.add(...classNames);
    }
    return element;
};
