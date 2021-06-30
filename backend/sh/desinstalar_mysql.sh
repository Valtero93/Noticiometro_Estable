#!/bin/bash
systemctl stop mysql && sleep 5
sudo apt purge -y mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-* && sleep 5
rm -R /var/lib/mysql && sleep 5
rm -R /etc/mysql && sleep 5
apt autoremove -y && sleep 5
apt autoclean -y && sleep 5