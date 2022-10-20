# OVERVIEW

## Entry Point

Location: `./`
File: `index.js`

## Objects

Location: `./objs/`
Files: `_ActiveBox.js`, `_Build.js`, `_BuildCache.js`, `_BuildDOM.js`, `BuildState`, `_Draggable.js`, `_Element.js`, `_HighlightBox.js`, `Project.js`

## BUILD

A build contains the following objects:

- cache
    Holds any collections/arrays
- DOM
    Inits objects: `ActiveBox`, `HighlightBox`, `Draggables`
    Each object instance is passed a reference to the `Build` instance that invoked them
- state
    Holds any state/changing variables/values

Entry Point:

```md
Build
    |
    State
    |
    Cache
    |
    ActiveBox
    |
    HighlightBox
```

## STYLES

data-key: the CSS style property
data-value: value{str} || 'self' (grab value from element's value property)
data-unit: (if present) a DOM selector of the element who's value to grab for the unit value
data-for: a dome selector pointing to the element this unit input represents


