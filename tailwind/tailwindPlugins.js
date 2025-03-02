const plugin = require("tailwindcss/plugin");
const map = require("lodash.map");
const fromPairs = require("lodash.frompairs");
const selectorParser = require("postcss-selector-parser");
const flattenColorPalette =
  require("tailwindcss/lib/util/flattenColorPalette").default;

const components = require("./tailwindComponents");

module.exports = [
  // support for the disabled pseudo-class variant
  plugin(({ addVariant, e }) => {
    addVariant("disabled", ({ modifySelectors, separator }) => {
      modifySelectors(
        ({ className }) => `.${e(`disabled${separator}${className}`)}:disabled`
      );
    });
  }),
  // suport for pseudo-elements
  plugin(({ addVariant, e }) => {
    const escape = e || ((x) => x);
    const pseudoElements = [
      "after",
      "backdrop ",
      "before",
      "cue",
      "first-letter",
      "first-line",
      "grammar-error ",
      "marker ",
      "placeholder ",
      "selection",
    ];
    pseudoElements.forEach((pseudo) => {
      addVariant(pseudo, ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.${escape(`${pseudo}${separator}${className}`)}::${pseudo}`
        );
      });
    });
  }),
  // adding missing groups
  plugin(({ addVariant, config }) => {
    const prefixClass = function (className) {
      const prefix = config("prefix");
      const getPrefix = typeof prefix === "function" ? prefix : () => prefix;
      return `${getPrefix(`.${className}`)}${className}`;
    };
    const selectorsArr = [
      "group-focus-within",
      "group-focus-visible",
      "group-active",
      "group-visited",
      "group-disabled",
      "group-checked",
    ];
    selectorsArr.forEach((selectorElem) => {
      addVariant(selectorElem, ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) =>
          selectorParser((selectors) => {
            selectors.walkClasses((classNode) => {
              // eslint-disable-next-line no-param-reassign
              classNode.value = `group-${selectorElem.slice(
                selectorElem.indexOf("-") + 1
              )}${separator}${classNode.value}`;
              classNode.parent.insertBefore(
                classNode,
                selectorParser().astSync(
                  `.${prefixClass("group")}:${selectorElem.slice(
                    selectorElem.indexOf("-") + 1
                  )} `
                )
              );
            });
          }).processSync(selector)
        );
      });
    });
  }),
  // custom selector concatenation
  plugin(({ addComponents }) => {
    addComponents(components);
  }),
  plugin(({ addUtilities }) => {
    addUtilities(
      {
        ".empty-content": {
          content: "''",
        },
      },
      ["before", "after"] // lo uso como after:empty-content
    );
  }),
  plugin(({ addUtilities }) => {
    addUtilities(
      {
        ".border-top-solid-black": {
          "border-top": "5px solid black",
        },
        ".thead-tr-md": {
          "font-size": "1.3vw",
        },
        ".thead-tr-lg": {
          "font-size": "1.45vw",
        },
      },
      ["responsive", "before", "after"]
    );
  }),
  plugin(
    ({ theme, variants, e, addUtilities }) => {
      const aspectRatioUtilities = fromPairs(
        map(theme("aspectRatio"), (value, modifier) => {
          const aspectRatio = Array.isArray(value)
            ? value[0] / value[1]
            : value;
          return [
            `.${e(`aspect-ratio-${modifier}`)}`,
            {
              paddingBottom:
                aspectRatio === 0 ? "0" : `${(1 / aspectRatio) * 100}%`,
            },
          ];
        })
      );

      addUtilities(aspectRatioUtilities, variants("aspectRatio"));
    },
    {
      theme: {
        aspectRatio: {},
      },
      variants: {
        aspectRatio: ["responsive"],
      },
    }
  ),
  plugin(({ addUtilities, _e, theme, variants }) => {
    const colors = flattenColorPalette(theme("borderColor"));
    delete colors.default;

    const colorMap = Object.keys(colors).map((color) => ({
      [`.border-t-${color}`]: { borderTopColor: colors[color] },
      [`.border-r-${color}`]: { borderRightColor: colors[color] },
      [`.border-b-${color}`]: { borderBottomColor: colors[color] },
      [`.border-l-${color}`]: { borderLeftColor: colors[color] },
    }));
    const utilities = Object.assign({}, ...colorMap);

    addUtilities(utilities, variants("borderColor"));
  }),
  plugin(({ addBase, config }) => {
    addBase({
      h1: { fontSize: config("theme.fontSize.2xl") },
      h2: { fontSize: config("theme.fontSize.xl") },
      h3: { fontSize: config("theme.fontSize.lg") },
    });
  }),
];
