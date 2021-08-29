su -c "rm /opt/firebird/solarsys/solarsys.fdb
cp /home/anon/solarsys/db/*.sql /opt/firebird/solarsys/
/opt/firebird/bin/isql -q -u SYSDBA -p 11031 -i /opt/firebird/solarsys/createDB.sql
chmod ugo+rw /opt/firebird/solarsys/solarsys.fdb
/opt/firebird/bin/isql -q -u SYSDBA -p 11031 -i /opt/firebird/solarsys/createTables.sql
/opt/firebird/bin/isql -q -u SYSDBA -p 11031 -i /opt/firebird/solarsys/insertData.sql"