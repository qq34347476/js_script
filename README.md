[![Zhe's github stats](https://github-readme-stats.vercel.app/api?username=qq34347476)](https://github.com/anuraghazra/github-readme-stats)

### Zhe's Scripts

- 这里的脚本只是自己学习 js 的一个实践
- 仅用于测试和学习研究，禁止用于商业用途，不能保证其合法性，准确性，完整性和有效性，请根据情况自行判断.
- 仓库内所有资源文件，禁止任何公众号、自媒体进行任何形式的转载、发布。
- `qq34347476` 对任何脚本问题概不负责，包括但不限于由任何脚本错误导致的任何损失或损害.
- 间接使用脚本的任何用户，包括但不限于建立VPS或在某些行为违反国家/地区法律或相关法规的情况下进行传播, `qq34347476` 对于由此引起的任何隐私泄漏或其他后果概不负责.
- 如果任何单位或个人认为该项目的脚本可能涉嫌侵犯其权利，则应及时通知并提供身份证明，所有权证明，我们将在收到认证文件后删除相关脚本.
- 任何以任何方式查看此项目的人或直接或间接使用该Script项目的任何脚本的使用者都应仔细阅读此声明。 `qq34347476` 保留随时更改或补充此免责声明的权利。一旦使用并复制了任何相关脚本或Script项目的规则，则视为您已接受此免责声明.
- 您必须在下载后的24小时内从计算机或手机中完全删除以上内容.

## 推荐使用 docker

[@SuperManito](https://github.com/JD-FreeFuck) 无偷跑助力比较纯净的一个镜像，安装使用说明比较完善，后续脚本也会跟踪支持

## docker-compose

以 OpenWrt 安装为例

```
opkg update
opkg install curl
opkg python3-pip
opkg python3-pip-src
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py --force-reinstall
pip install docker-compose==1.23.2
```

然后参考 [@lxk0301](https://gitee.com/lxk0301/jd_docker/tree/master/docker)

> curl <https://bootstrap.pypa.io/get-pip.py> -o get-pip.py 如果报错可以 使用 wget <https://bootstrap.pypa.io/get-pip.py> 或其他下载器代替

### 特别感谢

[@chavyleung](https://github.com/chavyleung) 大佬的 `Env` 函数

[@lxk0301](https://gitee.com/lxk0301)

[@i-chenzhe](https://github.com/i-chenzhe)
