let __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (let s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (let p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

    return __assign.apply(this, arguments);
  };

let __rest =
  (this && this.__rest) ||
  function (s, e) {
    let t = {};

    for (let p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];

    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (let i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

import { createElement } from "react";
import { IconContext, DefaultContext } from "./iconContext";

function Tree2Element(tree) {
  return (
    tree &&
    tree.map(function (node, i) {
      return createElement(
        node.tag,
        __assign(
          {
            key: i,
          },
          node.attr
        ),
        Tree2Element(node.child)
      );
    })
  );
}

export function IconBase(props) {
  let elem = function (conf) {
    let attr = props.attr,
      size = props.size,
      title = props.title,
      svgProps = __rest(props, ["attr", "size", "title"]);

    let computedSize = size || conf.size || "1em";
    let className;
    if (conf.className) className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return createElement(
      "svg",
      __assign(
        {
          stroke: "currentColor",
          fill: "currentColor",
          strokeWidth: "0",
        },
        conf.attr,
        attr,
        svgProps,
        {
          className: className,
          style: __assign(
            __assign(
              {
                color: props.color || conf.color,
              },
              conf.style
            ),
            props.style
          ),
          height: computedSize,
          width: computedSize,
          xmlns: "http://www.w3.org/2000/svg",
        }
      ),
      title && createElement("title", null, title),
      props.children
    );
  };

  return IconContext !== undefined
    ? createElement(IconContext.Consumer, null, function (conf) {
        return elem(conf);
      })
    : elem(DefaultContext);
}

// export function GenIcon({ data, ...props }) {
//   return React.createElement(
//     IconBase,
//     __assign(
//       {
//         attr: __assign({}, data.attr),
//       },
//       props
//     ),
//     Tree2Element(data.child)
//   );
// }
export function GenIcon(data) {
  return function Generate(props) {
    return createElement(
      IconBase,
      __assign(
        {
          attr: __assign({}, data.attr),
        },
        props
      ),
      Tree2Element(data.child)
    );
  };
}

// export const IconKhoa = (props) => {
//   return (
//     <GenIcon
//       data={{
//         tag: "svg",
//         attr: { viewBox: "0 0 1024 1024" },
//         child: [
//           {
//             tag: "path",
//             attr: {
//               d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zM327.3 702.4c-2 .9-4.4 0-5.3-2.1-.4-1-.4-2.2 0-3.2l98.7-225.5 132.1 132.1-225.5 98.7zm375.1-375.1l-98.7 225.5-132.1-132.1L697.1 322c2-.9 4.4 0 5.3 2.1.4 1 .4 2.1 0 3.2z",
//             },
//           },
//         ],
//       }}
//       {...props}
//     />
//   );
// };
