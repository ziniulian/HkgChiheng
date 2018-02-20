// LZR 模块加载
require("lzr");

// LZR 子模块加载
LZR.load([
	"LZR.Node.Srv"
]);

// 服务的实例化
var srv = new LZR.Node.Srv ({
	ip: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
	port: process.env.OPENSHIFT_NODEJS_PORT || 80
});

// LOGO图片
srv.ro.get("/favicon.ico", function (req, res) {
	res.sendFile("Logo.png", {
		root: "./"
	});
});

// 静态主页设置
srv.ro.setStaticDir("/", "./web");

// 收尾处理
srv.use("*", function (req, res) {
	res.status(404).send("Err");
});

// 服务启动
srv.start();
console.log("服务已启动 " + srv.ip + ":" + srv.port);
