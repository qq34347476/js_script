#!/usr/bin/env bash
#添加hosts;如无法正常下载Github Raw文件，请注释掉
Host_IP=('151.101.88.133' '151.101.228.133')
Host_Name=('raw.githubusercontent.com' 'raw.githubusercontent.com')
for (( i=0; i<=${#Host_IP[@]}; i++ )) do
echo "${Host_IP[$i]} ${Host_Name[$i]}" >> /etc/hosts
done

##############################作者昵称（必填）##############################
# 使用空格隔开
author_list="qq34347476 ZCY01 i-chenzhe"

##############################作者脚本地址URL（必填）##############################
# 例如：https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_nc.js
# 1.从作者库中随意挑选一个脚本地址，每个作者的地址添加一个即可，无须重复添加
# 2.将地址最后的 “脚本名称+后缀” 剪切到下一个变量里（my_scripts_list_xxx）
# scripts_base_url_1=https://gitee.com/qq34347476/quantumult-x/raw/master/
scripts_base_url_1=https://raw.githubusercontent.com/qq34347476/js_script/master/scripts/
scripts_base_url_2=https://raw.githubusercontent.com/ZCY01/daily_scripts/main/jd/
scripts_base_url_3=https://raw.githubusercontent.com/i-chenzhe/qx/main/


##############################作者脚本名称（必填）##############################
# 将相应作者的脚本填写到以下变量中
my_scripts_list_1="format_share_jd_code.js"
my_scripts_list_2="jd_priceProtect.js jd_try.js"
my_scripts_list_3="jd_asus_iqiyi.js jd_getFanslove.js jd_fanslove.js jd_gjmh.js jd_entertainment.js jd_shake.js jd_shakeBean.js"


##############################随机函数##########################################
rand(){
    min=$1
    max=$(($2-$min+1))
    num=$(cat /proc/sys/kernel/random/uuid | cksum | awk -F ' ' '{print $1}')
    echo $(($num%$max+$min))
}



cd $ScriptsDir   # 在 git_pull.sh 中已经定义 ScriptsDir 此变量，diy.sh 由 git_pull.sh 调用，因此可以直接使用此变量
index=1

for author in $author_list
do
  echo -e "开始下载 $author 的脚本"
  # 下载my_scripts_list中的每个js文件，重命名增加前缀"作者昵称_"，增加后缀".new"
  eval scripts_list=\$my_scripts_list_${index}
  echo $scripts_list
  eval url_list=\$scripts_base_url_${index}
  echo $url_list
  for js in $scripts_list
  do
    eval url=$url_list$js
    echo $url
    eval name=$author"_"$js
    echo $name
    wget -q --no-check-certificate $url -O $name.new

    # 如果上一步下载没问题，才去掉后缀".new"，如果上一步下载有问题，就保留之前正常下载的版本
    # 查找脚本内cron关键字并添加到crontab.list
    if [ $? -eq 0 ]; then
      mv -f $name.new $name
      echo -e "更新 $name 完成...\n"
	  croname=`echo "$name"|awk -F\. '{print $1}'`
	  script_date=`cat  $name|grep "http"|awk '{if($1~/^[0-59]/) print $1,$2,$3,$4,$5}'|sort |uniq|head -n 1`
	  if [ -z "${script_date}" ];then
	    cron_min=$(rand 1 59)
	    cron_hour=$(rand 7 9)
	    [ $(grep -c "$croname" /jd/config/crontab.list) -eq 0 ] && sed -i "/hangup/a${cron_min} ${cron_hour} * * * bash jd $croname"  /jd/config/crontab.list
	  else
	    [ $(grep -c "$croname" /jd/config/crontab.list) -eq 0 ] && sed -i "/hangup/a${script_date} bash jd $croname"  /jd/config/crontab.list
	  fi
    else
      [ -f $name.new ] && rm -f $name.new
      echo -e "更新 $name 失败，使用上一次正常的版本...\n"
    fi
  done
  index=$[$index+1]
done

##############################同步 diy.sh ##########################################
cd $ConfigDir
echo -e "开始更新 diy.sh "
wget -q --no-check-certificate https://raw.githubusercontent.com/qq34347476/js_script/master/diy.sh -O diy.sh.new
if [ $? -eq 0 ]; then
  mv -f diy.sh.new diy.sh
  echo -e "更新 diy.sh 完成"
else
  rm -rf diy.sh.new
  echo -e "更新 diy.sh 失败，使用上一次正常的版本...\n"
fi

##############################同步 manual-update.sh ##########################################
cd $ShellDir
echo -e "开始更新 manual-update.sh "
wget -q --no-check-certificate https://raw.githubusercontent.com/qq34347476/js_script/master/scripts/manual-update.sh -O manual-update.sh.new
if [ $? -eq 0 ]; then
  mv -f manual-update.sh.new manual-update.sh
  echo -e "更新 manual-update.sh 完成"
else
  rm -rf manual-update.sh.new
  echo -e "更新 manual-update.sh 失败，使用上一次正常的版本...\n"
fi
