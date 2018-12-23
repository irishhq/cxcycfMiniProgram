// acc app.js
const express = require("express");
const pool = require("./pool");
const cors = require("cors");
var app = express();
app.listen(3000);

app.use(express.static('public'));//__dirname: 当前程序所属的目录绝对路径.

// app.use(cors({
//     origin: 'http://192.168.43.87:3000',
//     credentials: true//要求客户端必须携带cookie
// }))


//7.1加载第三方模块session模块
const session = require("express-session");
//7.2对模块进行配置
app.use(session({
    secret: "128位随机字符串",//安全字符串
    resave: false,//请求以后是否要保存
    saveUninitialized: true,//初始化的时候保存
    cookie: {
        maxAge: 1000 * 60 * 60 * 24//session保存的时间
    }
}))


//用户登录
app.get("/login", (req, res) => {
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    upwd = parseInt(upwd);

    var sql = "SELECT count(uid) as c";
    sql += " FROM acc_user";
    sql += " WHERE uname = ? AND upwd = md5(?)";
    pool.query(sql, [uname, upwd], (err, result) => {
        if (err) throw err;
        console.log(result);
        var obj = result[0].c;
        if (obj == 1) {
            //用户登录成功时, 将用户名保存到session对象中
            req.session.uname = uname;
            res.send({ code: 1, msg: "登录成功." });
        } else {
            res.send({ code: -1, msg: "用户名或密码有误." });
        }
    })
})

app.get("/getSwiperImgs", (req, res) => {
    swiperImgs = [
        //176.202.57.10
        // { id: 5, img_url: "http://192.168.43.87:3000/img/swiper.png" },
        // { id: 1, img_url: "http://192.168.43.87:3000/img/banner1.png" },
        // { id: 2, img_url: "http://192.168.43.87:3000/img/banner2.png" },
        // { id: 3, img_url: "http://192.168.43.87:3000/img/banner3.png" },
        // { id: 4, img_url: "http://192.168.43.87:3000/img/banner4.png" },
        { id: 5, img_url: "http://176.202.57.10:3000/img/swiper.png" },
        { id: 1, img_url: "http://176.202.57.10:3000/img/banner1.png" },
        { id: 2, img_url: "http://176.202.57.10:3000/img/banner2.png" },
        { id: 3, img_url: "http://176.202.57.10:3000/img/banner3.png" },
        { id: 4, img_url: "http://176.202.57.10:3000/img/banner4.png" },
    ];
    res.send(swiperImgs);
})

app.get("/noticeList", (req, res) => {
    //1:获取参数
    var pno = parseInt(req.query.pno);  //页码
    var pageSize = parseInt(req.query.pageSize);//页大小
    console.log(pno, pageSize);
    //2:设置默认值 1 7
    if (pno != undefined) { pno = 0 }
    if (!pageSize) { pageSize = 7 }
    //5:创建sql1 查询总记录数   严格区分大小写
    var progress = 0;
    var noticeList = {};
    var sql1 = "SELECT count(nid) AS c FROM cxcycf_notices";
    pool.query(sql1, (err, result) => {
        if (err) throw err;
        var pageCount = Math.ceil(result[0].c / pageSize);
        progress += 50;
        noticeList.pageCount = pageCount;
        if (progress == 100) {
            res.send(noticeList);
        }
    });

    var sql2 = "SELECT `nid`, `ctime`, `img_url`, `title`, `desc` FROM `cxcycf_notices` LIMIT ?,?";
    pool.query(sql2, [pno, pageSize], (err, result) => {
        if (err) {
            throw err;
        }
        noticeList.data = result;
        progress += 50;
        console.log(result);
        if (progress == 100) {
            res.send(noticeList);
        }
    })
})

app.get("/noticeDetails", (req, res) => {
    var nid = req.query.nid;
    var sql = "SELECT `nid`, `ctime`, `img_url`, `title`, `content` FROM `cxcycf_notices` WHERE `nid`=?"
    pool.query(sql, nid, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})