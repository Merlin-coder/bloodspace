/******/ (function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
            /******/ return installedModules[moduleId].exports;
            /******/
        } // Create a new module (and put it into the cache)
        /******/ /******/ var module = (installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {}
            /******/
        }); // Execute the module function
        /******/
        /******/ /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); // Flag the module as loaded
        /******/
        /******/ /******/ module.l = true; // Return the exports of the module
        /******/
        /******/ /******/ return module.exports;
        /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/
        }
        /******/
    }; // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function (exports) {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/
        }
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/
    }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
    /******/
    /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function (value, mode) {
        /******/ if (mode & 1) value = __webpack_require__(value);
        /******/ if (mode & 8) return value;
        /******/ if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
        /******/ var ns = Object.create(null);
        /******/ __webpack_require__.r(ns);
        /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        /******/ if (mode & 2 && typeof value != 'string')
            for (var key in value)
                __webpack_require__.d(
                    ns,
                    key,
                    function (key) {
                        return value[key];
                    }.bind(null, key)
                );
        /******/ return ns;
        /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function (module) {
        /******/ var getter =
            module && module.__esModule
                ? /******/ function getDefault() {
                      return module['default'];
                  }
                : /******/ function getModuleExports() {
                      return module;
                  };
        /******/ __webpack_require__.d(getter, 'a', getter);
        /******/ return getter;
        /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = './server/index.js'));
    /******/
})(
    /************************************************************************/
    /******/ {
        /***/ './server/index.js':
            /*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
            /*! no exports provided */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ "express");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _src_App__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/App */ "./src/App.js");\n\n\n\n\n\n\nvar PORT = process.env.PORT || 3006;\nvar app = express__WEBPACK_IMPORTED_MODULE_3___default()();\napp.get(\'/\', function (req, res) {\n  var app = react_dom_server__WEBPACK_IMPORTED_MODULE_4___default.a.renderToString( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_src_App__WEBPACK_IMPORTED_MODULE_5__["default"], null));\n  var indexFile = path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(\'./build/index.html\');\n  fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFile(indexFile, \'utf8\', function (err, data) {\n    if (err) {\n      console.error(\'Something went wrong:\', err);\n      return res.status(500).send(\'Oops, better luck next time!\');\n    }\n\n    return res.send(data.replace(\'<div id="root"></div>\', "<div id=\\"root\\">".concat(app, "</div>")));\n  });\n});\napp.use(express__WEBPACK_IMPORTED_MODULE_3___default.a.static(\'./build\'));\napp.listen(PORT, function () {\n  console.log("Server is listening on port ".concat(PORT));\n});\n\n//# sourceURL=webpack:///./server/index.js?'
                );

                /***/
            },

        /***/ './src/App.js':
            /*!********************!*\
  !*** ./src/App.js ***!
  \********************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _routes_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes/routes */ "./src/routes/routes.js");\n\n\n\nfunction App() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_routes_routes__WEBPACK_IMPORTED_MODULE_1__["default"], null));\n}\n\n/* harmony default export */ __webpack_exports__["default"] = (App);\n\n//# sourceURL=webpack:///./src/App.js?'
                );

                /***/
            },

        /***/ './src/Layout/Dashboard.js':
            /*!*********************************!*\
  !*** ./src/Layout/Dashboard.js ***!
  \*********************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "clsx");\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Drawer */ "@material-ui/core/Drawer");\n/* harmony import */ var _material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/AppBar */ "@material-ui/core/AppBar");\n/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/List */ "@material-ui/core/List");\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/ListItem */ "@material-ui/core/ListItem");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ "@material-ui/core/ListItemIcon");\n/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/ListItemText */ "@material-ui/core/ListItemText");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/Menu */ "@material-ui/icons/Menu");\n/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _material_ui_icons_DeviceHub__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/DeviceHub */ "@material-ui/icons/DeviceHub");\n/* harmony import */ var _material_ui_icons_DeviceHub__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_DeviceHub__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../style */ "./src/style.js");\n/* harmony import */ var _routes_AppRoutes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../routes/AppRoutes */ "./src/routes/AppRoutes.js");\n/* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/Login */ "./src/components/Login.js");\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar Dashboard = function Dashboard() {\n  var _clsx3, _clsx4;\n\n  var classes = Object(_style__WEBPACK_IMPORTED_MODULE_13__["useSidebarStyles"])();\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),\n      _useState2 = _slicedToArray(_useState, 2),\n      open = _useState2[0],\n      setOpen = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(\'\'),\n      _useState4 = _slicedToArray(_useState3, 2),\n      path = _useState4[0],\n      setPath = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(\'Import Data\'),\n      _useState6 = _slicedToArray(_useState5, 2),\n      title = _useState6[0],\n      setTitle = _useState6[1];\n\n  var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();\n  var location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useLocation"])();\n\n  var handleDrawerOpen = function handleDrawerOpen() {\n    setOpen(true);\n  };\n\n  var handleDrawerClose = function handleDrawerClose() {\n    setOpen(false);\n  };\n\n  var options = [{\n    name: \'Import Data\',\n    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("box-icon", {\n      name: "file-import",\n      type: "solid",\n      color: "#ffffff"\n    }),\n    path: \'/app\',\n    onClick: function onClick() {\n      history.push(\'/app\');\n      setTitle(\'Import Data\');\n    }\n  }, {\n    name: \'Scan\',\n    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("box-icon", {\n      name: "scan",\n      color: "#ffffff"\n    }),\n    path: \'/app/scan\',\n    onClick: function onClick() {\n      history.push(\'app/scan\');\n      setTitle(\'Scan\');\n    }\n  }, {\n    name: \'Device\',\n    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_DeviceHub__WEBPACK_IMPORTED_MODULE_11___default.a, null),\n    path: \'app/device\',\n    onClick: function onClick() {\n      history.push(\'app/device\');\n      setTitle(\'Device\');\n    }\n  }];\n  react__WEBPACK_IMPORTED_MODULE_0___default.a.useEffect(function () {\n    setPath(location.pathname);\n  }, [location, setPath]);\n\n  var activeRoute = function activeRoute(route) {\n    return route === path;\n  };\n\n  var drawer = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n    className: classes.toolbar,\n    style: {\n      backgroundColor: "#007777"\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {\n    variant: "h6",\n    style: {\n      width: \'80%\',\n      marginLeft: \'0.8rem\',\n      color: \'#fff\',\n      fontWeight: \'600\'\n    },\n    onClick: handleDrawerClose\n  }, "BloodSpace")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_6___default.a, {\n    className: classes.list\n  }, options.map(function (option, index) {\n    var icon = option.icon,\n        name = option.name,\n        onClick = option.onClick;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_7___default.a, {\n      button: true,\n      key: index,\n      onClick: onClick,\n      selected: activeRoute(option.path),\n      classes: {\n        selected: classes.listItemSelected,\n        button: classes.listItemButton\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_8___default.a, {\n      className: classes.listIcons\n    }, icon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_9___default.a, {\n      primary: name\n    }));\n  })));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n    className: classes.root\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    position: "fixed",\n    className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(classes.appBar, _defineProperty({}, classes.appBarShift, open))\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__["Toolbar"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_12__["IconButton"], {\n    color: "inherit",\n    "aria-label": "open drawer",\n    onClick: handleDrawerOpen,\n    edge: "start",\n    className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(classes, _defineProperty({}, classes.hide, open))\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_10___default.a, {\n    className: classes.menuIcon\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {\n    variant: "h6",\n    className: classes.typography\n  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Login__WEBPACK_IMPORTED_MODULE_15__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Drawer__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    variant: "permanent",\n    className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(classes.drawer, (_clsx3 = {}, _defineProperty(_clsx3, classes.drawerOpen, open), _defineProperty(_clsx3, classes.drawerClose, !open), _clsx3)),\n    classes: {\n      paper: clsx__WEBPACK_IMPORTED_MODULE_1___default()((_clsx4 = {}, _defineProperty(_clsx4, classes.drawerOpen, open), _defineProperty(_clsx4, classes.drawerClose, !open), _clsx4))\n    }\n  }, drawer), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {\n    className: classes.content\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n    className: classes.toolbar\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_routes_AppRoutes__WEBPACK_IMPORTED_MODULE_14__["default"], null))));\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (Dashboard);\n\n//# sourceURL=webpack:///./src/Layout/Dashboard.js?'
                );

                /***/
            },

        /***/ './src/components/CustomTable.js':
            /*!***************************************!*\
  !*** ./src/components/Index.js ***!
  \***************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    "__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Index; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ \"@material-ui/core/styles\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ \"@material-ui/core\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Table */ \"@material-ui/core/Table\");\n/* harmony import */ var _material_ui_core_Table__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/TableBody */ \"@material-ui/core/TableBody\");\n/* harmony import */ var _material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/TableCell */ \"@material-ui/core/TableCell\");\n/* harmony import */ var _material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_TableContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/TableContainer */ \"@material-ui/core/TableContainer\");\n/* harmony import */ var _material_ui_core_TableContainer__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TableContainer__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/TableHead */ \"@material-ui/core/TableHead\");\n/* harmony import */ var _material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_TablePagination__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/TablePagination */ \"@material-ui/core/TablePagination\");\n/* harmony import */ var _material_ui_core_TablePagination__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TablePagination__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/TableRow */ \"@material-ui/core/TableRow\");\n/* harmony import */ var _material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/Search */ \"@material-ui/icons/Search\");\n/* harmony import */ var _material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Search__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/Visibility */ \"@material-ui/icons/Visibility\");\n/* harmony import */ var _material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Visibility__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _material_ui_icons_PictureAsPdf__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/PictureAsPdf */ \"@material-ui/icons/PictureAsPdf\");\n/* harmony import */ var _material_ui_icons_PictureAsPdf__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_PictureAsPdf__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var react_sortable_hoc__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-sortable-hoc */ \"react-sortable-hoc\");\n/* harmony import */ var react_sortable_hoc__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_sortable_hoc__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _data_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../data.json */ \"./src/data.json\");\nvar _data_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../data.json */ \"./src/data.json\", 1);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar columns = [{\n  id: 'source',\n  label: 'Source',\n  minWidth: 130\n}, {\n  id: 'rfid_code',\n  label: 'RFID Code',\n  minWidth: 100\n}, {\n  id: 'ClientREf#',\n  label: 'Client Ref#',\n  minWidth: 100\n}, {\n  id: 'stone_type',\n  label: 'Stone Type',\n  minWidth: 120,\n  align: 'center',\n  format: function format(value) {\n    return value.toLocaleString('en-US');\n  }\n}, {\n  id: 'shape',\n  label: 'Shape',\n  minWidth: 170,\n  align: 'center',\n  format: function format(value) {\n    return value.toLocaleString('en-US');\n  }\n}, {\n  id: 'color',\n  label: 'Color',\n  minWidth: 130,\n  align: 'center',\n  format: function format(value) {\n    return value.toFixed(2);\n  }\n}, {\n  id: 'clarity',\n  label: 'Clarity',\n  minWidth: 130,\n  align: 'center',\n  format: function format(value) {\n    return value.toFixed(2);\n  }\n}, {\n  id: 'lab',\n  label: 'Lab',\n  minWidth: 130,\n  align: 'center',\n  format: function format(value) {\n    return value.toFixed(2);\n  }\n}, {\n  id: 'Certificate',\n  label: 'Certificate',\n  minWidth: 130,\n  align: 'center',\n  format: function format(value) {\n    return value.toFixed(2);\n  }\n}, {\n  id: 'Certificatedate',\n  label: 'Certificate Date',\n  minWidth: 130,\n  align: 'center',\n  format: function format(value) {\n    return value.toFixed(2);\n  }\n}, {\n  id: 'CaratWeight',\n  label: 'Carat Weight',\n  minWidth: 130,\n  align: 'center',\n  format: function format(value) {\n    return value.toFixed(2);\n  }\n}];\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__[\"makeStyles\"])({\n  root: {\n    width: '100%'\n  },\n  container: {\n    maxHeight: '550px',\n    '& .MuiTableCell-stickyHeader': {\n      backgroundColor: '#9e9e9e',\n      borderBottom: '0px'\n    }\n  },\n  main: {\n    paddingTop: '25px'\n  },\n  head: {\n    backgroundColor: '#000',\n    '& .MuiTableRow-root': {\n      backgroundColor: '#000'\n    }\n  },\n  first: {\n    marginBottom: '20px'\n  },\n  search: {\n    height: '40px'\n  },\n  bold: {\n    fontWeight: 'bold'\n  },\n  right: {\n    marginRight: '300px'\n  }\n});\nvar DragHead = Object(react_sortable_hoc__WEBPACK_IMPORTED_MODULE_13__[\"SortableContainer\"])(function (_ref) {\n  var children = _ref.children;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_7___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_9___default.a, null, children));\n});\nvar DragCell = Object(react_sortable_hoc__WEBPACK_IMPORTED_MODULE_13__[\"SortableElement\"])(function (_ref2) {\n  var value = _ref2.value;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, value);\n});\nfunction Index() {\n  var classes = useStyles();\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(0),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      page = _React$useState2[0],\n      setPage = _React$useState2[1];\n\n  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(10),\n      _React$useState4 = _slicedToArray(_React$useState3, 2),\n      rowsPerPage = _React$useState4[0],\n      setRowsPerPage = _React$useState4[1];\n\n  var handleChangePage = function handleChangePage(event, newPage) {\n    setPage(newPage);\n  };\n\n  var handleChangeRowsPerPage = function handleChangeRowsPerPage(event) {\n    setRowsPerPage(+event.target.value);\n    setPage(0);\n  };\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(new Array(columns.length).fill(null).map(function (n, i) {\n    return i;\n  })),\n      _useState2 = _slicedToArray(_useState, 2),\n      order = _useState2[0],\n      setOrder = _useState2[1];\n\n  var onReorderEnd = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useCallback\"])(function (_ref3, e) {\n    var oldIndex = _ref3.oldIndex,\n        newIndex = _ref3.newIndex,\n        collection = _ref3.collection,\n        isKeySorting = _ref3.isKeySorting;\n\n    var newOrder = _toConsumableArray(order);\n\n    var moved = newOrder.splice(oldIndex, 1);\n    newOrder.splice(newIndex, 0, moved[0]);\n    setOrder(newOrder);\n  }, [order, setOrder]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(function () {}, [onReorderEnd]);\n  console.log(order);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[\"Paper\"], {\n    className: classes.root\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TableContainer__WEBPACK_IMPORTED_MODULE_6___default.a, {\n    className: classes.container\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    stickyHeader: true,\n    \"aria-label\": \"sticky table\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DragHead, {\n    axis: \"x\",\n    onSortEnd: onReorderEnd\n  }, order.map(function (colIdx, i) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DragCell, {\n      index: i,\n      key: colIdx,\n      value: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_5___default.a, {\n        align: columns[colIdx].align,\n        className: classes.tableHeaderCell\n      }, columns[colIdx].label)\n    });\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_4___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TablePagination__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    rowsPerPageOptions: [10, 25, 100],\n    component: \"div\",\n    count: 100,\n    rowsPerPage: rowsPerPage,\n    page: page,\n    onChangePage: handleChangePage,\n    onChangeRowsPerPage: handleChangeRowsPerPage\n  }));\n}\n\n//# sourceURL=webpack:///./src/components/Index.js?"
                );

                /***/
            },

        /***/ './src/components/Login.js':
            /*!*********************************!*\
  !*** ./src/components/Login.js ***!
  \*********************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/AccountCircle */ "@material-ui/icons/AccountCircle");\n/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/MenuItem */ "@material-ui/core/MenuItem");\n/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Menu */ "@material-ui/core/Menu");\n/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/List */ "@material-ui/core/List");\n/* harmony import */ var _material_ui_core_List__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/ListItem */ "@material-ui/core/ListItem");\n/* harmony import */ var _material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/ListItemIcon */ "@material-ui/core/ListItemIcon");\n/* harmony import */ var _material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/ListItemText */ "@material-ui/core/ListItemText");\n/* harmony import */ var _material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_icons_ExpandLess__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/icons/ExpandLess */ "@material-ui/icons/ExpandLess");\n/* harmony import */ var _material_ui_icons_ExpandLess__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandLess__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/icons/ExpandMore */ "@material-ui/icons/ExpandMore");\n/* harmony import */ var _material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _material_ui_icons_ExitToApp__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/ExitToApp */ "@material-ui/icons/ExitToApp");\n/* harmony import */ var _material_ui_icons_ExitToApp__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_ExitToApp__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _material_ui_icons_Palette__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/icons/Palette */ "@material-ui/icons/Palette");\n/* harmony import */ var _material_ui_icons_Palette__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Palette__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/Collapse */ "@material-ui/core/Collapse");\n/* harmony import */ var _material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../style */ "./src/style.js");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar Login = function Login() {\n  var classes = Object(_style__WEBPACK_IMPORTED_MODULE_15__["useSidebarStyles"])(); // const [auth, setAuth] = React.useState(true);\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null),\n      _useState2 = _slicedToArray(_useState, 2),\n      anchorEl = _useState2[0],\n      setAnchorEl = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(\'Ankit Pavar\'),\n      _useState4 = _slicedToArray(_useState3, 2),\n      userName = _useState4[0],\n      setUserName = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(\'Admin\'),\n      _useState6 = _slicedToArray(_useState5, 2),\n      role = _useState6[0],\n      setRole = _useState6[1];\n\n  var open = Boolean(anchorEl);\n\n  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),\n      _useState8 = _slicedToArray(_useState7, 2),\n      open1 = _useState8[0],\n      setOpen1 = _useState8[1];\n\n  var handleClick1 = function handleClick1() {\n    setOpen1(!open1);\n  };\n\n  var handleMenu = function handleMenu(event) {\n    setAnchorEl(event.currentTarget);\n  };\n\n  var handleClose = function handleClose() {\n    setAnchorEl(null);\n  };\n\n  var colors = [{\n    class: classes.magenta\n  }, {\n    class: classes.red\n  }, {\n    class: classes.green\n  }, {\n    class: classes.pink\n  }, {\n    class: classes.indigo\n  }, {\n    class: classes.purple\n  }];\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_7___default.a, {\n    button: true,\n    onClick: handleMenu,\n    className: classes.loginList\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_3___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n    className: classes.subList\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_9___default.a, {\n    primary: userName,\n    style: {\n      marginLeft: -20\n    }\n  })), open ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandLess__WEBPACK_IMPORTED_MODULE_10___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_5___default.a, {\n    id: "simple-menu",\n    anchorEl: anchorEl,\n    keepMounted: true,\n    open: Boolean(anchorEl),\n    onClose: handleClose,\n    getContentAnchorEl: null,\n    anchorOrigin: {\n      vertical: \'bottom\',\n      horizontal: \'center\'\n    },\n    transformOrigin: {\n      horizontal: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExitToApp__WEBPACK_IMPORTED_MODULE_12___default.a, {\n    style: {\n      marginRight: 8\n    }\n  }), " Logout"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_6___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_7___default.a, {\n    button: true,\n    onClick: handleClick1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemIcon__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Palette__WEBPACK_IMPORTED_MODULE_13___default.a, {\n    style: {\n      marginRight: 5\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItemText__WEBPACK_IMPORTED_MODULE_9___default.a, {\n    primary: "Theme Color",\n    style: {\n      marginLeft: -25\n    }\n  }), open1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandLess__WEBPACK_IMPORTED_MODULE_10___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_ExpandMore__WEBPACK_IMPORTED_MODULE_11___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Collapse__WEBPACK_IMPORTED_MODULE_14___default.a, {\n    in: open1,\n    timeout: "auto",\n    unmountOnExit: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_List__WEBPACK_IMPORTED_MODULE_6___default.a, {\n    component: "div",\n    disablePadding: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_ListItem__WEBPACK_IMPORTED_MODULE_7___default.a, {\n    className: classes.nested\n  }, colors.map(function (clr) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {\n      className: clr.class\n    });\n  })))))));\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (Login);\n\n//# sourceURL=webpack:///./src/components/Login.js?'
                );

                /***/
            },

        /***/ './src/data.json':
            /*!***********************!*\
  !*** ./src/data.json ***!
  \***********************/
            /*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, default */
            /***/ function (module) {
                eval(
                    'module.exports = JSON.parse("[{\\"rfid\\":\\"\\",\\"clienId\\":\\"\\",\\"isDeleted\\":false,\\"isAssociated\\":false,\\"_id\\":\\"5fe469bc963a0f299ce73395\\",\\"metaData\\":[{\\"dataType\\":\\"String\\",\\"key\\":\\"RFID_Code\\",\\"value\\":\\"3020668010\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ref#*\\",\\"value\\":\\"REF-010\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"White/Off-White/Fancy\\",\\"value\\":\\"Fancy\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Shape\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_color\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Weight\\",\\"value\\":\\"6\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Clarity\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_$/Ct\\",\\"value\\":\\"12000\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Total_USD\\",\\"value\\":\\"72000\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Lab\\",\\"value\\":\\"HRD\\"},{\\"dataType\\":\\"Number\\",\\"key\\":\\"Certificat\\",\\"value\\":\\"225566559\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Certificat_Date\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_Shape\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_color\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Measurements\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms1\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms2\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms3\\",\\"value\\":\\"\\"}],\\"__v\\":0,\\"createdAt\\":\\"2020-12-24T10:13:16.518Z\\",\\"updatedAt\\":\\"2020-12-24T10:13:16.518Z\\"},{\\"rfid\\":\\"\\",\\"clienId\\":\\"\\",\\"isDeleted\\":false,\\"isAssociated\\":false,\\"_id\\":\\"5fe469bc963a0f299ce73396\\",\\"metaData\\":[{\\"dataType\\":\\"String\\",\\"key\\":\\"RFID_Code\\",\\"value\\":\\"3020668011\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ref#*\\",\\"value\\":\\"REF-011\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"White/Off-White/Fancy\\",\\"value\\":\\"Fancy\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Shape\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_color\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Weight\\",\\"value\\":\\"8\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Clarity\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_$/Ct\\",\\"value\\":\\"4370\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Total_USD\\",\\"value\\":\\"34960\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Lab\\",\\"value\\":\\"HRD\\"},{\\"dataType\\":\\"Number\\",\\"key\\":\\"Certificat\\",\\"value\\":\\"225566560\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Certificat_Date\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_Shape\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_color\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Measurements\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms1\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms2\\",\\"value\\":\\"\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms3\\",\\"value\\":\\"\\"}],\\"__v\\":0,\\"createdAt\\":\\"2020-12-24T10:13:16.520Z\\",\\"updatedAt\\":\\"2020-12-24T10:13:16.520Z\\"},{\\"rfid\\":\\"\\",\\"clienId\\":\\"\\",\\"isDeleted\\":false,\\"isAssociated\\":false,\\"_id\\":\\"5fe469bc963a0f299ce73397\\",\\"metaData\\":[{\\"dataType\\":\\"String\\",\\"key\\":\\"RFID_Code\\",\\"value\\":\\"3020668012\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ref#*\\",\\"value\\":\\"REF-012\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"White/Off-White/Fancy\\",\\"value\\":\\"Off-White\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Shape\\",\\"value\\":\\"Cushion\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_color\\",\\"value\\":\\"Q\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Weight\\",\\"value\\":\\"5.1\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Clarity\\",\\"value\\":\\"SI1\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_$/Ct\\",\\"value\\":\\"8250\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Total_USD\\",\\"value\\":\\"42075\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Lab\\",\\"value\\":\\"HRD\\"},{\\"dataType\\":\\"Number\\",\\"key\\":\\"Certificat\\",\\"value\\":\\"225566561\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Certificat_Date\\",\\"value\\":\\"43710\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_Shape\\",\\"value\\":\\"Cushion\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_color\\",\\"value\\":\\"slightly tinted white (J)\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Measurements\\",\\"value\\":\\"9.39 x 9.31 x 6.67\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms1\\",\\"value\\":\\"9.39\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms2\\",\\"value\\":\\"9.31\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms3\\",\\"value\\":\\"6.67\\"}],\\"__v\\":0,\\"createdAt\\":\\"2020-12-24T10:13:16.523Z\\",\\"updatedAt\\":\\"2020-12-24T10:13:16.523Z\\"},{\\"rfid\\":\\"\\",\\"clienId\\":\\"\\",\\"isDeleted\\":false,\\"isAssociated\\":false,\\"_id\\":\\"5fe469bc963a0f299ce73398\\",\\"metaData\\":[{\\"dataType\\":\\"String\\",\\"key\\":\\"RFID_Code\\",\\"value\\":\\"3020668013\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ref#*\\",\\"value\\":\\"REF-013\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"White/Off-White/Fancy\\",\\"value\\":\\"White\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Shape\\",\\"value\\":\\"Cushion\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_color\\",\\"value\\":\\"D\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Weight\\",\\"value\\":\\"5.03\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Clarity\\",\\"value\\":\\"VS2\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_$/Ct\\",\\"value\\":\\"17860\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Total_USD\\",\\"value\\":\\"89835.8\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Lab\\",\\"value\\":\\"HRD\\"},{\\"dataType\\":\\"Number\\",\\"key\\":\\"Certificat\\",\\"value\\":\\"225566562\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Certificat_Date\\",\\"value\\":\\"41333\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_Shape\\",\\"value\\":\\"Rectangular Cushion Modified Brilliant\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_color\\",\\"value\\":\\"D\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Measurements\\",\\"value\\":\\"10.83 x 8.08 x 6.56\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms1\\",\\"value\\":\\"10.83\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms2\\",\\"value\\":\\"8.08\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms3\\",\\"value\\":\\"6.56\\"}],\\"__v\\":0,\\"createdAt\\":\\"2020-12-24T10:13:16.526Z\\",\\"updatedAt\\":\\"2020-12-24T10:13:16.526Z\\"},{\\"rfid\\":\\"\\",\\"clienId\\":\\"\\",\\"isDeleted\\":false,\\"isAssociated\\":false,\\"_id\\":\\"5fe469bc963a0f299ce73399\\",\\"metaData\\":[{\\"dataType\\":\\"String\\",\\"key\\":\\"RFID_Code\\",\\"value\\":\\"3020668014\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ref#*\\",\\"value\\":\\"REF-014\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"White/Off-White/Fancy\\",\\"value\\":\\"White\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Shape\\",\\"value\\":\\"Cushion\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_color\\",\\"value\\":\\"J\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Weight\\",\\"value\\":\\"7.03\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Clarity\\",\\"value\\":\\"SI2\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_$/Ct\\",\\"value\\":\\"5400\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Total_USD\\",\\"value\\":\\"37962\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Lab\\",\\"value\\":\\"HRD\\"},{\\"dataType\\":\\"Number\\",\\"key\\":\\"Certificat\\",\\"value\\":\\"225566563\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Certificat_Date\\",\\"value\\":\\"43913\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_Shape\\",\\"value\\":\\"Cushion\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_color\\",\\"value\\":\\"slightly tinted white (J)\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Measurements\\",\\"value\\":\\"10.85 x 10.77 x 7\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms1\\",\\"value\\":\\"10.85\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms2\\",\\"value\\":\\"10.77\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms3\\",\\"value\\":\\"7\\"}],\\"__v\\":0,\\"createdAt\\":\\"2020-12-24T10:13:16.531Z\\",\\"updatedAt\\":\\"2020-12-24T10:13:16.531Z\\"},{\\"rfid\\":\\"\\",\\"clienId\\":\\"\\",\\"isDeleted\\":false,\\"isAssociated\\":false,\\"_id\\":\\"5fe469bc963a0f299ce7339a\\",\\"metaData\\":[{\\"dataType\\":\\"String\\",\\"key\\":\\"RFID_Code\\",\\"value\\":\\"3020668015\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ref#*\\",\\"value\\":\\"REF-015\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"White/Off-White/Fancy\\",\\"value\\":\\"White\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Shape\\",\\"value\\":\\"Cushion\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_color\\",\\"value\\":\\"H\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Weight\\",\\"value\\":\\"6.05\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Clarity\\",\\"value\\":\\"VS1\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_$/Ct\\",\\"value\\":\\"12825\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Total_USD\\",\\"value\\":\\"77591.25\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Lab\\",\\"value\\":\\"HRD\\"},{\\"dataType\\":\\"Number\\",\\"key\\":\\"Certificat\\",\\"value\\":\\"225566564\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Certificat_Date\\",\\"value\\":\\"43920\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_Shape\\",\\"value\\":\\"Cushion\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_color\\",\\"value\\":\\"white (H)\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Measurements\\",\\"value\\":\\"10.2 x 10.2 x 7.1\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms1\\",\\"value\\":\\"10.2\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms2\\",\\"value\\":\\"10.2\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms3\\",\\"value\\":\\"7.1\\"}],\\"__v\\":0,\\"createdAt\\":\\"2020-12-24T10:13:16.533Z\\",\\"updatedAt\\":\\"2020-12-24T10:13:16.533Z\\"},{\\"rfid\\":\\"\\",\\"clienId\\":\\"\\",\\"isDeleted\\":false,\\"isAssociated\\":false,\\"_id\\":\\"5fe469bc963a0f299ce7339b\\",\\"metaData\\":[{\\"dataType\\":\\"String\\",\\"key\\":\\"RFID_Code\\",\\"value\\":\\"3020668016\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ref#*\\",\\"value\\":\\"REF-016\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"White/Off-White/Fancy\\",\\"value\\":\\"White\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Shape\\",\\"value\\":\\"Oval\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_color\\",\\"value\\":\\"H\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Weight\\",\\"value\\":\\"5.01\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Clarity\\",\\"value\\":\\"SI1\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_$/Ct\\",\\"value\\":\\"9120\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Total_USD\\",\\"value\\":\\"45691.2\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Lab\\",\\"value\\":\\"HRD\\"},{\\"dataType\\":\\"Number\\",\\"key\\":\\"Certificat\\",\\"value\\":\\"225566565\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Certificat_Date\\",\\"value\\":\\"43927\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_Shape\\",\\"value\\":\\"Oval (variation)\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_color\\",\\"value\\":\\"white (H)\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Measurements\\",\\"value\\":\\"11.99 x 8.1 x 6.01\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms1\\",\\"value\\":\\"11.99\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms2\\",\\"value\\":\\"8.1\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms3\\",\\"value\\":\\"6.01\\"}],\\"__v\\":0,\\"createdAt\\":\\"2020-12-24T10:13:16.536Z\\",\\"updatedAt\\":\\"2020-12-24T10:13:16.536Z\\"},{\\"rfid\\":\\"\\",\\"clienId\\":\\"\\",\\"isDeleted\\":false,\\"isAssociated\\":false,\\"_id\\":\\"5fe469bc963a0f299ce7339c\\",\\"metaData\\":[{\\"dataType\\":\\"String\\",\\"key\\":\\"RFID_Code\\",\\"value\\":\\"3020668017\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ref#*\\",\\"value\\":\\"REF-017\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"White/Off-White/Fancy\\",\\"value\\":\\"White\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Shape\\",\\"value\\":\\"Pear\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_color\\",\\"value\\":\\"D\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Weight\\",\\"value\\":\\"3.01\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Clarity\\",\\"value\\":\\"VS2\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_$/Ct\\",\\"value\\":\\"16250.000000000002\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Total_USD\\",\\"value\\":\\"48912.5\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Lab\\",\\"value\\":\\"HRD\\"},{\\"dataType\\":\\"Number\\",\\"key\\":\\"Certificat\\",\\"value\\":\\"225566566\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Certificat_Date\\",\\"value\\":\\"42285\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_Shape\\",\\"value\\":\\"Pear Modified Brillant\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_color\\",\\"value\\":\\"D\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Measurements\\",\\"value\\":\\"12.49 x 8.2 x 4.64\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms1\\",\\"value\\":\\"12.49\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms2\\",\\"value\\":\\"8.2\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms3\\",\\"value\\":\\"4.64\\"}],\\"__v\\":0,\\"createdAt\\":\\"2020-12-24T10:13:16.537Z\\",\\"updatedAt\\":\\"2020-12-24T10:13:16.537Z\\"},{\\"rfid\\":\\"\\",\\"clienId\\":\\"\\",\\"isDeleted\\":false,\\"isAssociated\\":false,\\"_id\\":\\"5fe469bc963a0f299ce7339d\\",\\"metaData\\":[{\\"dataType\\":\\"String\\",\\"key\\":\\"RFID_Code\\",\\"value\\":\\"3020668018\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ref#*\\",\\"value\\":\\"REF-018\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"White/Off-White/Fancy\\",\\"value\\":\\"White\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Shape\\",\\"value\\":\\"Princess\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_color\\",\\"value\\":\\"G\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Weight\\",\\"value\\":\\"3.01\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Clarity\\",\\"value\\":\\"VVS2\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Client_$/Ct\\",\\"value\\":\\"14100.000000000002\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Total_USD\\",\\"value\\":\\"42441\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Lab\\",\\"value\\":\\"HRD\\"},{\\"dataType\\":\\"Number\\",\\"key\\":\\"Certificat\\",\\"value\\":\\"225566567\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Certificat_Date\\",\\"value\\":\\"41466\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_Shape\\",\\"value\\":\\"Square Modified Brillant\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Grading_report_color\\",\\"value\\":\\"G\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Measurements\\",\\"value\\":\\"7.95 x 7.82 x 5.77\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms1\\",\\"value\\":\\"7.95\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms2\\",\\"value\\":\\"7.82\\"},{\\"dataType\\":\\"String\\",\\"key\\":\\"Ms3\\",\\"value\\":\\"5.77\\"}],\\"__v\\":0,\\"createdAt\\":\\"2020-12-24T10:13:16.538Z\\",\\"updatedAt\\":\\"2020-12-24T10:13:16.538Z\\"}]");\n\n//# sourceURL=webpack:///./src/data.json?'
                );

                /***/
            },

        /***/ './src/pages/DevicePage.js':
            /*!*********************************!*\
  !*** ./src/pages/DevicePage.js ***!
  \*********************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar Device = function Device() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Device"));\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (Device);\n\n//# sourceURL=webpack:///./src/pages/DevicePage.js?'
                );

                /***/
            },

        /***/ './src/pages/ImportPage.js':
            /*!*********************************!*\
  !*** ./src/pages/ImportPage.js ***!
  \*********************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style */ "./src/style.js");\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");\n/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");\n/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var material_ui_dropzone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! material-ui-dropzone */ "material-ui-dropzone");\n/* harmony import */ var material_ui_dropzone__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(material_ui_dropzone__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_FormHelperText__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/FormHelperText */ "@material-ui/core/FormHelperText");\n/* harmony import */ var _material_ui_core_FormHelperText__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormHelperText__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _components_CustomTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Index */ "./src/components/index.js");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\nvar ImportPage = function ImportPage() {\n  var classes = Object(_style__WEBPACK_IMPORTED_MODULE_1__["useImportPageStyles"])();\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(\'\'),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      file = _React$useState2[0],\n      setFile = _React$useState2[1];\n\n  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(true),\n      _React$useState4 = _slicedToArray(_React$useState3, 2),\n      hasError = _React$useState4[0],\n      setError = _React$useState4[1];\n\n  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(\'No File Selected\'),\n      _React$useState6 = _slicedToArray(_React$useState5, 2),\n      fileName = _React$useState6[0],\n      setFileName = _React$useState6[1];\n\n  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false),\n      _React$useState8 = _slicedToArray(_React$useState7, 2),\n      step = _React$useState8[0],\n      setStep = _React$useState8[1];\n\n  var handleFileChange = function handleFileChange(files) {\n    setFile(files[0]);\n  };\n\n  function handleClick() {\n    setStep(function (prev) {\n      return !prev;\n    });\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n    className: classes.root\n  }, step ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    item: true,\n    xs: 12,\n    md: 6\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    className: classes.card\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {\n    className: classes.title,\n    style: {\n      color: \'#878787\'\n    },\n    gutterBottom: true\n  }, "FILE IMPORT"), hasError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormHelperText__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    style: {\n      color: \'red\'\n    }\n  }, "Please select file!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n    style: {\n      marginTop: 20\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(material_ui_dropzone__WEBPACK_IMPORTED_MODULE_6__["DropzoneArea"], {\n    onChange: handleFileChange\n  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    item: true,\n    xs: 12,\n    md: 6\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    className: classes.card\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 0,\n    direction: "row",\n    alignItems: "center",\n    justify: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_5___default.a, {\n    variant: \'body1\'\n  }, fileName)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 0,\n    direction: "row",\n    alignItems: "center",\n    justify: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n    style: {\n      marginTop: 10,\n      justifyContent: \'center\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {\n    className: classes.backButton\n  }, "Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {\n    variant: "contained",\n    color: "primary",\n    onCick: handleClick\n  }, "Next"))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CustomTable__WEBPACK_IMPORTED_MODULE_9__["default"], null));\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (ImportPage);\n\n//# sourceURL=webpack:///./src/pages/ImportPage.js?'
                );

                /***/
            },

        /***/ './src/pages/LoginPage.js':
            /*!********************************!*\
  !*** ./src/pages/LoginPage.js ***!
  \********************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style */ "./src/style.js");\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");\n/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_card_flip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-card-flip */ "react-card-flip");\n/* harmony import */ var react_card_flip__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_card_flip__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");\n/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_icons_Email__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/Email */ "@material-ui/icons/Email");\n/* harmony import */ var _material_ui_icons_Email__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Email__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/TextField */ "@material-ui/core/TextField");\n/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Lock */ "@material-ui/icons/Lock");\n/* harmony import */ var _material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/Checkbox */ "@material-ui/core/Checkbox");\n/* harmony import */ var _material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_core_Link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/Link */ "@material-ui/core/Link");\n/* harmony import */ var _material_ui_core_Link__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons */ "@material-ui/icons");\n/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @material-ui/core/InputAdornment */ "@material-ui/core/InputAdornment");\n/* harmony import */ var _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @material-ui/core/Input */ "@material-ui/core/Input");\n/* harmony import */ var _material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @material-ui/core/InputLabel */ "@material-ui/core/InputLabel");\n/* harmony import */ var _material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @material-ui/core/FormControl */ "@material-ui/core/FormControl");\n/* harmony import */ var _material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @material-ui/core/FormControlLabel */ "@material-ui/core/FormControlLabel");\n/* harmony import */ var _material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_18__);\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\n // import { Link } from \'react-router-dom\';\n\n\n\n\n\n\n\n\n\nvar LoginPage = function LoginPage() {\n  var classes = Object(_style__WEBPACK_IMPORTED_MODULE_1__["useLoginPageStyles"])();\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(\'\'),\n      _useState2 = _slicedToArray(_useState, 2),\n      email = _useState2[0],\n      setEmail = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(\'\'),\n      _useState4 = _slicedToArray(_useState3, 2),\n      password = _useState4[0],\n      setPassword = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),\n      _useState6 = _slicedToArray(_useState5, 2),\n      showPassword = _useState6[0],\n      setPasswordVisibility = _useState6[1];\n\n  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(\'Login\'),\n      _useState8 = _slicedToArray(_useState7, 2),\n      btnText = _useState8[0],\n      setBtnText = _useState8[1];\n\n  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),\n      _useState10 = _slicedToArray(_useState9, 2),\n      checked = _useState10[0],\n      setChecked = _useState10[1];\n\n  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),\n      _useState12 = _slicedToArray(_useState11, 2),\n      otpLogin = _useState12[0],\n      setOtpLogin = _useState12[1];\n\n  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),\n      _useState14 = _slicedToArray(_useState13, 2),\n      flipped = _useState14[0],\n      setFlipped = _useState14[1];\n\n  function togglePasswordVisibility() {\n    setPasswordVisibility(function (prev) {\n      return !prev;\n    });\n  }\n\n  function handleEmailChange(e) {\n    setEmail(e.target.value);\n  }\n\n  function handlePasswordChange(e) {\n    setPassword(e.target.value);\n  }\n\n  function handleSubmit(e) {\n    e.preventDefault();\n  }\n\n  function handleOtpLogin(e) {\n    e.preventDefault();\n    setFlipped(function (prev) {\n      return !prev;\n    });\n  }\n\n  function handleChangeCheckBox(event) {\n    setChecked(event.target.checked);\n\n    if (checked === true) {\n      setBtnText(\'Login \');\n      setOtpLogin(false);\n    } else {\n      setBtnText(\'Login OTP\');\n      setOtpLogin(true);\n    }\n  }\n\n  console.log(checked);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 0,\n    direction: "column",\n    alignItems: "center",\n    justify: "center",\n    style: {\n      marginTop: 100\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_card_flip__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    isFlipped: flipped,\n    flipDirection: "vertical"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 0,\n    direction: "column",\n    alignItems: "top",\n    justify: "center",\n    style: {\n      background: \'#f5f5f5\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n    className: classes.root,\n    style: {\n      minWidth: 450,\n      background: \'#ffffff\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 0,\n    direction: "column",\n    alignItems: "center",\n    justify: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    variant: "h4",\n    className: classes.mainLogo\n  }, "BloodSpace")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 1,\n    alignItems: "flex-end",\n    justify: "center",\n    style: {\n      marginTop: 10\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    item: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Email__WEBPACK_IMPORTED_MODULE_5___default.a, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    item: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default.a, {\n    label: "Email",\n    id: "email",\n    name: "email",\n    validators: [\'required\', \'isEmail\'],\n    errorMessages: [\'this field is required\', \'email is not valid\'],\n    value: email,\n    onChange: handleEmailChange,\n    style: {\n      width: 280\n    }\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 1,\n    alignItems: "flex-end",\n    justify: "center",\n    style: {\n      marginTop: 18\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    item: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_7___default.a, {\n    style: {\n      marginTop: 10\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControl__WEBPACK_IMPORTED_MODULE_17___default.a, {\n    style: {\n      width: 290,\n      marginBottom: 2\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputLabel__WEBPACK_IMPORTED_MODULE_16___default.a, {\n    htmlFor: "standard-adornment-password"\n  }, "Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Input__WEBPACK_IMPORTED_MODULE_15___default.a, {\n    id: "password",\n    name: "password",\n    type: showPassword ? \'text\' : \'password\',\n    value: password,\n    onChange: handlePasswordChange,\n    endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_14___default.a, {\n      position: "end"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_13___default.a, {\n      onClick: togglePasswordVisibility\n    }, showPassword ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons__WEBPACK_IMPORTED_MODULE_12__["Visibility"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons__WEBPACK_IMPORTED_MODULE_12__["VisibilityOff"], null)))\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 2 // alignItems="flex-start"\n    // justify="flex-start"\n    ,\n    style: {\n      marginLeft: 84,\n      marginTop: 5\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    xs: 6,\n    md: 6,\n    alignItems: "flex-start"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_FormControlLabel__WEBPACK_IMPORTED_MODULE_18___default.a, {\n    color: "textSecondary",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Checkbox__WEBPACK_IMPORTED_MODULE_9___default.a, {\n      checked: checked,\n      onChange: handleChangeCheckBox\n    }),\n    label: "Secure Login"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    xs: 5,\n    md: 5,\n    alignItems: "flex-end",\n    justify: "flex-end",\n    style: {\n      marginTop: 10,\n      marginLeft: \'-21px\',\n      color: \'#1769aa\'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 0,\n    direction: "column",\n    alignItems: "center",\n    justify: "center",\n    style: {\n      marginTop: 20,\n      marginBottom: 10\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default.a, {\n    variant: "contained",\n    color: "primary",\n    onClick: function onClick(e) {\n      otpLogin ? handleOtpLogin(e) : handleSubmit(e);\n    }\n  }, btnText)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 0,\n    direction: "row",\n    alignItems: "center",\n    justify: "center"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    style: {\n      marginTop: 20,\n      marginBottom: 5\n    },\n    variant: "body2",\n    color: "textSecondary",\n    align: "center"\n  }, \'Copyright © \', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_10___default.a, {\n    color: "inherit",\n    href: "https://spacecode.com/"\n  }, "Spacecode SAS."), \' \', new Date().getFullYear(), \'.\', "All rights reserved."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 0,\n    direction: "column",\n    alignItems: "top",\n    justify: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n    className: classes.root,\n    style: {\n      minWidth: 450,\n      background: \'#fff\'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 0,\n    direction: "column",\n    alignItems: "center",\n    justify: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    variant: "h4",\n    className: classes.mainLogo\n  }, "BloodSpace")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    variant: "body2",\n    color: "textSecondary",\n    align: "center",\n    style: {\n      padding: 30,\n      marginTop: 20\n    }\n  }, "Please enter the OTP, which you received in your registered Email."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 1,\n    alignItems: "flex-end",\n    justify: "center"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    item: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_6___default.a, {\n    name: "otp",\n    variant: \'outlined\',\n    type: "otp",\n    id: "otp",\n    inputProps: {\n      maxLength: 6,\n      style: {\n        width: 80,\n        textAlign: \'center\'\n      }\n    } // value={state.otp}\n    // onChange={handleChange}\n\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 0,\n    direction: "row",\n    alignItems: "center",\n    justify: "center"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    container: true,\n    spacing: 0,\n    direction: "column",\n    alignItems: "center",\n    justify: "center",\n    style: {\n      marginTop: 30,\n      marginBottom: 20\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_11___default.a, {\n    variant: "contained" // onClick={getOTPVerify}\n    ,\n    color: "primary"\n  }, "Log in")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    variant: "body2",\n    color: "textSecondary",\n    align: "center"\n  }, \'Copyright © \', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Link__WEBPACK_IMPORTED_MODULE_10___default.a, {\n    color: "inherit",\n    href: "https://spacecode.com/"\n  }, "Spacecode SAS."), \' \', new Date().getFullYear(), \'.\', "All rights reserved."))))));\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (LoginPage);\n\n//# sourceURL=webpack:///./src/pages/LoginPage.js?'
                );

                /***/
            },

        /***/ './src/pages/ScanPage.js':
            /*!*******************************!*\
  !*** ./src/pages/ScanPage.js ***!
  \*******************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar Scan = function Scan() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Scan"));\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (Scan);\n\n//# sourceURL=webpack:///./src/pages/ScanPage.js?'
                );

                /***/
            },

        /***/ './src/routes/AppRoutes.js':
            /*!*********************************!*\
  !*** ./src/routes/AppRoutes.js ***!
  \*********************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _pages_ImportPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/ImportPage */ "./src/pages/ImportPage.js");\n/* harmony import */ var _pages_ScanPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/ScanPage */ "./src/pages/ScanPage.js");\n/* harmony import */ var _pages_DevicePage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pages/DevicePage */ "./src/pages/DevicePage.js");\n/* harmony import */ var _PrivateRoute__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PrivateRoute */ "./src/routes/PrivateRoute.js");\n\n\n\n\n\n\n\nvar AppRoutes = function AppRoutes() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["BrowserRouter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {\n    exact: true,\n    path: "/app",\n    component: _pages_ImportPage__WEBPACK_IMPORTED_MODULE_2__["default"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PrivateRoute__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    path: "/scan",\n    component: _pages_ScanPage__WEBPACK_IMPORTED_MODULE_3__["default"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PrivateRoute__WEBPACK_IMPORTED_MODULE_5__["default"], {\n    path: "/device",\n    component: _pages_DevicePage__WEBPACK_IMPORTED_MODULE_4__["default"]\n  })));\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (AppRoutes);\n\n//# sourceURL=webpack:///./src/routes/AppRoutes.js?'
                );

                /***/
            },

        /***/ './src/routes/PrivateRoute.js':
            /*!************************************!*\
  !*** ./src/routes/PrivateRoute.js ***!
  \************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\n\n\n\nvar PrivateRoute = function PrivateRoute(_ref) {\n  var Component = _ref.component,\n      rest = _objectWithoutProperties(_ref, ["component"]);\n\n  var isLoggedIn = true;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], _extends({}, rest, {\n    render: function render(props) {\n      return isLoggedIn ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, props) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {\n        to: "/login"\n      });\n    }\n  }));\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (PrivateRoute);\n\n//# sourceURL=webpack:///./src/routes/PrivateRoute.js?'
                );

                /***/
            },

        /***/ './src/routes/routes.js':
            /*!******************************!*\
  !*** ./src/routes/routes.js ***!
  \******************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _PrivateRoute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrivateRoute */ "./src/routes/PrivateRoute.js");\n/* harmony import */ var _pages_LoginPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/LoginPage */ "./src/pages/LoginPage.js");\n/* harmony import */ var _Layout_Dashboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Layout/Dashboard */ "./src/Layout/Dashboard.js");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\nvar Routes = function Routes() {\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(true),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      isLogin = _React$useState2[0],\n      setIsLogin = _React$useState2[1];\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["BrowserRouter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, isLogin ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {\n    exact: true,\n    from: "/",\n    to: "/app"\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {\n    exact: true,\n    from: "/",\n    to: "/login"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {\n    exact: true,\n    path: "/login",\n    component: _pages_LoginPage__WEBPACK_IMPORTED_MODULE_3__["default"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PrivateRoute__WEBPACK_IMPORTED_MODULE_2__["default"], {\n    path: "/app",\n    component: _Layout_Dashboard__WEBPACK_IMPORTED_MODULE_4__["default"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {\n    exact: true,\n    path: "/*",\n    component: _pages_LoginPage__WEBPACK_IMPORTED_MODULE_3__["default"]\n  }), ":"));\n};\n\n/* harmony default export */ __webpack_exports__["default"] = (Routes);\n\n//# sourceURL=webpack:///./src/routes/routes.js?'
                );

                /***/
            },

        /***/ './src/style.js':
            /*!**********************!*\
  !*** ./src/style.js ***!
  \**********************/
            /*! exports provided: useLoginPageStyles, useSidebarStyles, useImportPageStyles */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                'use strict';
                eval(
                    "__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useLoginPageStyles\", function() { return useLoginPageStyles; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useSidebarStyles\", function() { return useSidebarStyles; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useImportPageStyles\", function() { return useImportPageStyles; });\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core */ \"@material-ui/core\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar useLoginPageStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__[\"makeStyles\"])({\n  root: {\n    width: 478,\n    height: 453,\n    boxShadow: '0 7px 15px rgba(0,0,0,0.19), 0 4px 4px rgba(0,0,0,0.23)',\n    borderRadius: '5px'\n  },\n  title: {\n    fontSize: 30,\n    marginBottom: 50\n  },\n  pos: {\n    marginBottom: 12\n  },\n  mainLogo: {\n    height: '8vmin',\n    marginTop: 46,\n    marginBottom: 32,\n    color: '#000',\n    fontWeight: '600'\n  }\n});\nvar drawerWidth = 240;\nvar useSidebarStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__[\"makeStyles\"])(function (theme) {\n  return {\n    root: {\n      display: 'flex'\n    },\n    appbar: {\n      flexGrow: 1\n    },\n    paper: {\n      position: 'absolute',\n      width: 400,\n      // backgroundColor: theme.palette.background.paper,\n      border: '2px solid #000',\n      boxShadow: theme.shadows[5],\n      padding: theme.spacing(2, 4, 3)\n    },\n    appBarShift: {\n      marginLeft: drawerWidth,\n      width: \"calc(100% - \".concat(drawerWidth, \"px)\"),\n      transition: theme.transitions.create(['width', 'margin'], {\n        easing: theme.transitions.easing.sharp,\n        duration: theme.transitions.duration.enteringScreen\n      })\n    },\n    menuButton: {\n      marginRight: 36\n    },\n    hide: {\n      display: 'none'\n    },\n    drawer: {\n      width: drawerWidth,\n      flexShrink: 0,\n      whiteSpace: 'nowrap'\n    },\n    drawerOpen: {\n      width: drawerWidth,\n      transition: theme.transitions.create('width', {\n        easing: theme.transitions.easing.sharp,\n        duration: theme.transitions.duration.enteringScreen\n      }),\n      backgroundColor: '#083A4D'\n    },\n    drawerClose: _defineProperty({\n      transition: theme.transitions.create('width', {\n        easing: theme.transitions.easing.sharp,\n        duration: theme.transitions.duration.leavingScreen\n      }),\n      backgroundColor: '#083A4D',\n      overflowX: 'hidden',\n      width: theme.spacing(7) + 1\n    }, theme.breakpoints.up('sm'), {\n      width: theme.spacing(9) + 1\n    }),\n    appBar: {\n      zIndex: theme.zIndex.drawer + 1,\n      backgroundColor: '#F2F2F2',\n      transition: theme.transitions.create(['width', 'margin'], {\n        easing: theme.transitions.easing.sharp,\n        duration: theme.transitions.duration.leavingScreen\n      })\n    },\n    menuBar: {\n      color: '#000'\n    },\n    toolbar: _objectSpread({\n      display: 'flex',\n      alignItems: 'center',\n      justifyContent: 'flex-end',\n      padding: theme.spacing(0, 1)\n    }, theme.mixins.toolbar),\n    content: {\n      flexGrow: 1,\n      padding: theme.spacing(3)\n    },\n    typography: {\n      color: '#000',\n      fontWeight: 500,\n      flexGrow: 1\n    },\n    link: {\n      textDecoration: 'none',\n      color: '#000'\n    },\n    listItemSelected: {\n      backgroundColor: 'rgba(0,0,0,0.4) !important',\n      '&:hover': {\n        backgroundColor: 'rgba(0,0,0,0.25) !important'\n      }\n    },\n    listItemButton: {\n      fontWeight: '600',\n      // paddingTop: '10px !important',\n      paddingBottom: '10px !important',\n      color: '#F2F2F2'\n    },\n    listIcons: {\n      color: '#F2F2F2'\n    },\n    menuIcon: {\n      color: '#000'\n    },\n    nested: {\n      paddingLeft: theme.spacing(4)\n    },\n    loginMenu: {\n      display: 'flex'\n    },\n    loginList: {\n      color: '#000'\n    },\n    magenta: {\n      backgroundColor: '#c60055',\n      borderRadius: '50%',\n      height: '1rem',\n      width: '1rem',\n      marginRight: '5px'\n    },\n    red: {\n      backgroundColor: '#c0392b',\n      borderRadius: '50%',\n      height: '1rem',\n      width: '1rem',\n      marginRight: '5px'\n    },\n    green: {\n      backgroundColor: '#27ae60',\n      borderRadius: '50%',\n      height: '1rem',\n      width: '1rem',\n      marginRight: '5px'\n    },\n    pink: {\n      backgroundColor: '#34495e',\n      borderRadius: '50%',\n      height: '1rem',\n      width: '1rem',\n      marginRight: '5px'\n    },\n    indigo: {\n      backgroundColor: '#2980b9',\n      borderRadius: '50%',\n      height: '1rem',\n      width: '1rem',\n      marginRight: '5px'\n    },\n    purple: {\n      backgroundColor: '#8e44ad',\n      borderRadius: '50%',\n      height: '1rem',\n      width: '1rem'\n    },\n    subList: {\n      display: 'flex',\n      flexDirection: 'column'\n    }\n  };\n});\nvar useImportPageStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_0__[\"makeStyles\"])({\n  root: {\n    width: '100%',\n    marginTop: 25,\n    minWidth: 350\n  },\n  card: {\n    width: '100%',\n    marginTop: 10,\n    minHeight: 400\n  }\n});\n\n//# sourceURL=webpack:///./src/style.js?"
                );

                /***/
            },

        /***/ '@material-ui/core':
            /*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core");\n\n//# sourceURL=webpack:///external_%22@material-ui/core%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/AppBar':
            /*!*******************************************!*\
  !*** external "@material-ui/core/AppBar" ***!
  \*******************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/AppBar");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/AppBar%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/Button':
            /*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/Button");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Button%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/Card':
            /*!*****************************************!*\
  !*** external "@material-ui/core/Card" ***!
  \*****************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/Card");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Card%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/CardContent':
            /*!************************************************!*\
  !*** external "@material-ui/core/CardContent" ***!
  \************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/CardContent");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/CardContent%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/Checkbox':
            /*!*********************************************!*\
  !*** external "@material-ui/core/Checkbox" ***!
  \*********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/Checkbox");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Checkbox%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/Collapse':
            /*!*********************************************!*\
  !*** external "@material-ui/core/Collapse" ***!
  \*********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/Collapse");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Collapse%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/Drawer':
            /*!*******************************************!*\
  !*** external "@material-ui/core/Drawer" ***!
  \*******************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/Drawer");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Drawer%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/FormControl':
            /*!************************************************!*\
  !*** external "@material-ui/core/FormControl" ***!
  \************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/FormControl");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/FormControl%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/FormControlLabel':
            /*!*****************************************************!*\
  !*** external "@material-ui/core/FormControlLabel" ***!
  \*****************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/FormControlLabel");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/FormControlLabel%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/FormHelperText':
            /*!***************************************************!*\
  !*** external "@material-ui/core/FormHelperText" ***!
  \***************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/FormHelperText");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/FormHelperText%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/Grid':
            /*!*****************************************!*\
  !*** external "@material-ui/core/Grid" ***!
  \*****************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/Grid");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Grid%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/IconButton':
            /*!***********************************************!*\
  !*** external "@material-ui/core/IconButton" ***!
  \***********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/IconButton");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/IconButton%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/Input':
            /*!******************************************!*\
  !*** external "@material-ui/core/Input" ***!
  \******************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/Input");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Input%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/InputAdornment':
            /*!***************************************************!*\
  !*** external "@material-ui/core/InputAdornment" ***!
  \***************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/InputAdornment");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/InputAdornment%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/InputLabel':
            /*!***********************************************!*\
  !*** external "@material-ui/core/InputLabel" ***!
  \***********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/InputLabel");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/InputLabel%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/Link':
            /*!*****************************************!*\
  !*** external "@material-ui/core/Link" ***!
  \*****************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/Link");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Link%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/List':
            /*!*****************************************!*\
  !*** external "@material-ui/core/List" ***!
  \*****************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/List");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/List%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/ListItem':
            /*!*********************************************!*\
  !*** external "@material-ui/core/ListItem" ***!
  \*********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/ListItem");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/ListItem%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/ListItemIcon':
            /*!*************************************************!*\
  !*** external "@material-ui/core/ListItemIcon" ***!
  \*************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/ListItemIcon");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/ListItemIcon%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/ListItemText':
            /*!*************************************************!*\
  !*** external "@material-ui/core/ListItemText" ***!
  \*************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/ListItemText");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/ListItemText%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/Menu':
            /*!*****************************************!*\
  !*** external "@material-ui/core/Menu" ***!
  \*****************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/Menu");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Menu%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/MenuItem':
            /*!*********************************************!*\
  !*** external "@material-ui/core/MenuItem" ***!
  \*********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/MenuItem");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/MenuItem%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/Table':
            /*!******************************************!*\
  !*** external "@material-ui/core/Table" ***!
  \******************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/Table");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Table%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/TableBody':
            /*!**********************************************!*\
  !*** external "@material-ui/core/TableBody" ***!
  \**********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/TableBody");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/TableBody%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/TableCell':
            /*!**********************************************!*\
  !*** external "@material-ui/core/TableCell" ***!
  \**********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/TableCell");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/TableCell%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/TableContainer':
            /*!***************************************************!*\
  !*** external "@material-ui/core/TableContainer" ***!
  \***************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/TableContainer");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/TableContainer%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/TableHead':
            /*!**********************************************!*\
  !*** external "@material-ui/core/TableHead" ***!
  \**********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/TableHead");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/TableHead%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/TablePagination':
            /*!****************************************************!*\
  !*** external "@material-ui/core/TablePagination" ***!
  \****************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/TablePagination");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/TablePagination%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/TableRow':
            /*!*********************************************!*\
  !*** external "@material-ui/core/TableRow" ***!
  \*********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/TableRow");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/TableRow%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/TextField':
            /*!**********************************************!*\
  !*** external "@material-ui/core/TextField" ***!
  \**********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/TextField");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/TextField%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/Typography':
            /*!***********************************************!*\
  !*** external "@material-ui/core/Typography" ***!
  \***********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/Typography");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Typography%22?'
                );

                /***/
            },

        /***/ '@material-ui/core/styles':
            /*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/core/styles");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/styles%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons':
            /*!*************************************!*\
  !*** external "@material-ui/icons" ***!
  \*************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/AccountCircle':
            /*!***************************************************!*\
  !*** external "@material-ui/icons/AccountCircle" ***!
  \***************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/AccountCircle");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/AccountCircle%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/DeviceHub':
            /*!***********************************************!*\
  !*** external "@material-ui/icons/DeviceHub" ***!
  \***********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/DeviceHub");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/DeviceHub%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/Email':
            /*!*******************************************!*\
  !*** external "@material-ui/icons/Email" ***!
  \*******************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/Email");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/Email%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/ExitToApp':
            /*!***********************************************!*\
  !*** external "@material-ui/icons/ExitToApp" ***!
  \***********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/ExitToApp");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/ExitToApp%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/ExpandLess':
            /*!************************************************!*\
  !*** external "@material-ui/icons/ExpandLess" ***!
  \************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/ExpandLess");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/ExpandLess%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/ExpandMore':
            /*!************************************************!*\
  !*** external "@material-ui/icons/ExpandMore" ***!
  \************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/ExpandMore");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/ExpandMore%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/Lock':
            /*!******************************************!*\
  !*** external "@material-ui/icons/Lock" ***!
  \******************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/Lock");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/Lock%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/Menu':
            /*!******************************************!*\
  !*** external "@material-ui/icons/Menu" ***!
  \******************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/Menu");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/Menu%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/Palette':
            /*!*********************************************!*\
  !*** external "@material-ui/icons/Palette" ***!
  \*********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/Palette");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/Palette%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/PictureAsPdf':
            /*!**************************************************!*\
  !*** external "@material-ui/icons/PictureAsPdf" ***!
  \**************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/PictureAsPdf");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/PictureAsPdf%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/Search':
            /*!********************************************!*\
  !*** external "@material-ui/icons/Search" ***!
  \********************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/Search");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/Search%22?'
                );

                /***/
            },

        /***/ '@material-ui/icons/Visibility':
            /*!************************************************!*\
  !*** external "@material-ui/icons/Visibility" ***!
  \************************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("@material-ui/icons/Visibility");\n\n//# sourceURL=webpack:///external_%22@material-ui/icons/Visibility%22?'
                );

                /***/
            },

        /***/ clsx:
            /*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval('module.exports = require("clsx");\n\n//# sourceURL=webpack:///external_%22clsx%22?');

                /***/
            },

        /***/ express:
            /*!**************************!*\
  !*** external "express" ***!
  \**************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval('module.exports = require("express");\n\n//# sourceURL=webpack:///external_%22express%22?');

                /***/
            },

        /***/ fs:
            /*!*********************!*\
  !*** external "fs" ***!
  \*********************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval('module.exports = require("fs");\n\n//# sourceURL=webpack:///external_%22fs%22?');

                /***/
            },

        /***/ 'material-ui-dropzone':
            /*!***************************************!*\
  !*** external "material-ui-dropzone" ***!
  \***************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("material-ui-dropzone");\n\n//# sourceURL=webpack:///external_%22material-ui-dropzone%22?'
                );

                /***/
            },

        /***/ path:
            /*!***********************!*\
  !*** external "path" ***!
  \***********************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval('module.exports = require("path");\n\n//# sourceURL=webpack:///external_%22path%22?');

                /***/
            },

        /***/ react:
            /*!************************!*\
  !*** external "react" ***!
  \************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval('module.exports = require("react");\n\n//# sourceURL=webpack:///external_%22react%22?');

                /***/
            },

        /***/ 'react-card-flip':
            /*!**********************************!*\
  !*** external "react-card-flip" ***!
  \**********************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("react-card-flip");\n\n//# sourceURL=webpack:///external_%22react-card-flip%22?'
                );

                /***/
            },

        /***/ 'react-dom/server':
            /*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("react-dom/server");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?'
                );

                /***/
            },

        /***/ 'react-router-dom':
            /*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("react-router-dom");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?'
                );

                /***/
            },

        /***/ 'react-sortable-hoc':
            /*!*************************************!*\
  !*** external "react-sortable-hoc" ***!
  \*************************************/
            /*! no static exports found */
            /***/ function (module, exports) {
                eval(
                    'module.exports = require("react-sortable-hoc");\n\n//# sourceURL=webpack:///external_%22react-sortable-hoc%22?'
                );

                /***/
            }

        /******/
    }
);
