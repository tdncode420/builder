import { qs, ce, qa } from "./utils.js";

export function updateTree() {
    const tree_output = qs('#tree_view');
    const doc = document;
    let maxDeep = 1;
    let headersLevels = {};
    const headersOrder = [`H1`, `H2`, `H3`, `H4`, `H5`, `H6`];
    let headersList = [];
    let isWHolePage = false;
    let bodyClass = ``;
    let htmlClass = ``;

    const wholePageMarkers = [`META`, `TITLE`, `LINK`];
    const skippedTags = [`SCRIPT`, `META`, `TITLE`, `LINK`, `NOSCRIPT`, `BR`];

    const highlightColorNum = 0;

    const styleElem = doc.createElement(`style`);
    doc.head.appendChild(styleElem);
    function getTagClass(code, tagName = `body`) {
        const regexp = new RegExp(`<${tagName}[^>]*class="(.[^"]*)"`);
        const result = code.match(regexp);
        if (result) {
            return result[1].split(` `);
        }
        return ``;
    };
    function setHeadersDefs() {
        headersLevels = {
            H1: false,
            H2: false,
            H3: false,
            H4: false,
            H5: false,
            H6: false
        };
        headersList = [];
    };
    function makeList(elem, level) {
        const item = ce(`li`);
        item.classList.add(`gnr-level__item`);

        let tagName = elem.tagName;
        let id = elem.dataset.id;
        item.dataset.ele = id;
        item.style.cursor = "pointer";
        item.addEventListener('click', function (e) {
            e.stopPropagation();
            /* ........ */
        }.bind(item));
        const className = elem.classList.value;
        elem.classList.forEach = [].forEach;
        elem.children.forEach = [].forEach;

        if (!elem.customDataSet) {
            elem.customDataSet = {
                prefixes: {},
                level: level
            };
        }

        if (htmlClass) {
            if (level === 1) {
                tagName = `HTML`;
            } else if (level === 2) {
                tagName = `BODY`;
            }
        } else if (level === 1) {
            tagName = `BODY`;
        }

        const liContent = ce(`div`);
        liContent.classList.add(`gnr-level__elem`, `gnr-elem`);

        const tagSpan = ce(`span`);
        tagSpan.classList.add(`gnr-elem__tag`);
        tagSpan.innerHTML = tagName;


        // Check headers levels
        if (headersLevels[tagName] !== undefined) {
            headersLevels[tagName] = true;
            headersList.push({
                tagName: tagName,
                text: elem.innerText
            });
        }

        liContent.appendChild(tagSpan);

        addClassesAsPrefixes(elem);

        if (className) {
            checkBemForElem(elem);

            const classSpan = ce(`span`);
            classSpan.classList.add(`gnr-elem__class`, `gnr-class`);

            elem.classList.forEach(function (classItem, i) {
                const classItemSpan = ce(`span`);
                classItemSpan.classList.add(`gnr-class__item`);
                classItemSpan.innerHTML += classItem;

                // Check valid Bem naiming
                if (elem.classList.validBem &&
                    elem.classList.validBem[classItem] === false) {
                    classItemSpan.classList.add(`gnr-highlight-bem`);
                }

                classSpan.appendChild(classItemSpan);

                if (i < elem.classList.length - 1) {
                    classSpan.innerHTML += ` `;
                }
            });

            const classDotSpan = ce(`span`);
            classDotSpan.classList.add(`gnr-class__dot`);
            classDotSpan.innerHTML = `.`;
            liContent.appendChild(classDotSpan);

            liContent.appendChild(classSpan);
        }

        item.appendChild(liContent);

        if (elem.children) {
            const childrenList = ce(`ul`);
            childrenList.classList.add(`gnr-level`, `gnr-level--${level}`);

            level++;

            elem.children.forEach(function (child) {
                checkIsWholePage(child);

                if (!checkIsSkippedTag(child)) {
                    const newElem = makeList(child, level);

                    if (newElem) {
                        childrenList.appendChild(newElem);
                    }
                }
            });

            if (childrenList.children.length > 0) {
                if (level > maxDeep) {
                    maxDeep = level;
                }

                item.appendChild(childrenList);
            }
        }

        return item;
    };

    function checkHeadersLevels() {
        let isWrongOrder = false;
        const realOrder = ce(`dl`);
        realOrder.classList.add(`headers__list`);
        let maxUsedHeaders = 0;
        let tempHeadersStack = 0;
        let longestHeadersStack = 0;

        const realOrderDt = ce(`dt`);
        realOrderDt.classList.add(`headers__title`);
        realOrder.appendChild(realOrderDt);

        for (const key in headersLevels) {
            if (headersLevels[key]) {
                maxUsedHeaders++;
                tempHeadersStack++;
            } else {
                if (longestHeadersStack < tempHeadersStack) {
                    longestHeadersStack = tempHeadersStack;
                }
                tempHeadersStack = 0;
            }
        }

        if (maxUsedHeaders > longestHeadersStack) {
            isWrongOrder = true;
        } else if (isWHolePage && !headersLevels.H1) {
            isWrongOrder = true;
        }

        if (isWrongOrder) {
            headersOrder.forEach(function (headerItem) {
                const headerItemSpan = ce(`dd`);
                headerItemSpan.classList.add(`headers__item`);
                headerItemSpan.innerHTML = headerItem;

                if (headersLevels[headerItem]) {
                    headerItemSpan.classList.add(`headers__item--found`);
                } else {
                    headerItemSpan.classList.add(`headers__item--notfound`);
                }

                realOrder.appendChild(headerItemSpan);
            });
        }

    };

    function printHeadersTree() {
        let out = ``;
        if (headersList.length === 0) {
            return;
        }
        for (let i = 0; i < headersList.length; i++) {
            const tag = headersList[i].tagName;
            const text = headersList[i].text;
            out += `<${tag}><span>${tag}</span> ${text}</${tag}>`;
        }
    };

    function createTreeFromHTML(code) {
        const codeOutput = document.createElement(`div`);
        let codeOutputTarget = codeOutput;
        code = code.replace(/>\s*</g, `>\n<`);
        bodyClass = getTagClass(code);
        htmlClass = getTagClass(code, `html`);
        if (htmlClass) {
            codeOutputTarget = document.createElement(`div`);
            codeOutput.append(codeOutputTarget);
            htmlClass.forEach(function (item) {
                item && codeOutput.classList.add(item);
            });
        }
        if (bodyClass) {
            bodyClass.forEach(function (item) {
                item && codeOutputTarget.classList.add(item);
            });
        }
        codeOutputTarget.innerHTML = code;
        const items = makeList(codeOutput, 1);
        if (tree_output.childElementCount > 0) {
            tree_output.removeChild(tree_output.firstElementChild);
        }
        const list = ce(`ul`);
        list.classList.add(`gnr-level`, `gnr-level--0`);
        list.appendChild(items);
        tree_output.appendChild(list);
        checkHeadersLevels();
        printHeadersTree();
    };

    function addClassesActions() {
        const colors = [`aqua`, `lime`, `yellow`, `fuchsia`];
        const classItemSpanList = qa(`.gnr-class__item`);
        classItemSpanList.forEach(function (classItemSpan) {
            classItemSpan.onclick = function () {
                let color = colors[highlightColorNum];
                if (this.dataset.color && this.dataset.color !== ``) {
                    color = ``;
                }
                this.dataset.color = color;
            };
        });
    };

    function checkBemForElem(elem) {
        // elem.className not appropriate for svg
        const className = elem.classList.value;
        const hasDashesDelimiter = className.indexOf(`--`) >= 0;
        const hasUnderlinesDelimiter = className.indexOf(`__`) >= 0;
        const matchSingleUnderline = className.match(/[^_]_[^_]/);

        if (!hasDashesDelimiter &&
            !hasUnderlinesDelimiter &&
            !matchSingleUnderline) {
            return;
        }

        elem.classList.forEach = [].forEach;
        elem.classList.validBem = {};

        elem.classList.forEach(function (classItem) {
            const hasDashesDelimiter = classItem.indexOf(`--`) >= 0;
            const hasUnderlinesDelimiter = classItem.indexOf(`__`) >= 0;
            const matchSingleUnderline = classItem.match(/[^_]_[^_]/);

            if (!hasUnderlinesDelimiter &&
                !hasDashesDelimiter &&
                !matchSingleUnderline) {
                return;
            }

            // Check first part of class with __ (block name)
            if (hasUnderlinesDelimiter) {
                let prefixCorrect = false;
                const prefix = classItem.split(`__`)[0];
                // Example: wrapper wrapper__container
                const hasPrefixOnSameElement = elem.classList.contains(prefix);
                const isClassExistsOnParents = elem.customDataSet.prefixes[prefix];

                if (isClassExistsOnParents && !hasPrefixOnSameElement) {
                    prefixCorrect = true;
                }

                elem.classList.validBem[classItem] = prefixCorrect;
            }

            // Check first part of class with -- or _ (modificators)
            let modifPrefix = ``;
            let modifPrefixCorrect = false;

            if (hasDashesDelimiter) {
                modifPrefix = classItem.split(`--`)[0];
            } else if (matchSingleUnderline) {
                modifPrefix = classItem.slice(0, matchSingleUnderline.index + 1);
            }

            if (modifPrefix) {
                if (elem.classList.contains(modifPrefix)) {
                    modifPrefixCorrect = true;
                }

                if (!modifPrefixCorrect) {
                    elem.classList.validBem[classItem] = modifPrefixCorrect;
                }
            }
        });
    };

    function addClassesAsPrefixes(elem) {
        const classList = elem.classList;
        classList.forEach = [].forEach;

        copyPrefixes(elem);

        classList.forEach(function (classItem) {
            // Copy only block names
            const hasDashesDelimiter = classItem.indexOf(`--`) >= 0;
            const hasUnderlinesDelimiter = classItem.indexOf(`__`) >= 0;
            const matchSingleUnderline = classItem.match(/[^_]_[^_]/);

            if (!hasUnderlinesDelimiter &&
                !hasDashesDelimiter &&
                !matchSingleUnderline
            ) {
                elem.customDataSet.prefixes[classItem] = classItem;
            }
        });
    };

    function copyPrefixes(elem) {
        const parent = elem.parentNode;

        if (!parent) {
            return;
        }

        for (const prefix in parent.customDataSet.prefixes) {
            elem.customDataSet.prefixes[prefix] = prefix;
        }
    };

    function checkIsSkippedTag(elem) {
        return skippedTags.indexOf(elem.tagName) >= 0;
    };

    function checkIsWholePage(elem) {
        if (wholePageMarkers.indexOf(elem.tagName) >= 0) {
            isWHolePage = true;
        }
    };

    setHeadersDefs();
    isWHolePage = false;
    maxDeep = 1;
    createTreeFromHTML(String(qs('#active_build').innerHTML));
    addClassesActions();
};