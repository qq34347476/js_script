#!/bin/bash
bash git_pull.sh
rm -rf run-all.sh
touch run-all.sh
bash jd.sh | grep -o 'jd_[a-z].*' >run-all.sh
bash jd.sh | grep -o 'jx_[a-z].*' >>run-all.sh
bash jd.sh | grep -o 'yangtingxiao_[a-z].*' >>run-all.sh
bash jd.sh | grep -o 'whyour_[a-z].*' >>run-all.sh
bash jd.sh | grep -o 'i-chenzhe_[a-z].*' >>run-all.sh
bash jd.sh | grep -o 'qq34347476_[a-z].*' >>run-all.sh
bash jd.sh | grep -o 'ZCY01_[a-z].*' >>run-all.sh

sed -i 's/^/bash jd.sh &/g' run-all.sh
sed -i 's/.js/ now/g' run-all.sh
sed -i '1i\#!/bin/bash' run-all.sh
sed -i "s/bash jd.sh jd_delCoupon now//g" run-all.sh  # 不执行京东家庭号任务 容易黑号
# sed -i "s/bash jd.sh jd_jxnc now//g" run-all.sh     # 不执行 京喜 农场 容易黑号
# sed -i "s/bash jd.sh jd_dreamFactory now//g" run-all.sh     # 不执行 京喜 工厂 容易黑号
sed -i "s/bash jd.sh jd_family now//g" run-all.sh     # 不执行删除优惠券任务
sed -i "s/bash jd.sh jd_crazy_joy_coin now//g" run-all.sh # 不执行crazyJoy挂机 启动容器时自动24小时挂机,不需要再开启
