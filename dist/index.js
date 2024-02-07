"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _router = _interopRequireDefault(require("./router"));
var dotenv = _interopRequireWildcard(require("dotenv"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// conexion a la base de datos
_mongoose.default.Promise = global.Promise;
const dbUrl = "mongodb+srv://kitian:2DTfLgcAR6IVbHsa@cluster0.gtuys.mongodb.net/portfolio";
_mongoose.default.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(mongoose => console.log("Conectado a la BBDD online")).catch(err => console.error(err));
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.static(_path.default.join(__dirname, 'public')));
app.use('/api/', _router.default);
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Seridor corriendo en el puerto 3000');
});