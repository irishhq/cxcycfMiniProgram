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
    noticeList = [
        { nid: "1", ctime: "2016-09-05", img_url: "http://176.202.57.10:3000/img/swiper.png", title: "我省创新高校编制管理 高层次人才编制可单列", desc: " 近日，四川省委办公厅印发《关于进一步加强和改进高等学校党的建设的意见》，提出高校党政领导班子实行任期制，明确每届任期5年，领导人员原则上担任同一职务时间不超过两届或10年。" },
        { nid: "2", ctime: "2016-09-05", img_url: "http://176.202.57.10:3000/img/banner1.png", title: "四川省积极推进高校毕业生就业创业", desc: " 建立就业督促机制。实行就业目标责任制，签订就业工作目标责任书，分解下达就业任务，确保目标任务顺利完成。" },
        { nid: "3", ctime: "2016-01-08", img_url: "http://176.202.57.10:3000/img/banner2.png", title: "李开复：互联网带来很多创业机遇，中国的个体户创业将会引领全球", desc: "5月27日，“创投2015盛典 硅谷·中国众创巡讲”在北京举行，创新工厂董事长兼首席执行官李开复表示，互联网带来了很多创业机遇，中国在创业方面有很多潜在优势，未来中国的个体户创业将引领全球。" },
        { nid: "4", ctime: "2016-09-05", img_url: "http://176.202.57.10:3000/img/banner3.png", title: "农业厅贯彻落实省委部署 细化安排今年农业重点工作", desc: "8月30日，农业厅党组书记、厅长祝春秀主持召开党组扩大会议、厅务会议，传达贯彻省委推进“一带一路”建设会议等系列会议和王东明书记在甘孜州关于脱贫攻坚的重要讲话精神，细化安排今年农业重点工作。" },
        { nid: "5", ctime: "2016-01-08", img_url: "http://176.202.57.10:3000/img/swiper.png", title: "玉龙湾免费大学生创业园正式启动", desc: "国家提倡“大众创业，万众创新”，这个政策导向很好，但要具体落实还有一段路要走。一方面，要创业，很多大学生都还没做好准备，不懂应如何处理创业与学习这二者的关系，同时他们也不知道要做什么，" },
        { nid: "6", ctime: "2016-01-08", img_url: "http://176.202.57.10:3000/img/banner2.png", title: "大学生融资千万有窍门：“胆大心细”快下手，练就“大心脏”", desc: "我有好多社交创意，可没钱、没技术，我想做个APP，请问我该怎么创业呢？”何瑶鼓起勇气，对着台上的3位拿下A轮千万风投的创业新锐提问。" },
        { nid: "7", ctime: "2016-01-08", img_url: "http://176.202.57.10:3000/img/banner1.png", title: "拎包入住安心创业 海河教育园助力大学生创业", desc: "昨日，位于天津市海河教育园区的大学生创业孵化园迎来了三批准备进驻的创业大学生。据了解，由人力社保局与海河教育园管委会共同创建的海河教育园“大学生创业孵化园”，是本市首个专门针对互联网领域的“众创空间”，为大学生网络创业搭建智慧孵化平台。" },
        { nid: "8", ctime: "2015-12-28", img_url: "http://176.202.57.10:3000/img/banner3.png", title: "教育部召开首届中国“互联网+”大学生创新创业大赛新闻发布会", desc: "2015年9月，北华大学与中关村物联网联盟以及万桥公司，整合各方资源，实现优势互补，以北华大学大学生创业园和万桥公司为载体，以中关村物联网联盟为技术支撑，联合创建“北华大学——中关村万桥大学生 创客总动园”。" },
    ];
    res.send(noticeList);
})