#!/bin/bash
gcc /home/anon/solarsys/main.c -lfcgi -o /home/anon/solarsys/index.execute
su -c "cp /home/anon/solarsys/index_files/*.js /var/www/solarsys/static/js/
cp /home/anon/solarsys/index_files/*.css /var/www/solarsys/static/css/
cp /home/anon/solarsys/index.html /var/www/solarsys/static/
cp /home/anon/solarsys/index.execute /var/www/solarsys/
cp /home/anon/solarsys/s_t_a_r_t /var/www/solarsys/"