#!/bin/bash
NAME=`"cpuinfo"`
echo "Content-type:text/html"
echo
echo "<html><head>"
echo "<title>$NAME</title>"
echo '<meta name="description" content="'$NAME'">'
echo '<meta name="keywords" content="'$NAME'">'
echo '<meta http-equiv="Content-type" content="text/html;charset=UTF-8">'
echo '<meta name="ROBOTS" content="noindex">'
echo "</head><body><pre>"
date
echo -e "\nuname -a"
uname -a
echo -e "\ncpuinfo"
cat /proc/cpuinfo
echo "</pre></body></html>"