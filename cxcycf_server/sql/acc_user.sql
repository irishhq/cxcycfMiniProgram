--
-- Database: `acc`
--

-- --------------------------------------------------------

--
-- 表的结构 `acc_user`
--

CREATE TABLE `acc_user` (
  `uid` int(11) NOT NULL,
  `uname` varchar(32) DEFAULT NULL,
  `upwd` varchar(32) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  -- `avatar` varchar(128) DEFAULT NULL,
  `referrer` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Indexes for table `xz_user`
--
ALTER TABLE `acc_user`
  ADD PRIMARY KEY (`uid`);

--
-- 在导出的表使用AUTO_INCREMENT
--
--
-- 使用表AUTO_INCREMENT `acc_user`
--
ALTER TABLE `acc_user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
