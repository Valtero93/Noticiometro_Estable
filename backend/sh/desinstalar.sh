#!/bin/bash
systemctl stop mysql && sleep 10
sudo apt purge -y mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-* && sleep 20
rm -R /var/lib/mysql && sleep 10
rm -R /etc/mysql && sleep 10
apt autoremove -y && sleep 10
apt autoclean -y && sleep 10